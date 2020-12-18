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
    '#4575b4',
    '#abd9e9',
    '#fee090',
    '#f46d43'
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
    'this.textures.lines().orientation("4/8").size(1000)',
    'this.textures.lines().orientation("2/8").size(10)',
    'this.textures.lines().orientation("8/8").size(10)',
    'this.textures.lines().orientation("6/8").size(10)',
    // 'this.textures.paths().d("squares").size(10)',
    // 'this.textures.paths().d("squares").size(20)',
    // 'this.textures.paths().d("squares").size(30)',
    // 'this.textures.paths().d("squares").size(40)',
    // 'this.textures.circles().radius(2)',
    // 'this.textures.circles().radius(3)',
    // 'this.textures.circles().radius(4)',
    // 'this.textures.circles().radius(5)',
    // 'this.textures.circles().radius(2).fill("transparent").strokeWidth(2)',
    // 'this.textures.circles().radius(3).fill("transparent").strokeWidth(2)',
    // 'this.textures.circles().radius(4).fill("transparent").strokeWidth(2)',
    // 'this.textures.circles().radius(5).fill("transparent").strokeWidth(2)'
  ];
  private categorizationMethod: 'quantile' | 'value' = 'value';
  private categorizedValueMap = new Map<string, string[]>();
  private mapDisplayMonth1 = 'Jan';
  private mapDisplayMonth2 = 'Jan';

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
            <ion-label>Categorization Methody</ion-label>
            <ion-select
              value={this.categorizationMethod}
              onIonChange={async ({ detail }) => {
                this.categorizationMethod = detail.value;
                this.updateData(1);
                this.updateData(2);
              }}
            >
              <ion-select-option>quantile</ion-select-option>
              <ion-select-option>value</ion-select-option>
            </ion-select>
          </ion-item>
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
          <ion-item disabled={!this.file}>
            <ion-label>Map 1 Display Month</ion-label>
            <ion-select
              value={this.mapDisplayMonth1}
              onIonChange={async ({ detail }) => {
                this.mapDisplayMonth1 = detail.value;
                this.updateData(1);
              }}
            >
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => <ion-select-option>{month}</ion-select-option>)}
            </ion-select>
          </ion-item>
          <ion-item disabled={!this.file}>
            <ion-label>Map 2 Display Month</ion-label>
            <ion-select
              value={this.mapDisplayMonth2}
              onIonChange={async ({ detail }) => {
                this.mapDisplayMonth2 = detail.value;
                this.updateData(2);
              }}
            >
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => <ion-select-option>{month}</ion-select-option>)}
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
              dark-mode={JSON.parse(localStorage.getItem('isDarkModeEnabled'))}
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
          </div>
          <div>
            <s-set-vis
              ref={el => this.setVisElement2 = el}
              parallel-sets-ribbon-tension={.5}
              parallelSetsDimensions={['']}
              parallelSetsMaxSegmentLimit={12}
              parallelSetsTexutureDefinitions={this.textureDefinitions}
              parallelSetsColorScheme={this.colorScheme}
              dark-mode={JSON.parse(localStorage.getItem('isDarkModeEnabled'))}
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
      const dataPoints = data.filter(d => d.Date === this.mapDisplayMonth1).map(d => ({
        latitude: d.Latitude,
        longitude: d.Longitude,
        value: d['_' + this.selectedVariables[0]],
        secondaryValue: d['_' + this.selectedVariables[1]]
      }));
      const colorDict = this.categorizedValueMap.get(this.selectedVariables[0]).sort().reduce((cd, k, i) => (cd[k] = this.colorScheme[i], cd), {} as any);
      const textureDict = this.categorizedValueMap.get(this.selectedVariables[1]).sort().reduce((td, k, i) => (td[k] = this.textureDefinitions[i], td), {} as any);
      dataPoints.forEach(d => {
        d.value = colorDict[d.value];
        d.secondaryValue = textureDict[d.secondaryValue];
      });
      this.mapIframeElement.contentWindow.postMessage({
        type: 'highlight',
        info: {
          data: dataPoints,
          marginLatitude: .312,
          marginLongitude: .312,
          legendInnerHTML: `<h4>${this.mapDisplayMonth1}</h4>`
        }
      }, '*');

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
      const dataPoints = data.filter(d => d.Date === this.mapDisplayMonth2).map(d => ({
        latitude: d.Latitude,
        longitude: d.Longitude,
        value: d['_' + this.selectedVariables[0]],
        secondaryValue: d['_' + this.selectedVariables[1]]
      }));
      const colorDict = this.categorizedValueMap.get(this.selectedVariables[0]).reduce((cd, k, i) => (cd[k] = this.colorScheme[i], cd), {} as any);
      const textureDict = this.categorizedValueMap.get(this.selectedVariables[1]).reduce((td, k, i) => (td[k] = this.textureDefinitions[i], td), {} as any);
      dataPoints.forEach(d => {
        d.value = colorDict[d.value];
        d.secondaryValue = textureDict[d.secondaryValue];
      });
      this.mapIframeElement2.contentWindow.postMessage({
        type: 'highlight',
        info: {
          data: dataPoints,
          marginLatitude: .312,
          marginLongitude: .312,
          legendInnerHTML: `<h4>${this.mapDisplayMonth2}</h4>`
        }
      }, '*');

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
          datum[result.columns[i]] = result.columns[i] === 'Date' ? this.obtainDateString(value[i] as string) : +value[i];
        }
        return datum;
      });

      if (data) {
        this.categorizedValueMap = new Map();
        if (this.categorizationMethod === 'quantile') {
          const quantileScaleDict = {};
          variables.forEach(variable => quantileScaleDict[variable] = d3.scaleQuantile().domain(data.map(d => d[variable])).range([.25, .5, .75, 1]));
          variables.forEach(variable => {
            const quantiles = quantileScaleDict[variable].quantiles();
            const variableValues = data.map(d => d[variable]);
            const variableMinValue = d3.min(variableValues);
            const variableMaxValue = d3.max(variableValues);
            this.categorizedValueMap.set(variable, [
              `${variableMinValue.toFixed(2)} ~ ${(+quantiles[0]).toFixed(2)}`,
              `${(+quantiles[0]).toFixed(2)} ~ ${(+quantiles[1]).toFixed(2)}`,
              `${(+quantiles[1]).toFixed(2)} ~ ${(+quantiles[2]).toFixed(2)}`,
              `${(+quantiles[2]).toFixed(2)} ~ ${variableMaxValue.toFixed(2)}`
            ]);
          })
          const obtainQuantileValueRange = (variable, quantileValue) => {
            switch (quantileValue) {
              case .25:
                return this.categorizedValueMap.get(variable)[0];
              case .5:
                return this.categorizedValueMap.get(variable)[1];
              case .75:
                return this.categorizedValueMap.get(variable)[2];
              case 1:
                return this.categorizedValueMap.get(variable)[3];
            }
          }
          data.forEach(d => variables.forEach(variable => d[`_${variable}`] = obtainQuantileValueRange(variable, quantileScaleDict[variable](d[variable]))));
          variables.forEach(variable => {
            this.categorizedValueMap.set(
              variable,
              this.categorizedValueMap.get(variable).filter(v => data.filter(d => d[`_${variable}`] === v).length > 0)
            );
          });
        } else if (this.categorizationMethod === 'value') {
          const valueScaleDict = {};
          const valueThresholdDict = {};
          variables.forEach(variable => {
            const values = data.map(d => d[variable]);
            const minValue = d3.min(values);
            const maxValue = d3.max(values);
            const thresholds = [minValue, minValue + (maxValue - minValue) * .25, minValue + (maxValue - minValue) * .5, minValue + (maxValue - minValue) * .75, maxValue];
            valueThresholdDict[variable] = thresholds.map(d => d.toFixed(2));
            valueScaleDict[variable] = d3.scaleThreshold().domain(thresholds).range([0, 1, 2, 3]);
            this.categorizedValueMap.set(variable, [
              `${thresholds[0].toFixed(2)} ~ ${thresholds[1].toFixed(2)}`,
              `${thresholds[1].toFixed(2)} ~ ${thresholds[2].toFixed(2)}`,
              `${thresholds[2].toFixed(2)} ~ ${thresholds[3].toFixed(2)}`,
              `${thresholds[3].toFixed(2)} ~ ${thresholds[4].toFixed(2)}`
            ])
          });
          data.forEach(d => variables.forEach(variable => d[`_${variable}`] = this.categorizedValueMap.get(variable)[valueScaleDict[variable](d[variable])]));
          variables.forEach(variable => {
            this.categorizedValueMap.set(
              variable,
              this.categorizedValueMap.get(variable).filter(v => data.filter(d => d[`_${variable}`] === v).length > 0)
            );
          });
        }
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

  private obtainDateString(date: string) {
    // TODO this only work for months for now
    switch (date.substring(5)) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
    }
  }

}
