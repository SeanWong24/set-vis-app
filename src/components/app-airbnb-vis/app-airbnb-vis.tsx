import { Component, Host, h, State } from '@stencil/core';
import { loadingController } from '@ionic/core';
import 'set-vis';
import initSqlJs from 'sql.js';
import { SqlJs } from 'sql.js/module';
// import * as d3 from 'd3';

/// <reference path="../../../node_modules/@types/sql.js/module.d.ts" />

@Component({
  tag: 'app-airbnb-vis',
  styleUrl: 'app-airbnb-vis.css',
  scoped: true,
})
export class AppArbnb {

  private readonly categoricalVariableOptions: string[] = [
    'room_id',
    'host_id',
    'room_type',
    'borough',
    'neighborhood',
    'bedrooms'
  ];
  private readonly numericalVariableOptions: string[] = [
    'reviews',
    'overall_satisfaction',
    'accommodates',
    'bedrooms',
    'price'
  ];

  private readonly colorScheme = [
    '#ff1744',
    '#00e676',
    '#2979ff',
    '#ffea00',
    '#00e5ff',
    '#d500f9',
    '#ff812d',
    '#10fab7'
  ];
  private textureDefinitions = [
    'this.textures.lines().orientation("4/8").size(1000)',
    'this.textures.circles().radius(2)',
    'this.textures.lines().orientation("2/8").size(10)',
    'this.textures.lines().orientation("2/8").size(10).heavier()',
    'this.textures.lines().orientation("8/8").size(10)',
    'this.textures.lines().orientation("8/8").size(10).heavier()',
    'this.textures.lines().orientation("6/8").size(10)',
    'this.textures.lines().orientation("6/8").size(10).heavier()',
  ];
  
  private SQL: SqlJs.SqlJsStatic;
  private DB: SqlJs.Database;
  private fileInputElement: HTMLInputElement;
  private setVisElement: HTMLSSetVisElement;
  private mapIframeElement: HTMLIFrameElement;
  
  private selectedParallelSetsVariables: string[] = [];
  private selectedStatisticsColumnsVariables: string[] = [];
  private selectedDate: string;
  
  @State() file: File;
  @State() dateOptions: string[] = [];

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
            <ion-label>Date</ion-label>
            <ion-select
              onIonChange={async ({ detail }) => {
                this.selectedDate = detail.value;
                this.updateData();
              }}
            >
              {
                this.dateOptions.map(d => (<ion-select-option>{d}</ion-select-option>))
              }
            </ion-select>
          </ion-item>
          <ion-item disabled={!this.file}>
            <ion-label>Parallel Sets Variables</ion-label>
            <ion-select
              multiple
              onIonChange={async ({ detail }) => {
                this.selectedParallelSetsVariables = detail.value;
                this.updateData();
              }}
            >
              {
                this.categoricalVariableOptions.map(d => (<ion-select-option>{d}</ion-select-option>))
              }
            </ion-select>
          </ion-item>
          <ion-item disabled={!this.file}>
            <ion-label>Statisitcs Columns Variables</ion-label>
            <ion-select
              multiple
              onIonChange={async ({ detail }) => {
                this.selectedStatisticsColumnsVariables = detail.value;
                this.updateData();
              }}
            >
              {
                this.numericalVariableOptions.map(d => (<ion-select-option>{d}</ion-select-option>))
              }
            </ion-select>
          </ion-item>
          <s-set-vis
            ref={el => this.setVisElement = el}
            parallel-sets-ribbon-tension={.5}
            parallelSetsDimensions={['']}
            parallelSetsTexutureDefinitions={this.textureDefinitions}
            parallelSetsColorScheme={this.colorScheme}
            parallelSetsMaxSegmentLimit={7}
          ></s-set-vis>
          <iframe
            width="500"
            height="500"
            style={{ border: '0' }}
            ref={async el => {
              this.mapIframeElement = el;
              const content = await (await fetch('./assets/map.html')).text();
              if (!el.contentDocument.querySelector('div#map')) {
                el.contentDocument.open();
                el.contentDocument.write(content);
                el.contentDocument.close();
                window.addEventListener('message', ({ data }) => {
                  switch (data.type) {
                    case 'hello':
                      el.contentWindow.postMessage({
                        type: 'view center point',
                        info: {
                          location: [51.045868, -114.061627],
                          zoom: 10
                        }
                      }, '*');
                      break;
                    case 'select rect':
                      this.updateData(data.info);
                      break;
                  }
                });
              }
            }}></iframe>
          <ion-button
            onClick={() => this.mapIframeElement.contentWindow.postMessage({
              type: 'reset range selection'
            }, '*')}
          >Remove Range Selection</ion-button>
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
            const sqlQuery = 'select distinct substr(last_modified, 0, 11) from arbnb';
            const result = this.DB.exec(sqlQuery)?.[0];
            this.dateOptions = result.values.map(d => d[0].toString());
            await loading.dismiss();
          }}></input>
      </Host >
    );
  }

  private async updateData(range?: { minLat: number, maxLat: number, minLon: number; maxLon: number }) {
    if (this.selectedDate && this.selectedParallelSetsVariables.length > 0 && this.selectedStatisticsColumnsVariables.length > 0) {
      const data = await this.queryData(range);
      // TODO try to use states
      if (data) {
        this.mapIframeElement.contentWindow.postMessage({
          type: 'add pins',
          info: data.sort((a, b) => b.overall_satisfaction - a.overall_satisfaction).slice(0, 100).map(d => [d.latitude, d.longitude])
        }, '*');

        this.setVisElement.data = data;
        this.setVisElement.parallelSetsDimensions = this.selectedParallelSetsVariables;
        this.setVisElement.statisticsPlotGroupDefinitions = this.selectedStatisticsColumnsVariables.map(variable => ({
          dimensionName: variable,
          visType: 'box'
        }));
      }
    }
  }

  private async queryData(range?: { minLat: number, maxLat: number, minLon: number; maxLon: number }) {
    let data = [];

    const selectedVariables = this.selectedParallelSetsVariables.concat(this.selectedStatisticsColumnsVariables).filter((d, i, a) => a.indexOf(d) === i);

    let sqlQuery = `select ${selectedVariables.join(', ')} from arbnb where substr(last_modified, 0, 11) = '2016-08-22'`;
    if (range) {
      sqlQuery += `and latitude >= ${range.minLat} and latitude <= ${range.maxLat} and longitude >= ${range.minLon} and longitude <= ${range.maxLon}`;
    }
    const result = this.DB.exec(sqlQuery)?.[0];

    data = result?.values.map(value => {
      const datum = {};
      for (let i = 0; i < value.length; i++) {
        if (this.numericalVariableOptions.find(d => d === result.columns[i])) {
          datum[result.columns[i]] = isNaN(+value[i]) ? 0 : +value[i];
        } else {
          datum[result.columns[i]] = value[i];
        }
      }
      return datum;
    });

    return data;
  }

}
