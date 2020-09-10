import { Component, Host, h, State, Watch } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  scoped: true
})
export class AppHome {

  @State() isDarkModeEnabled: boolean;

  @Watch('isDarkModeEnabled') isDarkModeEnabledWatchHandler(newValue: boolean) {
    localStorage.setItem('isDarkModeEnabled', JSON.stringify(newValue));
    document.body.classList.toggle('dark', newValue);
  }

  connectedCallback() {
    const isDarkModeEnabled = localStorage.getItem('isDarkModeEnabled');
    if (!isDarkModeEnabled) {
      this.isDarkModeEnabled = true;
    }
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Home</ion-title>
            <ion-buttons slot="end">
              <ion-button
                title={`${this.isDarkModeEnabled ? 'Disable' : 'Enable'} dark mode`}
                onClick={() => this.isDarkModeEnabled = !this.isDarkModeEnabled}
              >
                <ion-icon slot="icon-only" name={this.isDarkModeEnabled ? 'sunny' : 'moon'}></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-list>
            <ion-item button href="/clone">Clone</ion-item>
            <ion-item button href="/weather">Weather</ion-item>
          </ion-list>
        </ion-content>
      </Host>
    )
  }

}
