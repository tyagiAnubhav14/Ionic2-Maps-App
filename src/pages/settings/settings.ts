import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Preferences } from '../../services/PreferencesService';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [Preferences]
})
export class SettingsPage {
  radius: number = 1;
  preferences: Preferences;
  constructor(public navCtrl: NavController,preferences:Preferences) {
    this.preferences = preferences;
    this.preferences.getPreference(this.preferences.RADIUS).then((data) => {
            this.radius = data/1000;
        });
  }
  onRadiusChange(rad: number) {
    let r = rad * 1000;
    this.preferences.setPreference(this.preferences.RADIUS, r);
  }
}
