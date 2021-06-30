import { MapsAPILoader } from '@agm/core';
import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCampground, faChevronLeft, faChevronRight, faComments, faFileAlt, faFilter, faInfo, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LatLng } from '../common/data/latLng';
import { PinShortData } from '../common/data/pin-data';
import { AVAILABLE_PIN_TYPES, PinType, pinTypeIcons, pinTypeTranslations } from '../common/data/pinType';
import { FilterOperation, FilterParam, SortingDirection, SortingParams } from '../common/listing/listing-params';
import { georgianStandartTime } from '../services/back-end/date-functions';
import { MapDataService } from '../services/map/map-data.service';
import { RouteFile } from '../services/map/route-files';
import { PinsService } from '../services/pins/pins.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() additionalPins!: PinShortData[]
  @Output() pinSelectedEvent = new EventEmitter()
  @Output() showRouteDetails = new EventEmitter()
  @Output() addPinEvent = new EventEmitter()
  @Output() routeSelected = new EventEmitter()
  @Output() displayDiscussion = new EventEmitter()

  @ViewChild('search') public searchElementRef!: ElementRef;

  mapLatLng: LatLng = {
    lat: 41.975520,
    lng: 43.485647
  }
  zoomLevel: number = 8

  selectedFeature?: google.maps.Data.Feature
  routesGeoJson?: string
  routesSubscription!: Subscription
  displayDataLayer = true
  loadingDataLayer = true
  firstLoading = true
  
  pins$?: Observable<PinShortData[]>

  infoWindow = {
    isOpen: false,
    lat: 0,
    lng: 0,
  }

  pinTypetexts = pinTypeTranslations
  routeFiles = RouteFile
  availablePinTypes: PinType[] = AVAILABLE_PIN_TYPES

  pinsFilterMenuOn = false
  filterHovered = false
  discussionBtnHovered = false
  detailsBtnHovered = false
  searchBtnHovered = false
  prevBtnHovered = false
  nextBtnHovered = false

  searchClicked = false
  mapSearchEnabled = false

  filterIcon = faFilter
  closeIcon = faTimes
  discussionIcon = faCampground
  infoIcon = faFileAlt
  searchIcon = faSearch
  nextIcon = faChevronRight
  previousIcon = faChevronLeft

  selectedDateFilter?: string
  
  querySubscription?: Subscription

  pinsPageNumber = 1
  pinSorting?: SortingParams
  pinFilter: FilterParam[] = []

  constructor(private mapService: MapDataService, private pinService: PinsService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private route: ActivatedRoute) { }

  enableMapSearch(element: any) {
    if (this.mapSearchEnabled === false) {
      this.mapSearchEnabled = true
      console.log("enabling search");
      
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(element);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace()!;
            this.mapLatLng.lat = place.geometry!.location.lat();
            this.mapLatLng.lng = place.geometry!.location.lng();
            this.zoomLevel = 12
          });
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.routesSubscription.unsubscribe()
    this.querySubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.changeDataLayer(RouteFile.ROUTES_TBILISI)
    setTimeout(() => this.firstLoading = false, 2500);
  }

  routeClicked($event: any) {    
    let feature: google.maps.Data.Feature = $event.feature
    
    this.closeInfoWindow()
    if(feature === this.selectedFeature) {
      this.showInfoWindow($event as google.maps.Data.MouseEvent)
    } else {
      this.selectFeature(feature)
    }
    
  }

  selectFeature(feature: google.maps.Data.Feature) {
    this.additionalPins = []
    this.selectedFeature?.setProperty("isSelected", false)
    this.selectedFeature = feature
    this.getPins()

    feature.setProperty("isSelected", true)
    this.adjustZoomLevel(feature)
    this.panToMiddleOfRoute(feature)
    this.routeSelected.emit()
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
    let color = '#ff6d00'
    let zIndex = undefined

    if (feature.getProperty("isSelected")) {
      if (feature.getProperty("isSelected") as boolean === true) {
        color = 'green'
        zIndex = 1000
      }
    }
    return {
      strokeColor: color,
      strokeWeight: 4,
      zIndex: zIndex
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

  changeDataLayer(routesLayer: string) {
    this.pins$ = of([])
    this.additionalPins = []
    this.displayDataLayer = false
    this.loadingDataLayer = true
    this.routesSubscription = this.mapService.getRoutes(routesLayer as RouteFile)
      .pipe(finalize(() => {
        this.displayDataLayer = true
        this.loadingDataLayer = false
      }))
      .subscribe(data => {
        this.routesGeoJson = data
        if(this.querySubscription === undefined) {
          this.subscribeToQueryParamsChange()
        }
      })
  }

  subscribeToQueryParamsChange() {
    this.querySubscription = this.route.queryParamMap.subscribe(params => {
      let routeCode = params.get("route")

      if (routeCode) {
        this.loadingDataLayer = true
        new google.maps.Data().loadGeoJson("assets/geojson/routes-all.geojson", undefined, features => {
          let feature = features.find(f => f.getProperty('routeCode') === routeCode)
          this.loadingDataLayer = false
          if (feature) {
            (this.routesGeoJson as any).features.push(feature)
            this.selectFeature(feature)
            let pinId = params.get("pin")
            let postId = params.get("post")
            let pollId = params.get("poll")
            if(pinId) {
              this.pinSelectedEvent.emit(parseInt(pinId))
            }
            if(postId || pollId) {
              this.showDiscussion()
            }

          }
        })
      }

    })
  }

  pinSelected(pin: PinShortData) {
    this.pinSelectedEvent.emit(pin.id)
  }

  filterByType(type: string) {
    this.pinFilter = this.pinFilter.filter(filter => filter.fieldName !== "pinType")
    this.pinFilter.push({ fieldName: "pinType", operation: FilterOperation.IS, compareValue: type })
    this.getPins()
  }

  removeTypeFilters() {
    this.pinFilter = this.pinFilter.filter(filter => filter.fieldName !== "pinType")
    this.getPins()
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
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
    
  }

  closeInfoWindow() {
    this.infoWindow.isOpen = false
  }

  addPin(pinType: PinType) {
    this.closeInfoWindow()
    this.addPinEvent.emit({ 
      type: pinType, routeCode:this.selectedFeature!.getProperty('routeCode'), 
      location: { lat: this.infoWindow.lat, lng: this.infoWindow.lng }
    })
    
  }

  showDiscussion() {
    this.displayDiscussion.emit(this.selectedFeature!.getProperty('routeCode'))
  }


  filterClicked() {
    this.pinsFilterMenuOn = true    
  }

  closeFilterMenu() {
    this.pinsFilterMenuOn = false
    this.filterHovered = false
  }

  closeSearch() {
    this.searchClicked = false
    this.mapSearchEnabled = false
  }

  private getPins() {
    let routeCode = this.selectedFeature?.getProperty('routeCode')
    this.pins$ = this.pinService.listForRoute(routeCode, this.pinsPageNumber, this.pinFilter, this.pinSorting)
  }

  sortByDate() {
    this.pinSorting = {fieldName: "createdAt", sortingDirection: SortingDirection.DESCENDING}
    this.getPins()
  }

  sortByRating() {
    this.pinSorting = undefined
    this.getPins()
  }


  filterPinsForLastMonth() {
    console.log("aaaa");
    
    let date = new Date()
    date.setMonth(date.getMonth() - 1)
    let targetedDate = georgianStandartTime(date)
    this.getPinsCreatedAfter(targetedDate)
  }

  filterPinsForLastWeek() {
    let date = new Date()
    date.setDate(date.getDate() - 7)
    let targetedDate = georgianStandartTime(date)
    this.getPinsCreatedAfter(targetedDate)
  }

  filterPinsForLastYear() {
    let date = new Date()
    date.setFullYear(date.getFullYear() - 1)
    let targetedDate = georgianStandartTime(date)
    this.getPinsCreatedAfter(targetedDate)
  }

  removeDateFilter() {
    this.pinFilter = this.pinFilter.filter(filter => filter.fieldName !== "createdAt")
    this.getPins()
  }

  getPinsCreatedAfter(dateString: string) {
    this.pinFilter = this.pinFilter.filter(filter => filter.fieldName !== "createdAt")
    this.pinFilter.push({ fieldName: "createdAt", operation: FilterOperation.IS_MORE_THEN, compareValue: dateString })
    this.getPins()
  }

  pinTypeInGeorgian(type: PinType): string {
    return pinTypeTranslations.get(type)!
  }

  pinTypeFilter(): FilterParam | undefined {
    return this.pinFilter.find(f => f.fieldName === 'pinType')
  }

  getPinsNextPage() {
    this.pinsPageNumber += 1
    this.getPins()
  }

  getPinsPreviousPage() {
    if(this.pinsPageNumber > 1) {
      this.pinsPageNumber -= 1
      this.getPins()
    }
  }

  getMarkerIcon(pinType: PinType | string): string  {
    return "./assets/img/pins/" + pinTypeIcons.get(pinType as PinType)!
  }

}
