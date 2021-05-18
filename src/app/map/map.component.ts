import { AgmDataLayer, DataLayerManager } from '@agm/core';
import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LatLng } from '../common/data/latLng';
import { PinShortData } from '../common/data/pin-data';
import { MapDataService } from '../services/map/map-data.service';
import { RouteFile } from '../services/map/route-files';
import { PinsService } from '../services/pins/pins.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Output() pinSelectedEvent = new EventEmitter()

  mapLatLng: LatLng = {
    lat: 41.975520,
    lng: 43.485647
  }
  zoomLevel: number = 8
  ROUTE_DEFAULT_COLOR = '#ff0051e6'

  selectedFeature?: google.maps.Data.Feature
  routesGeoJson?: string
  routesSubscription!: Subscription
  displayDataLayer = true
  
  pins$?: Observable<PinShortData[]>

  constructor(private mapService: MapDataService, private pinService: PinsService) { }

  ngOnDestroy(): void {
    this.routesSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.tbilisi()
  }

  adjara() {
    this.changeDataLayer(RouteFile.ROUTES_ADJARA_GURIA)
  }

  tbilisi() {
    this.changeDataLayer(RouteFile.ROUTES_TBILISI)
  }

  all() {
    this.changeDataLayer(RouteFile.ROUTES_ALL)
  }

  routeClicked($event: any) {    
    this.selectedFeature?.setProperty("isSelected", false)
    let feature: google.maps.Data.Feature = $event.feature

    this.pins$ = this.pinService.listForRoute(feature.getProperty("routeCode"))

    this.selectedFeature = feature    
    feature.setProperty("isSelected", true)
    this.adjustZoomLevel(feature)
    this.panToMiddleOfRoute(feature)
  }

  panToMiddleOfRoute(feature: google.maps.Data.Feature) {
    let geometry: google.maps.LatLng[] = []
    feature.getGeometry().forEachLatLng(latLng => geometry.push(latLng));

    var middle: google.maps.LatLng = geometry[Math.round((geometry.length - 1) / 2)];

    this.mapLatLng = {
      lat: middle.lat(),
      lng: middle.lng()
    }
  }

  routeDefaultStyle(feature: google.maps.Data.Feature): google.maps.Data.StyleOptions {
    let color = '#ff0051e6'
    if (feature.getProperty("isSelected")) {
      if (feature.getProperty("isSelected") as boolean === true) {
        color = 'green'
      }
    }
    return {
      strokeColor: color,
      strokeWeight: 3
    }
  }

  adjustZoomLevel(feature: google.maps.Data.Feature) {
    var routeLength = parseInt(feature.getProperty('lengthInKm'));

    this.zoomLevel = 1

    let level = 0
    if(routeLength <= 5) {
      level = 15;
    } else if (routeLength > 5 && routeLength <= 15) {
      level = 13;
    } else {
      level = 12;
    }
    this.zoomLevel = level
  }

  changeDataLayer(routesLayer: RouteFile) {
    this.displayDataLayer = false
    this.routesSubscription = this.mapService.getRoutes(routesLayer)
      .pipe(finalize(() => this.displayDataLayer = true))
      .subscribe(data => this.routesGeoJson = data)
  }

  pinSelected(pin: PinShortData) {
    console.log(pin);
    this.pinSelectedEvent.emit(pin.id)
  }

}
