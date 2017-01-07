import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PlacesPage} from '../../pages/places/places'
@Component({  
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage {
  public services: any[];
  constructor(public navCtrl: NavController) {
    this.services = [{ name: 'ATM' , icon:'card',type:'atm'},
    { name: 'Hospital',icon:'medkit' ,type:'hospital'},
    { name: 'Police Station' ,icon:'contact',type:'police'},
    { name: 'Restraunt' ,icon:'restaurant',type:'restaurant'}];
  }
  public goToPlaces(service: any):void {
    this.navCtrl.push(PlacesPage, service);
  }

}
