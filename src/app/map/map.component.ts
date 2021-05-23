import { AgmDataLayer, DataLayerManager } from '@agm/core';
import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LatLng } from '../common/data/latLng';
import { PinShortData } from '../common/data/pin-data';
import { AVAILABLE_PIN_TYPES, PinType } from '../common/data/pinType';
import { MapDataService } from '../services/map/map-data.service';
import { RouteFile } from '../services/map/route-files';
import { PinsService } from '../services/pins/pins.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() additionalPins?: PinShortData[]
  @Output() pinSelectedEvent = new EventEmitter()
  @Output() showRouteDetails = new EventEmitter()
  @Output() addPinEvent = new EventEmitter()
  @Output() routeSelected = new EventEmitter()

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

  infoWindow = {
    isOpen: false,
    lat: 0,
    lng: 0,
  }

  constructor(private mapService: MapDataService, private pinService: PinsService) { }

  ngOnDestroy(): void {
    this.routesSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.changeDataLayer(this.tbilisi)
  }

  routeClicked($event: any) {    
    let feature: google.maps.Data.Feature = $event.feature
    
    this.closeInfoWindow()
    if(feature === this.selectedFeature) {
      this.showInfoWindow($event as google.maps.Data.MouseEvent)
    } else {
      this.additionalPins = undefined
      this.selectedFeature?.setProperty("isSelected", false)
      this.pins$ = this.pinService.listForRoute(feature.getProperty("routeCode"))

      this.selectedFeature = feature
      feature.setProperty("isSelected", true)
      this.adjustZoomLevel(feature)
      this.panToMiddleOfRoute(feature)
      this.routeSelected.emit()
    }
    console.log(this.infoWindow);
    
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
      strokeWeight: 4
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
    this.pins$ = of([])
    this.displayDataLayer = false
    this.routesSubscription = this.mapService.getRoutes(routesLayer)
      .pipe(finalize(() => this.displayDataLayer = true))
      .subscribe(data => this.routesGeoJson = data)
  }

  pinSelected(pin: PinShortData) {
    this.pinSelectedEvent.emit(pin.id)
  }

  filterBy(type: PinType) {
    this.pins$ = this.pinService.listForRouteAndType(this.selectedFeature?.getProperty('routeCode'), type)
  }

  removeFilters() {
    this.pins$ = this.pinService.listForRoute(this.selectedFeature?.getProperty('routeCode'))
  }

  showDetails() {
    console.log(this.selectedFeature);
    this.showRouteDetails.emit({
      description: this.selectedFeature!.getProperty('descriptionKV'),
      name: this.selectedFeature!.getProperty('name'),
    })
  }

  showInfoWindow(event: google.maps.Data.MouseEvent) {    
    this.infoWindow = {
      isOpen: true,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }
  }

  closeInfoWindow() {
    this.infoWindow.isOpen = false
  }

  addPin(pinType: PinType) {
    this.closeInfoWindow()
    this.addPinEvent.emit(
      { type: pinType, routeCode:this.selectedFeature!.getProperty('routeCode'), location: { lat: this.infoWindow.lat, lng: this.infoWindow.lng }
    })
    
  }

  adjara = RouteFile.ROUTES_ADJARA_GURIA
  tbilisi = RouteFile.ROUTES_TBILISI
  all = RouteFile.ROUTES_ALL

  availablePinTypes: PinType[] = AVAILABLE_PIN_TYPES

}
