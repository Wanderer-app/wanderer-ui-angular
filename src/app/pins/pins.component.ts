import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PinData, PinShortData } from '../common/data/pin-data';
import { Subscription } from 'rxjs';
import { PinsService } from '../services/pins/pins.service';
import { PinType } from '../common/data/pinType';
import { NewPinInfo } from '../create-pin-form/new-pin-info';
import { NotificationService } from '../notifications/service/notification.service';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit, OnDestroy {

  @Input() routeCode: string = "TB201301"

  currentRate = 5
  selectedPin?: PinData
  discussionDisplayed: boolean = false
  sidePanelOpen: boolean = false
  pinSubscription?: Subscription
  routeInfo?: any
  newPinInfo?: NewPinInfo

  PIN_TYPE = PinType

  additionalMapPins?: PinShortData[]

  constructor(private pinService: PinsService, private notificationService: NotificationService) { }

  ngOnDestroy(): void {
    this.pinSubscription?.unsubscribe()
  }

  ngOnInit(): void {
  }

  selectPin(pinId: number) {
    this.pinService.getById(pinId).subscribe(data => {
      this.closeSidePanel()
      this.selectedPin = data
      this.openSidePanel()
    },
    error => this.notificationService.showStandardError(error))
  }

  openSidePanel() {
    document.getElementById('pins-div')?.classList.add("d-none")
    document.getElementById('pins-div')?.classList.add("d-lg-block")
    this.sidePanelOpen = true
  }

  closeSidePanel() {
    document.getElementById('pins-div')?.classList.remove("d-none")
    document.getElementById('pins-div')?.classList.remove("d-lg-block")
    this.sidePanelOpen = false
    this.discussionDisplayed = false
    this.selectedPin = undefined
    this.routeInfo = undefined
    this.newPinInfo = undefined
  }

  displayDiscussion() {
    this.closeSidePanel()
    this.discussionDisplayed = true;
    this.openSidePanel()
  }

  displayRouteDetails(desc: any) {
    this.closeSidePanel()
    this.routeInfo = desc;
    this.openSidePanel()
  }

  displayAddPinForm(info: NewPinInfo) {
    this.closeSidePanel()
    this.newPinInfo = info;
    this.openSidePanel()
  }

  pinCreated(pin: PinData) {
    this.closeSidePanel()
    this.selectedPin = pin
    this.openSidePanel()

    let pinShort: PinShortData = {
      id: pin.id,
      routeCode: pin.routeCode,
      location: pin.location,
      type: pin.type,
      createdAt: pin.createdAt,
      title: pin.title,
      rating: pin.rating.totalRating
    }

    if(this.additionalMapPins) {
      this.additionalMapPins.push(pinShort)
    } else {
      this.additionalMapPins = [ pinShort ]
    }
  }
  
}
