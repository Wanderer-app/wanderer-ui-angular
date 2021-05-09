import { Component, Input, OnInit } from '@angular/core';
import { MOCKED_PIN_DETAILS } from '../pins-detail/data/mocked-pin-details';
import { PinData, PinShortData } from '../common/data/pin-data';
import { Observable } from 'rxjs';
import { PinsService } from '../services/pins/pins.service';
import { PinType } from '../common/data/pinType';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteInformationModalComponent } from '../common/modals/route-information-modal/route-information-modal.component';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {

  @Input() routeCode: string = "123"

  pins$!: Observable<PinShortData[]>

  currentRate = 5
  selectedPin?: PinData
  discussionDisplayed: boolean = false
  sidePanelOpen: boolean = false

  PIN_TYPE = PinType

  constructor(private pinService: PinsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pins$ = this.pinService.listForRoute(this.routeCode)
  }

  selectPin(pin: PinShortData) {
    this.closeSidePanel()
    this.pinService.getById(pin.id).subscribe(data => {
      this.selectedPin = data
      this.openSidePanel()
    })
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
  }

  displayDiscussion() {
    this.closeSidePanel()
    this.discussionDisplayed = true;
    this.openSidePanel()
  }
  
  filterBy(type: PinType) {
    this.pins$ = this.pinService.listForRouteAndType(this.routeCode, type)
  }

  removeFilters() {
    this.pins$ = this.pinService.listForRoute(this.routeCode)
  }

  displayRouteInfo() {
    this.modalService.open(RouteInformationModalComponent)
    // modal.componentInstance.routeInfo = this.route
  }
  
}
