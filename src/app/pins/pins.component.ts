import { Component, OnInit } from '@angular/core';
import { MOCKED_PIN_DETAILS } from '../pins-detail/data/mocked-pin-details';
import { PinData } from '../pins-detail/data/pin-data';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {

  pins = MOCKED_PIN_DETAILS
  currentRate = 5
  selectedPin?: PinData

  constructor() { }

  ngOnInit(): void {
  }

  select(pin: PinData) {
    document.getElementById('pins-div')?.classList.add("d-none")
    document.getElementById('pins-div')?.classList.add("d-lg-block")
    this.selectedPin = pin
  }

  closePinDetail() {
    document.getElementById('pins-div')?.classList.remove("d-none")
    document.getElementById('pins-div')?.classList.remove("d-lg-block")
    this.selectedPin = undefined
  }

}
