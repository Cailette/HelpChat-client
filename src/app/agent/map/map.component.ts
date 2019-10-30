import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

declare var H: any;

@Component({
    selector: 'map',
    templateUrl: './map.component.html'
})

export class MapComponent implements OnInit {
  @ViewChild("map", {static: true}) mapElement: ElementRef;
  map: any;
  dataExist: boolean;

  appId: string = environment.hereAppID
  appCode: string = environment.hereAppCode

  _lat: number;
  _lng: number;
  @Input() set geoLocation(value: string) {
    if(value !== ""){
      console.log("this.geoLocation 2 " + value)
      this.dataExist = true;
      let geoLocation = JSON.parse(value);
      this._lat = Number(geoLocation.lat);
      this._lng = Number(geoLocation.lng);
      console.log("_lat " + this._lat)
      console.log("_lng " + this._lng)
      this.moveMap()
    }else {
      console.log("data not Exist")
      this.dataExist = false;
      if(this.map){
        this.moveMapDefault();
      }
    }
  }

  public constructor() { }

  public ngOnInit() {
    this.dataExist = true;
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit")
    let platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
    let defaultLayers = platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 0, lng: 0 }
      }
    );
  }

  moveMap() {
    console.log("moveMap")
    this.map.setCenter({lat: this._lat, lng: this._lng});
    this.map.setZoom(10);
  }

  moveMapDefault(){
    console.log("moveMapDefault")
    this.map.setCenter({lat: 0, lng: 0});
    this.map.setZoom(0);
  }
}