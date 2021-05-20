import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { LatLng } from '../common/data/latLng';
import { PinType } from '../common/data/pinType';
import { NewPinInfo } from './new-pin-info';

@Component({
  selector: 'app-create-pin-form',
  templateUrl: './create-pin-form.component.html',
  styleUrls: ['./create-pin-form.component.css']
})
export class CreatePinFormComponent implements OnInit {

  @Input() newPinInfo!: NewPinInfo
  @Output() close = new EventEmitter()

  closeIcon = faTimes

  constructor() { }

  ngOnInit(): void {
  }

}
