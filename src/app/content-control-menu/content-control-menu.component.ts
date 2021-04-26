import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportReason } from '../common/data/report-reason';
import { UserContentType } from '../common/data/user-content-type';
import { UserFullData } from '../common/data/user-full-data';
import { JAMBURA } from '../common/mock/mocked-short-users';
import { ContentControlMenuPlacement } from './menu-placement';

@Component({
  selector: 'app-content-control-menu',
  templateUrl: './content-control-menu.component.html',
  styleUrls: ['./content-control-menu.component.css']
})
export class ContentControlMenuComponent implements OnInit {

  @Input() placement!: ContentControlMenuPlacement
  @Input() contentType!: UserContentType
  @Input() contentId!: number
  @Input() contentCreatorId!: number
  @Input() contentIsActive!: boolean

  loggedInUser: UserFullData = {
    id: 111111,
    firstName: JAMBURA.firstName,
    lastName: JAMBURA.lastName,
    isAdmin: true
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  hasFullRights(): boolean {    
    return this.loggedInUser.id === this.contentCreatorId || this.loggedInUser.isAdmin
  }

  isCreator(): boolean {
    return this.loggedInUser.id === this.contentCreatorId
  }

  isPin(): boolean {
    return this.contentType === UserContentType.PIN
  }

  canReport(): boolean {
    return this.loggedInUser.id !== this.contentCreatorId || (this.loggedInUser.isAdmin && this.loggedInUser.id !== this.contentCreatorId)
  }

  reportModal() {
    const modalRef = this.modalService.open(ReportModal);
    modalRef.result.then(result => {
      if (result) {
        let reason = (result as ReportReason)
        console.log("selected report reason: " + reason);
        this.report(reason)
      }
    })
  }

  report(reason: ReportReason) {
    console.log("Will call service to reprot for " + reason);
    
  }

}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Choose Report Reason</h4>
    </div>
    <div class="modal-body">
      <p>Hello, world</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="activeModal.close(selectedReason)">Report</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(undefined)">Close</button>
    </div>
  `
})
export class ReportModal {

  selectedReason: ReportReason = ReportReason.INAPPROPRIATE_CONTENT

  constructor(public activeModal: NgbActiveModal) {}
}