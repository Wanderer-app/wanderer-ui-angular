import { Component, OnInit } from '@angular/core';
import { MOCKED_PIN_DETAILS } from '../pins-detail/data/mocked-pin-details';
import { PinData, PinShortData } from '../common/data/pin-data';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {

  pins: PinShortData[] = MOCKED_PIN_DETAILS.map(data => {
    return {
      id: data.id,
      routeCode: data.routeCode,
      location: data.location,
      type: data.type,
      createdAt: data.createdAt,
      title: data.title,
      rating: data.rating.totalRating
    } as PinShortData
  })
  currentRate = 5
  selectedPin?: PinData

  
  constructor() { }

  ngOnInit(): void {
  }

  select(pin: PinShortData) {
    document.getElementById('pins-div')?.classList.add("d-none")
    document.getElementById('pins-div')?.classList.add("d-lg-block")
    this.selectedPin = MOCKED_PIN_DETAILS.find(data => data.id === pin.id)!!
  }

  closePinDetail() {
    console.log("Close");
    
    document.getElementById('pins-div')?.classList.remove("d-none")
    document.getElementById('pins-div')?.classList.remove("d-lg-block")
    this.selectedPin = undefined    
  }

}
