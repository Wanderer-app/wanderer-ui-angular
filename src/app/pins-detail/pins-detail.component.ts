import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { RatingComponentSize } from '../rating/rating-size';
import { PinData } from '../common/data/pin-data';
import { PinsService } from '../services/pins/pins.service';

@Component({
  selector: 'app-pins-detail',
  templateUrl: './pins-detail.component.html',
  styleUrls: ['./pins-detail.component.css']
})
export class PinsDetailComponent implements OnInit {

  @Input() pin?: PinData
  @Output() closeDetailsEvent = new EventEmitter();

  ratingSize = RatingComponentSize.MEDIUM

  files: Map<string, string> = new Map([
    ["123456", "butterfly.jpg"],
    ["1234567", "aaa.txt"]
  ])

  constructor(public pinsService: PinsService) { }

  ngOnInit(): void {
  }

  close() {
    this.closeDetailsEvent.emit();
  }

}
