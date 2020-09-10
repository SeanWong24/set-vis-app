import { Component, Host, h, State } from '@stencil/core';
import { loadingController } from '@ionic/core';
import 'set-vis';
import initSqlJs from 'sql.js';
import { SqlJs } from 'sql.js/module';

/// <reference path="../../../node_modules/@types/sql.js/module.d.ts" />

@Component({
  tag: 'app-clone-vis',
  styleUrl: 'app-clone-vis.css',
  scoped: true,
})
export class AppCloneVis {

  private SQL: SqlJs.SqlJsStatic;
  private DB: SqlJs.Database;
  private fileInputElement: HTMLInputElement;

  @State() file: File;
  @State() data: any[];
  @State() parallelSetsRibbonTension: number = .5;

  async connectedCallback() {
    this.SQL = await initSqlJs({ locateFile: fileName => `./assets/sql.js/${fileName}` });
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Clone Vis{` - ${this.file?.name || 'No File Opened'}`}</ion-title>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/"></ion-back-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button title="Open" onClick={() => this.fileInputElement.click()}>
                <ion-icon slot="icon-only" name="open"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-item>
            <ion-label>Parallel Sets Ribbon Tension</ion-label>
            <ion-range
              min={0}
              max={1}
              step={.1}
              snaps={true}
              ticks={true}
              value={this.parallelSetsRibbonTension}
              onIonChange={({ detail }) => this.parallelSetsRibbonTension = detail.value as number}
            >
              <ion-label slot="start">0</ion-label>
              <ion-label slot="end">1</ion-label>
            </ion-range>
          </ion-item>
          <s-set-vis
            data={this.data}
            parallelSetsRibbonTension={this.parallelSetsRibbonTension}
            parallelSetsDimensions={['frequency', 'startingRevision', 'directoryPath', 'classId']}
            statisticsPlotGroupDefinitions={[
              { dimensionName: 'size', visType: 'box' },
              { dimensionName: 'totalAdditionCount', visType: 'box' },
              { dimensionName: 'totalDeletionCount', visType: 'box' }
            ]}
          ></s-set-vis>
        </ion-content>

        <input
          id="file-input"
          type="file"
          ref={el => this.fileInputElement = el}
          onInput={async ({ target }) => {
            this.file = (target as HTMLInputElement).files?.[0];
            const loading = await loadingController.create({
              message: `Opening ${this.file.name}...`
            });
            await loading.present();
            const fileBuffer = await this.file.arrayBuffer();
            this.DB = new this.SQL.Database(new Uint8Array(fileBuffer));
            await loading.dismiss();

            const sqlQuery = await (await fetch('./assets/query.sql')).text();
            const result = this.DB.exec(sqlQuery)?.[0];
            const clones = result.values.map(value => {
              const clone = {};
              for (let i = 0; i < value.length; i++) {
                clone[result.columns[i]] = value[i];
              }
              clone['directoryPath'] = clone['filePath'].replace(/(.*?)[^/]*\..*$/, '$1');
              return clone;
            });
            this.data = clones;
          }}></input>
      </Host>
    );
  }

}
