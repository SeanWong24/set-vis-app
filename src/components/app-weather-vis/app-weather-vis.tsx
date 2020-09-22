import { Component, Host, h, State } from '@stencil/core';
import { loadingController } from '@ionic/core';
import 'set-vis';
import initSqlJs from 'sql.js';
import { SqlJs } from 'sql.js/module';
import * as d3 from 'd3';

/// <reference path="../../../node_modules/@types/sql.js/module.d.ts" />

@Component({
  tag: 'app-weather-vis',
  styleUrl: 'app-weather-vis.css',
  scoped: true,
})
export class AppWeatherVis {

  private readonly variableOptions: string[] = [
    'TSK',
    'PSFC',
    'ALBEDO',
    'EMISS',
    'GRDFLX',
    'RAINC',
    'RAINNC',
    'SH2O',
    'SNOW',
    'GLW',
    'HFX',
    'LH',
    'LWDNB',
    'LWUPB',
    'PBLH',
    'PREC_ACC_NC',
    'Q2',
    'QFX',
    'SWDNB',
    'SWDOWN',
    'SWNORM',
    'SWUPB',
    'T2',
    'U10',
    'V10',
    'SMOIS'
  ];

  private SQL: SqlJs.SqlJsStatic;
  private DB: SqlJs.Database;
  private fileInputElement: HTMLInputElement;
  private setVisElement: HTMLSSetVisElement;
  private selectedVariables: string[];
  private timeBy: string = 'Month';

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
                const data = await this.queryData(this.selectedVariables, this.timeBy);
                // TODO try to use states
                this.setVisElement.data = data;
                this.setVisElement.parallelSetsDimensions = this.selectedVariables.map(variable => '_' + variable).concat(['time']);
                this.setVisElement.statisticsPlotGroupDefinitions = this.selectedVariables.map(variable => ({
                  dimensionName: variable,
                  visType: 'box'
                }));
              }}
            >
              {
                this.variableOptions.map(d => (<ion-select-option>{d}</ion-select-option>))
              }
            </ion-select>
          </ion-item>
          <ion-item disabled={!this.file}>
            <ion-label>Time By</ion-label>
            <ion-select
              value={this.timeBy}
              onIonChange={async ({ detail }) => {
                this.timeBy = detail.value;
                const data = await this.queryData(this.selectedVariables, this.timeBy);
                // TODO try to use states
                this.setVisElement.data = data;
                this.setVisElement.parallelSetsDimensions = this.selectedVariables.map(variable => '_' + variable).concat(['time']);
                this.setVisElement.statisticsPlotGroupDefinitions = this.selectedVariables.map(variable => ({
                  dimensionName: variable,
                  visType: 'box'
                }));
              }}
            >
              <ion-select-option>Day</ion-select-option>
              <ion-select-option>Week</ion-select-option>
              <ion-select-option>Month</ion-select-option>
              <ion-select-option>Quarter </ion-select-option>
            </ion-select>
          </ion-item>
          <s-set-vis
            ref={el => this.setVisElement = el}
            parallel-sets-ribbon-tension={.5}
            parallelSetsDimensions={['']}
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
          }}></input>
      </Host>
    );
  }

  private async queryData(variables: string[], timeBy: string) {
    let data = [];

    if (variables?.length > 0 && timeBy) {
      const loading = await loadingController.create({
        message: `Qeurying data...`
      });
      let sqlQuery: string;
      let result: SqlJs.QueryResults;
      await loading.present();
      switch (timeBy) {
        case 'Day':
          sqlQuery = 'select time, latitude, longitude, ' + variables.join(', ') + ' from weather';
          result = this.DB.exec(sqlQuery)?.[0];
          break;
        case 'Week':
          sqlQuery = 'select time, latitude, longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather group by time / 7, latitude, longitude';
          result = this.DB.exec(sqlQuery)?.[0];
          break;
        case 'Month':
          sqlQuery = 'select time, latitude, longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather group by time / 30, latitude, longitude';
          result = this.DB.exec(sqlQuery)?.[0];
          break;
        case 'Quarter':
          sqlQuery = 'select time, latitude, longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather group by time / 120, latitude, longitude';
          result = this.DB.exec(sqlQuery)?.[0];
          break;
      }
      data = result.values.map(value => {
        const datum = {};
        for (let i = 0; i < value.length; i++) {
          datum[result.columns[i]] = +value[i];
        }
        return datum;
      });

      const quantileScaleDict = {};
      variables.forEach(variable => quantileScaleDict[variable] = d3.scaleQuantile().domain(data.map(d => d[variable])).range([.25, .5, .75, 1]));
      data.forEach(d => variables.forEach(variable => d[`_${variable}`] = quantileScaleDict[variable](d[variable])));

      await loading.dismiss();
    }

    return data;
  }

}
