import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportReason } from '../../data/report-reason';

@Component({
  selector: 'app-content-report-modal',
  templateUrl: './content-report-modal.component.html',
  styleUrls: ['./content-report-modal.component.css']
})
export class ContentReportModalComponent {

  selectedReason: ReportReason = ReportReason.INAPPROPRIATE_CONTENT

  constructor(public activeModal: NgbActiveModal) {}

}
