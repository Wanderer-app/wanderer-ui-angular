import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportReason } from '../../data/report-reason';

@Component({
  selector: 'app-content-report-modal',
  templateUrl: './content-report-modal.component.html',
  styleUrls: ['./content-report-modal.component.css']
})
export class ContentReportModalComponent {

  reportReasons: ReportReason[] = [ReportReason.INAPPROPRIATE_CONTENT, ReportReason.OFFENSIVE_CONTENT]
  selectedReason?: ReportReason

  constructor(public activeModal: NgbActiveModal) {}

  tryToReport() {
    if (this.selectedReason) {
      this.activeModal.close(this.selectedReason)
    } else {
      document.getElementById('reason-selector')!.classList.add("border-danger")
      document.getElementById('reason-selector-error')!.innerHTML = "Select a reason first!"
    }
  }

}
