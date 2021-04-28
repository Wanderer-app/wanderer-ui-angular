import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-are-you-sure-modal',
  templateUrl: './are-you-sure-modal.component.html',
  styleUrls: ['./are-you-sure-modal.component.css']
})
export class AreYouSureModalComponent {

  @Input() question!: String

  constructor(public activeModal: NgbActiveModal) { }

  
}
