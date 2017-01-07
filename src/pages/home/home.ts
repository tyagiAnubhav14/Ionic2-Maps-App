import { Component } from '@angular/core';

import { NavController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Subscription } from 'rxjs/Subscription';
import { MapService } from '../../services/MapService'

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MapService]
})
export class HomePage {
  public map: any;
  public nav: NavController;
  public loading: Loading;
  public address: string;
  public subscription: Subscription;
  public mapsService: MapService;
  public isWatching: boolean;
  constructor(nav: NavController, platform: Platform, mapsService: MapService, public loadingCtrl: LoadingController) {
    this.nav = nav;
    this.mapsService = mapsService;
    this.loading = this._createLoading();
    this.isWatching = false;
    platform.ready().then(() => {
      this.map = mapsService.getMap('map',22.8046, 86.2029);
    });
  }
  /**
* Geolocate
*/
  public geolocate(): void {
   this.loading.present();
    Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }).then(position => {

      this.mapsService.moveToPosition(this.map, position.coords.latitude, position.coords.longitude);
      this.mapsService.getAddress(position.coords.latitude, position.coords.longitude)
        .then((data) => {
          this.address = data[0].formatted_address;
        });
      this._dismissLoading();
      // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      // this.map.setCenter(latLng);

      // let marker = new google.maps.Marker({
      //   position: latLng,
      //   title: 'Location',
      //   animation: google.maps.Animation.DROP,
      //   dragable: true
      // });

      // marker.setMap(this.map);
      // new google.maps.Geocoder().geocode({ 'location': latLng }, function (results, status) {
      //   if (status === google.maps.GeocoderStatus.OK) {
      //     this.address = results[0].formatted_address;
      //   }
      // });
    }).catch(error => {
      this._dismissLoading();
    });
  }
  /**
  * Watch the position
  */
  public watchPosition(): void {

    this.isWatching = true;
    this.subscription = Geolocation.watchPosition().subscribe((position) => {
      this.mapsService.getAddress(position.coords.latitude, position.coords.longitude).then((data) => {
        this.address = data[0].formatted_address;
      });

      this.mapsService.moveToPosition(this.map, position.coords.latitude, position.coords.longitude);
      // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // this.map.setCenter(latLng);

      // let marker = new google.maps.Marker({
      //   position: latLng,
      //   title: 'Location',
      //   animation: google.maps.Animation.DROP,
      //   dragable: true
      // });

      // marker.setMap(this.map);

      // new google.maps.Geocoder().geocode({ 'location': latLng }, function (results, status) {
      //   if (status === google.maps.GeocoderStatus.OK) {
      //     this.address = results[0].formatted_address;
      //   }
      // });

    });;
  }
  /**
  * stop watching
  */
  public stopWatching(): void {
    this.isWatching = false;
    this.subscription.unsubscribe();
  }

  /**
  * Create a loader
  */
  private _createLoading(): Loading {
    return this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  /**
  * Dismiss the loader
  */
  private _dismissLoading(): void {
    this.loading.dismiss();
    this.loading = this._createLoading();
  }
 

}
