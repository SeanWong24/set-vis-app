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

  private SQL: SqlJs.SqlJsStatic;
  private DB: SqlJs.Database;
  private fileInputElement: HTMLInputElement;
  private setVisElement: HTMLSSetVisElement;
  private mapSvgElement: SVGElement;
  private selectedVariables: string[];
  private timeBy: string = 'Month';
  private selectedLocation?: { x: number, y: number };

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
                const data = await this.queryData(this.selectedVariables, this.timeBy);
                // TODO try to use states
                if (data) {
                  this.setVisElement.data = data;
                  this.setVisElement.parallelSetsDimensions = this.selectedVariables.map(variable => '_' + variable).concat(['Date']);
                  this.setVisElement.statisticsPlotGroupDefinitions = this.selectedVariables.map(variable => ({
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
          <ion-item disabled={!this.file}>
            <ion-label>Time By</ion-label>
            <ion-select
              value={this.timeBy}
              onIonChange={async ({ detail }) => {
                this.timeBy = detail.value;
                const data = await this.queryData(this.selectedVariables, this.timeBy, this.selectedLocation);
                // TODO try to use states
                this.setVisElement.data = data;
                this.setVisElement.parallelSetsDimensions = this.selectedVariables.map(variable => '_' + variable).concat(['Date']);
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
            parallelSetsMaxSegmentLimit={12}
          ></s-set-vis>
          <svg
            ref={el => this.mapSvgElement = el}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            width="100%"
            height={`${(this.datasetInfo?.latitudeCount || 0) / (this.datasetInfo?.longitudeCount || 0) * 100 || 0}%`}>
            {
              ((xCount: number, yCount: number) => {
                const rects = [];
                for (let x = 0; x < xCount; x++) {
                  for (let y = 0; y < yCount; y++) {
                    rects.push(
                      <rect
                        fill="grey"
                        x={x * 100 / this.datasetInfo?.longitudeCount}
                        y={100 - (y + 1) * 100 / this.datasetInfo?.latitudeCount}
                        width={100 / this.datasetInfo?.longitudeCount}
                        height={100 / this.datasetInfo?.latitudeCount}

                        onClick={async event => {
                          this.selectedLocation = { x, y };

                          const data = await this.queryData(this.selectedVariables, this.timeBy, this.selectedLocation);
                          // TODO try to use states
                          if (data) {
                            this.setVisElement.data = data;
                            this.setVisElement.parallelSetsDimensions = this.selectedVariables.map(variable => '_' + variable).concat(['Date']);
                            this.setVisElement.statisticsPlotGroupDefinitions = this.selectedVariables.map(variable => ({
                              dimensionName: variable,
                              visType: 'box'
                            }));

                            this.mapSvgElement.querySelectorAll('rect').forEach(el => el.setAttribute('fill', 'grey'));
                            (event.target as SVGRectElement).setAttribute('fill', 'red');
                          }
                        }}
                      ></rect>
                    )
                  }
                }
                return rects;
              })(this.datasetInfo?.longitudeCount, this.datasetInfo?.latitudeCount)
            }
          </svg>
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

  private async queryData(variables: string[], timeBy: string, location?: { x: number, y: number }) {
    let data = [];

    if (variables?.length > 0 && timeBy) {
      const loading = await loadingController.create({
        message: `Qeurying data...`
      });
      await loading.present();
      let sqlQuery: string;
      let result: SqlJs.QueryResults;
      let latitude: string;
      let longitude: string;

      if (location) {
        sqlQuery = `select Longitude from (select distinct Longitude from weather order by Longitude ASC limit ${location.x + 1}) order by Longitude DESC limit 1`;
        result = this.DB.exec(sqlQuery)?.[0];
        longitude = result.values[0].toString();

        sqlQuery = `select Latitude from (select distinct Latitude from weather order by Latitude ASC limit ${location.y + 1}) order by Latitude DESC limit 1`;
        result = this.DB.exec(sqlQuery)?.[0];
        latitude = result.values[0].toString();
      }

      switch (timeBy) {
        case 'Day':
          sqlQuery = 'select Date, Latitude, Longitude, ' + variables.join(', ') + ' from weather';
          if (location) {
            sqlQuery += ` where Longitude = ${longitude} and Latitude = ${latitude}`;
          }
          break;
        case 'Week':
          sqlQuery = 'select substr(Date, 0, 8) as Date, Latitude, Longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather';
          if (location) {
            sqlQuery += ` where Longitude = ${longitude} and Latitude = ${latitude}`;
          }
          sqlQuery += ' group by substr(Date, 0, 8), Latitude, Longitude';
          break;
        case 'Month':
          sqlQuery = 'select substr(Date, 0, 8) as Date, Latitude, Longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather';
          if (location) {
            sqlQuery += ` where Longitude = ${longitude} and Latitude = ${latitude}`;
          }
          sqlQuery += ' group by substr(Date, 0, 8), Latitude, Longitude';
          break;
        case 'Quarter':
          sqlQuery = 'select substr(Date, 0, 8) as Date, Latitude, Longitude, ' + variables.map(variable => `avg(${variable}) as ${variable}`).join(', ') + ' from weather';
          if (location) {
            sqlQuery += ` where Longitude = ${longitude} and Latitude = ${latitude}`;
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

      if (!location) {
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
