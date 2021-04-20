import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { PinData } from './data/pin-data';

@Component({
  selector: 'app-pins-detail',
  templateUrl: './pins-detail.component.html',
  styleUrls: ['./pins-detail.component.css']
})
export class PinsDetailComponent implements OnInit {

  @Input() pin?: PinData
  @Output() closeDetailsEvent = new EventEmitter();

  files: Map<string, string> = new Map([
    ["123456", "butterfly.jpg"],
    ["1234567", "aaa.txt"]
  ])

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeDetailsEvent.emit();
  }

}
