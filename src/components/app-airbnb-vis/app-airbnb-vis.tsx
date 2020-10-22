import { Component, Host, h, State } from '@stencil/core';
import { loadingController } from '@ionic/core';
import 'set-vis';
import initSqlJs from 'sql.js';
import { SqlJs } from 'sql.js/module';
import * as d3 from 'd3';

/// <reference path="../../../node_modules/@types/sql.js/module.d.ts" />

@Component({
  tag: 'app-airbnb-vis',
  styleUrl: 'app-airbnb-vis.css',
  scoped: true,
})
export class AppArbnb {

  private readonly variableOptions: string[] = [
    "room_type",
    "borough",
    "neighborhood",
    "reviews",
    "overall",
    "satisfaction",
    "accommodates"
  ];

  private SQL: SqlJs.SqlJsStatic;
  private DB: SqlJs.Database;
  private fileInputElement: HTMLInputElement;
  private setVisElement: HTMLSSetVisElement;
  private selectedVariables: string[];

  @State() file: File;

  async connectedCallback() {
    this.SQL = await initSqlJs({ locateFile: fileName => `./assets/sql.js/${fileName}` });
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Weather Vis{` - ${this.file?.name || 'No File Opened'}`}</ion-title>
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
          <ion-item disabled={!this.file}>
            <ion-label>Variables</ion-label>
            <ion-select
              multiple
              onIonChange={async ({ detail }) => {
                this.selectedVariables = detail.value;
                const data = await this.queryData();
                // TODO try to use states
                if (data) {
                  this.setVisElement.data = data;
                  debugger
                  this.setVisElement.parallelSetsDimensions = ['room_type', 'borough', 'neighborhood'];
                  this.setVisElement.statisticsPlotGroupDefinitions = ['overall_satisfaction', 'price'].map(variable => ({
                    dimensionName: variable,
                    visType: 'box'
                  }));
                }
              }}
            >
              {
                this.variableOptions.map(d => (<ion-select-option>{d}</ion-select-option>))
              }
            </ion-select>
          </ion-item>
          <s-set-vis
            ref={el => this.setVisElement = el}
            parallel-sets-ribbon-tension={.5}
            parallelSetsDimensions={['']}
          ></s-set-vis>
          <iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-114.82635498046876%2C50.82372226295971%2C-113.48052978515625%2C51.3760666589962&amp;layer=mapnik&amp;marker=51.10071934888555%2C-114.1534423828125" style={{ border: "1px solid black" }}></iframe><br /><small><a href="https://www.openstreetmap.org/?mlat=51.1007&amp;mlon=-114.1534#map=11/51.1007/-114.1534">View Larger Map</a></small>
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
          }}></input>
      </Host>
    );
  }

  private async queryData() {
    let data = [];

    const sqlQuery = `select room_type, borough, neighborhood, overall_satisfaction, price from arbnb where substr(last_modified, 0, 11) = '2016-08-22'`;
    const result = this.DB.exec(sqlQuery)?.[0];

    data = result?.values.map(value => {
      const datum = {};
      for (let i = 0; i < value.length; i++) {
        switch (result.columns[i]) {
          case 'overall_satisfaction':
          case 'price':
            datum[result.columns[i]] = isNaN(+value[i]) ? 0 : +value[i];
            break;
          default:
            datum[result.columns[i]] = value[i];
            break;
        }
      }
      return datum;
    });

    return data;
  }

}
