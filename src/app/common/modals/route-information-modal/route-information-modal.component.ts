import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-route-information-modal',
  templateUrl: './route-information-modal.component.html',
  styleUrls: ['./route-information-modal.component.css']
})
export class RouteInformationModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
