import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

declare var H: any;

@Component({
    selector: 'map',
    templateUrl: './map.component.html'
})

export class MapComponent implements OnInit {
  @ViewChild("map", {static: false}) mapElement: ElementRef;

  appId: string = environment.hereAppID
  appCode: string = environment.hereAppCode

  _lat: number;
  _lng: number;
  @Input() set geoLocation(value: string) {
    if(value){
      let geoLocation = JSON.parse(value);
      this._lat = Number(geoLocation.lat);
      this._lng = Number(geoLocation.lng);
      this.moveMap()
    }
  }

  public constructor() { }

  public ngOnInit() { }

  moveMap() {
    console.log("ngAfterViewInit");
    let platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: this._lat, lng: this._lng }
      }
    );
  }
}
