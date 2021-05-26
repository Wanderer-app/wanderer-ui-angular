import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-maximized-image',
  templateUrl: './maximized-image.component.html',
  styleUrls: ['./maximized-image.component.css']
})
export class MaximizedImageComponent implements OnInit {

  @Input() imageUrl!: string
  @Output() closeEvent = new EventEmitter

  closeIcon = faTimes

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeEvent.emit()
  }

  imgClicked() {

  }

}
