import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

declare var H: any;

@Component({
    selector: 'map',
    templateUrl: './map.component.html'
})

export class MapComponent implements OnInit {
  appId: string = environment.hereAppID
  appCode: string = environment.hereAppCode

  @ViewChild("map", {static: true}) mapElement: ElementRef;
  map: any;

  dataExist: boolean;
  platform: any;
  _lat: number;
  _lng: number;

  @Input() set geoLocation(value: string) {
    if(value !== ""){
      this.dataExist = true;
      let geoLocation = JSON.parse(value);
      this._lat = Number(geoLocation.lat);
      this._lng = Number(geoLocation.lng);
      this.moveMap();
    } else {
      this.dataExist = false;
      if(this.map) this.moveMapDefault();
    }
  }

  public constructor() { }

  public ngOnInit() {
    this.dataExist = true;
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
  }

  ngAfterViewInit(){
    this.initMap();
  }

  moveMap() {
    this.map.setCenter({lat: this._lat, lng: this._lng});
    this.map.setZoom(10);
  }

  moveMapDefault(){
    this.map.setCenter({lat: 0, lng: 0});
    this.map.setZoom(0);
  }

  initMap(){
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 0, lng: 0 }
      }
    );
  }

  reverseGeocode() {
    let geocoder = this.platform.getGeocodingService()
    let parameters = {
      prox: '41.8842,-87.6388,250',
      mode: 'retrieveAddresses',
      maxresults: '1',
      gen: '9'
    };

    geocoder.reverseGeocode(parameters,
      function (result) {
        console.log(result);
      }, function (error) {
        console.log(error);
    });
  }
}