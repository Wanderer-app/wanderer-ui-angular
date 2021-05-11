import { AgmDataLayer, DataLayerManager } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LatLng } from '../common/data/latLng';
import { MapDataService } from '../services/map/map-data.service';
import { RouteFile } from '../services/map/route-files';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('routesDataDirective') routesDataDirective?: AgmDataLayer

  mapLatLng: LatLng = {
    lat: 41.975520,
    lng: 43.485647
  }
  zoomLevel: number = 8
  ROUTE_DEFAULT_COLOR = '#ff0051e6'

  routesGeoJson$!: Observable<string>

  constructor(private mapService: MapDataService, private manager: DataLayerManager) { }

  ngOnInit(): void {
    this.routesGeoJson$ = this.mapService.getRoutes(RouteFile.ROUTES_TBILISI)
    console.log(this.routesDataDirective);
    let aaa = new google.maps.Data()
    
  }

  adjara() {
    this.routesGeoJson$ = this.mapService.getRoutes(RouteFile.ROUTES_ADJARA_GURIA)
  }

  findMiddlePoint(feature: any) {

  }

  routeClicked($event: any) {
    let feature: google.maps.Data.Feature = $event.feature

    console.log("code: " + feature.getProperty('routeCode'));
    console.log(feature);

    this.zoomLevel = this.calculateZoomLevel(feature)
    this.panToMiddleOfRoute(feature)
  
    let data: google.maps.Data
  }

  panToMiddleOfRoute(feature: google.maps.Data.Feature) {
    let geometry: google.maps.LatLng[] = []
    feature.getGeometry().forEachLatLng(latLng => geometry.push(latLng));
    console.log(geometry);

    var middle: google.maps.LatLng = geometry[Math.round((geometry.length - 1) / 2)];

    let aaa: google.maps.Data.MouseEvent
    this.mapLatLng = {
      lat: middle.lat(),
      lng: middle.lng()
    }
  }

  routeDefaultStyle() {
    return {
      strokeColor: '#ff0051e6',
      strokeWeight: 3
    }
  }

  calculateZoomLevel(feature: google.maps.Data.Feature): number {
    var routeLength = parseInt(feature.getProperty('lengthInKm'));
    console.log(routeLength);
    if(routeLength <= 5) {
        return 15;
    } else if (routeLength > 5 && routeLength <= 15) {
      return 13;
    } else {
      return 12;
    }
  }

}
