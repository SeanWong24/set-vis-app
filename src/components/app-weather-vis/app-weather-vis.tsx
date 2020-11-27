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
    "Elevation",
    "MaxTemperature",
    "MinTemperature",
    "Precipitation",
    "Wind",
    "RelativeHumidity",
    "Solar"
  ];
  private readonly colorScheme = [
    'rgb(0, 0, 200)',
    'rgb(100, 0, 150)',
    'rgb(150, 0, 100)',
    'rgb(200, 0, 0)'
  ];

  private SQL: SqlJs.SqlJsStatic;
  private DB: SqlJs.Database;
  private fileInputElement: HTMLInputElement;
  private setVisElement: HTMLSSetVisElement;
  private setVisElement2: HTMLSSetVisElement;
  private mapIframeElement: HTMLIFrameElement;
  private mapIframeElement2: HTMLIFrameElement;
  private selectedVariables: string[];
  private timeBy: string = 'Month';
  private textureDefinitions = [
    'this.textures.lines().orientation("2/8").size(10)',
    'this.textures.lines().orientation("4/8").size(10)',
    'this.textures.lines().orientation("6/8").size(10)',
    'this.textures.lines().orientation("8/8").size(10)',
    'this.textures.circles()',
    'this.textures.circles().heavier()',
    'this.textures.circles().lighter()',
    'this.textures.circles().radius(5).fill("transparent").strokeWidth(2)'
  ]

  @State() file: File;
  @State() datasetInfo?: {
    minLatitude: number,
    maxLatitude: number,
    latitudeCount: number,
    minLongitude: number,
    maxLongitude: number,
    longitudeCount: number
  };

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
                this.updateData(1);
                this.updateData(2);
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
                this.updateData(1);
                this.updateData(2);
              }}
            >
              <ion-select-option>Day</ion-select-option>
              <ion-select-option>Week</ion-select-option>
              <ion-select-option>Month</ion-select-option>
              <ion-select-option>Quarter </ion-select-option>
            </ion-select>
          </ion-item>
          <div>
            <s-set-vis
              ref={el => this.setVisElement = el}
              parallel-sets-ribbon-tension={.5}
              parallelSetsDimensions={['']}
              parallelSetsMaxSegmentLimit={12}
              parallelSetsTexutureDefinitions={this.textureDefinitions}
              parallelSetsColorScheme={this.colorScheme}
            ></s-set-vis>
            <iframe
              width="600"
              height="600"
              style={{ border: '0' }}
              ref={async el => {
                this.mapIframeElement = el;
                const content = await (await fetch('./assets/map.html')).text();
                if (!el.contentDocument.querySelector('div#map')) {
                  el.contentDocument.open();
                  el.contentDocument.write(content);
                  el.contentDocument.close();
                  window.addEventListener('message', event => {
                    if (event.source === this.mapIframeElement.contentWindow) {
                      const data = event.data;
                      switch (data.type) {
                        case 'hello':
                          el.contentWindow.postMessage({
                            type: 'view center point',
                            info: [0, 0]
                          }, '*');
                          break;
                        case 'select rect':
                          this.updateData(1, data.info);
                          break;
                      }
                    }
                  });
                }
              }}></iframe>
            <ion-button
              onClick={() => this.mapIframeElement.contentWindow.postMessage({
                type: 'reset range selection'
              }, '*')}
            >Remove Range Selection</ion-button>
          </div>
          <div>
            <s-set-vis
              ref={el => this.setVisElement2 = el}
              parallel-sets-ribbon-tension={.5}
              parallelSetsDimensions={['']}
              parallelSetsMaxSegmentLimit={12}
              parallelSetsTexutureDefinitions={this.textureDefinitions}
              parallelSetsColorScheme={this.colorScheme}
            ></s-set-vis>
            <iframe
              width="600"
              height="600"
              style={{ border: '0' }}
              ref={async el => {
                this.mapIframeElement2 = el;
                const content = await (await fetch('./assets/map.html')).text();
                if (!el.contentDocument.querySelector('div#map')) {
                  el.contentDocument.open();
                  el.contentDocument.write(content);
                  el.contentDocument.close();
                  window.addEventListener('message', event => {
                    if (event.source === this.mapIframeElement2.contentWindow) {
                      const data = event.data;
                      switch (data.type) {
                        case 'hello':
                          el.contentWindow.postMessage({
                            type: 'view center point',
                            info: [0, 0]
                          }, '*');
                          break;
                        case 'select rect':
                          this.updateData(2, data.info);
                          break;
                      }
                    }
                  });
                }
              }}></iframe>
            <ion-button
              onClick={() => this.mapIframeElement2.contentWindow.postMessage({
                type: 'reset range selection'
              }, '*')}
            >Remove Range Selection</ion-button>
          </div>
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

  private async updateData(visIndex: number, range?: { minLat: number, maxLat: number, minLon: number; maxLon: number }) {
    const data = await this.queryData(this.selectedVariables, this.timeBy, range);

    if (visIndex === 1) {
      this.mapIframeElement.contentWindow.postMessage({
        type: 'view center point',
        info: {
          location: [(this.datasetInfo.maxLatitude + this.datasetInfo.minLatitude) / 2, (this.datasetInfo.maxLongitude + this.datasetInfo.minLongitude) / 2],
          zoom: 6
        }
      }, '*');

      // TODO try to use states
      this.setVisElement.data = data;
      this.setVisElement.parallelSetsDimensions = this.selectedVariables.map(variable => '_' + variable).concat(['Date']);
      this.setVisElement.statisticsPlotGroupDefinitions = this.selectedVariables.map(variable => ({
        dimensionName: variable,
        visType: 'box'
      }));
    } else if (visIndex === 2) {
      this.mapIframeElement2.contentWindow.postMessage({
        type: 'view center point',
        info: {
          location: [(this.datasetInfo.maxLatitude + this.datasetInfo.minLatitude) / 2, (this.datasetInfo.maxLongitude + this.datasetInfo.minLongitude) / 2],
          zoom: 6
        }
      }, '*');

      // TODO try to use states
      this.setVisElement2.data = data;
      this.setVisElement2.parallelSetsDimensions = this.selectedVariables.map(variable => '_' + variable).concat(['Date']);
      this.setVisElement2.statisticsPlotGroupDefinitions = this.selectedVariables.map(variable => ({
        dimensionName: variable,
        visType: 'box'
      }));
    }
  }

  private async queryData(variables: string[], timeBy: string, range?: { minLat: number, maxLat: number, minLon: number; maxLon: number }) {
    let data = [];

    if (variables?.length > 0 && timeBy) {
      const loading = await loadingController.create({
        message: `Qeurying data...`
      });
      await loading.present();
      let sqlQuery: string;
      let result: SqlJs.QueryResults;

      switch (timeBy) {
        case 'Day':
          sqlQuery = 'select Date, Latitude, Longitude, ' + variables.join(', ') + ' from weather';
          if (range) {
            sqlQuery += ` where Latitude >= ${range.minLat} and Latitude <= ${range.maxLat} and Longitude >= ${range.minLon} and Longitude <= ${range.maxLon}`;
          }
          break;
        case 'Week':
          sqlQuery = 'select substr(Date, 0, 8) as Date, Latitude, Longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather';
          if (range) {
            sqlQuery += ` where Latitude >= ${range.minLat} and Latitude <= ${range.maxLat} and Longitude >= ${range.minLon} and Longitude <= ${range.maxLon}`;
          }
          sqlQuery += ' group by substr(Date, 0, 8), Latitude, Longitude';
          break;
        case 'Month':
          sqlQuery = 'select substr(Date, 0, 8) as Date, Latitude, Longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather';
          if (range) {
            sqlQuery += ` where Latitude >= ${range.minLat} and Latitude <= ${range.maxLat} and Longitude >= ${range.minLon} and Longitude <= ${range.maxLon}`;
          }
          sqlQuery += ' group by substr(Date, 0, 8), Latitude, Longitude';
          break;
        case 'Quarter':
          sqlQuery = 'select substr(Date, 0, 8) as Date, Latitude, Longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather';
          if (range) {
            sqlQuery += ` where Latitude >= ${range.minLat} and Latitude <= ${range.maxLat} and Longitude >= ${range.minLon} and Longitude <= ${range.maxLon}`;
          }
          sqlQuery += ' group by substr(Date, 0, 8), Latitude, Longitude';
          break;
      }
      result = this.DB.exec(sqlQuery)?.[0];
      data = result?.values.map(value => {
        const datum = {};
        for (let i = 0; i < value.length; i++) {
          datum[result.columns[i]] = result.columns[i] === 'Date' ? value[i] : +value[i];
        }
        return datum;
      });

      if (data) {
        const quantileScaleDict = {};
        variables.forEach(variable => quantileScaleDict[variable] = d3.scaleQuantile().domain(data.map(d => d[variable])).range([.25, .5, .75, 1]));
        data.forEach(d => variables.forEach(variable => d[`_${variable}`] = quantileScaleDict[variable](d[variable])));
      }

      if (!range) {
        sqlQuery = 'select min(Latitude) as minLatitude, max(Latitude) as maxLatitude, count(distinct Latitude) as latitudeCount, min(Longitude) as minLongitude, max(Longitude) as maxLongitude, count(distinct Longitude) as longitudeCount from weather';
        result = this.DB.exec(sqlQuery)?.[0];
        this.datasetInfo = result.values.map(value => {
          const datum: any = {};
          for (let i = 0; i < value.length; i++) {
            datum[result.columns[i]] = +value[i];
          }
          return datum;
        })[0];
      }

      await loading.dismiss();
    }

    return data;
  }

}
