import { Component } from '@angular/core';

import { NavController, NavParams, Platform, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { MapService } from '../../services/MapService';
import { Preferences } from '../../services/PreferencesService';
@Component({
    selector: 'page-places',
    templateUrl: 'places.html',
    providers: [MapService, Preferences]
})
export class PlacesPage {
    public places: any;
    public currentLoc: string;
    public map: any;
    public loading: Loading;
    public mapsService: MapService;
    public preferences: Preferences;
    public radius: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public mapService: MapService, platform: Platform, public loadingCtrl: LoadingController, preferences: Preferences) {
        this.places = navParams.data;
        this.loading = this._createLoading();
        this.mapsService = mapService;
        this.preferences = preferences;
        this.preferences.getPreference(this.preferences.RADIUS).then((data) => {
            this.radius = data;
        });
    }
    // Load map only after view is initialize
    ngAfterViewInit() {

    }
    ionViewDidEnter(): void {
        this.loading.present();

        Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }).then(position => {
            this.map = this.mapService.getMap('places', position.coords.latitude, position.coords.longitude);
            this.mapsService.getAddress(position.coords.latitude, position.coords.longitude).then((data) => {
                this.currentLoc = data[0].formatted_address;
            });
            this.mapsService.getPlaces(this.map, position.coords.latitude, position.coords.longitude, this.places.type, this.radius);
            this._dismissLoading();

        }).catch(error => {
            this._dismissLoading();
        });
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