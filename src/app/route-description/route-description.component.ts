import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-route-description',
  templateUrl: './route-description.component.html',
  styleUrls: ['./route-description.component.css']
})
export class RouteDescriptionComponent implements OnInit {

  @Input() routeInfo!: {description: string, name: string}
  @Output() close = new EventEmitter()

  closeIcon = faTimes

  constructor() { }

  ngOnInit(): void {  
    document.getElementById('desc')!.innerHTML = this.routeInfo.description
  }

}
