import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';

declare var google: any;

@Injectable()
export class MapService {

  /**
  * Create a map
  * @elementId
  */
  public getMap(elementId: string,latitude: number, longitude: number): any {
    return new google.maps.Map(document.getElementById(elementId), {
      zoom: 15,
      center: new google.maps.LatLng(latitude,longitude),   //centre jamshedpur
      mapTypeId: google.maps.MapTypeId.ROADMAP   // type
    });
  }

  /**
  * Move to position
  */
  public moveToPosition(map: any, latitude: number, longitude: number): void {
    let center = this._getLatLng(latitude, longitude);
    map.setCenter(center);
    this._addMarker(center, map);
  }

  /**
  * Get address from position
  */
  public getAddress(latitude: number, longitude: number): Promise<any> {
    let center = this._getLatLng(latitude, longitude);

    return new Promise(function (resolve, reject) {
      new google.maps.Geocoder().geocode({ 'location': center }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }
  /**
   * Get Places
   */
  public getPlaces(map:any,latitude: number, longitude: number,type:string,radius:string): void {
    let center = this._getLatLng(latitude, longitude);
    // Specify location, radius and place types for your Places API search.
    var request = {
      location: center,
      radius: radius,
      types: [type]
    };
    let infowindow = new google.maps.InfoWindow();
    map.setCenter(center);
    this._addMarker(center, map);
    // Create the PlaceService and send the request.
    // Handle the callback with an anonymous function.
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          let place = results[i];
          
          // If the request succeeds, draw the place location on
          // the map as a marker, and register an event to handle a
          // click on the marker.
          let marker = new google.maps.Marker({ 
            map:map,           
            position: place.geometry.location,
            title:place.name
          });
          
          google.maps.event.addListener(marker, 'click', function() {
            var contentString='<div><h3>'+place.name+'</h3><p>'+place.vicinity+'</p></div>';
          infowindow.setContent(contentString);
          infowindow.open(map, this);
        });
        }
      }
    });
  }


  /**
  * Add a marker on map
  */
  private _addMarker(position: any, map: any): void {
    let marker = new google.maps.Marker({
      position: position,
      title: 'Location',
      animation: google.maps.Animation.DROP,
      dragable: true,
      icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    marker.setMap(map)
  }

  /**
  * Generate LatLng
  */
  private _getLatLng(latitude: number, longitude: number): any {
    return new google.maps.LatLng(latitude, longitude);
  }
}