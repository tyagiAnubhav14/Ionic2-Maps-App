import { Component } from '@angular/core';

import { NavController,Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {Subscription} from 'rxjs/Subscription';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 public map:any;
 public address: string;
 public subscription:any;
  public isWatching:boolean;
  constructor(public navCtrl: NavController,platform:Platform) {
platform.ready().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom:18,      
        center: new google.maps.LatLng(22.8046, 86.2029),   //centre jamshedpur
        mapTypeId: google.maps.MapTypeId.ROADMAP   // type
      });    
    });
  }
    /**
  * Geolocate
  */
  public geolocate():void{

      Geolocation.getCurrentPosition({enableHighAccuracy:true, timeout:5000, maximumAge:0}).then(position => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
        
        let marker = new google.maps.Marker({
            position:latLng,
            title:'Location',
            animation: google.maps.Animation.DROP,
            dragable:true
        });
 
       marker.setMap(this.map);
       new google.maps.Geocoder().geocode({'location':latLng}, function(results, status){
        if(status === google.maps.GeocoderStatus.OK){
          this.address = results[0].formatted_address;
        }     
       });
      });
  }
  /**
  * Watch the position
  */
  public watchPosition():void{
 
    this.isWatching = true;
    this.subscription = Geolocation.watchPosition().subscribe((position) => {
    
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
        this.map.setCenter(latLng);
        
        let marker = new google.maps.Marker({
            position:latLng,
            title:'Location',
            animation: google.maps.Animation.DROP,
            dragable:true
        });
 
       marker.setMap(this.map);
 
       new google.maps.Geocoder().geocode({'location':latLng}, function(results, status){
        if(status === google.maps.GeocoderStatus.OK){
          this.address = results[0].formatted_address;
        }     
       });
 
    });;
  }
  /**
  * stop watching
  */
  public stopWatching():void{
    this.isWatching = false;
    this.subscription.unsubscribe();
  }

}
