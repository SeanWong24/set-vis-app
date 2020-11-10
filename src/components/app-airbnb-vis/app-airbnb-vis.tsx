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
  private mapIframeElement: HTMLIFrameElement;
  
  selectedVariables: string[];

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
                this.updateData();
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
            await loading.dismiss();
          }}></input>
      </Host >
    );
  }

  private async updateData(range?: { minLat: number, maxLat: number, minLon: number; maxLon: number }) {
    const data = await this.queryData(range);
    // TODO try to use states
    if (data) {
      this.mapIframeElement.contentWindow.postMessage({
        type: 'add pins',
        info: data.sort((a, b) => b.overall_satisfaction - a.overall_satisfaction).slice(0, 100).map(d => [d.latitude, d.longitude])
      }, '*');

      this.setVisElement.data = data;
      this.setVisElement.parallelSetsDimensions = ['room_type', 'borough', 'neighborhood'];
      this.setVisElement.statisticsPlotGroupDefinitions = ['overall_satisfaction', 'price'].map(variable => ({
        dimensionName: variable,
        visType: 'box'
      }));
    }
  }

  private async queryData(range?: { minLat: number, maxLat: number, minLon: number; maxLon: number }) {
    let data = [];

    let sqlQuery = `select room_type, borough, neighborhood, overall_satisfaction, price, latitude, longitude from arbnb where substr(last_modified, 0, 11) = '2016-08-22'`;
    if (range) {
      sqlQuery += `and latitude >= ${range.minLat} and latitude <= ${range.maxLat} and longitude >= ${range.minLon} and longitude <= ${range.maxLon}`;
    }
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
