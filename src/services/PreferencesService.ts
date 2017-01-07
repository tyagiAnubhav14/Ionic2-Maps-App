import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class Preferences {
  
  public RADIUS:string="radius";

  constructor(public events: Events, public storage: Storage) {}


  public setPreference(key,value) {
    this.storage.set(key, value);
  };

  public getPreference(key) {
    return this.storage.get(key).then((value) => {
      return value;
    });
  };
}
