import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportReason } from '../common/data/report-reason';
import { UserContentType } from '../common/data/user-content-type';
import { UserFullData } from '../common/data/user-full-data';
import { JAMBURA, PATATA } from '../common/mock/mocked-short-users';
import { AreYouSureModalComponent } from '../common/modals/are-you-sure-modal/are-you-sure-modal.component';
import { ContentReportModalComponent } from '../common/modals/content-report-modal/content-report-modal.component';
import { UserAddedContentService } from '../services/user-added-content-service';
import { ContentControlMenuPlacement } from './menu-placement';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../notifications/service/notification.service';

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
  @Input() service!: UserAddedContentService

  @Output() editContentEvent = new EventEmitter()

  loggedInUser: UserFullData = {
    id: JAMBURA.id,
    firstName: JAMBURA.firstName,
    lastName: JAMBURA.lastName,
    isAdmin: true
  }

  barsIcon = faBars

  constructor(private modalService: NgbModal, private notificationService: NotificationService) { }

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

  report() {
    const modalRef = this.modalService.open(ContentReportModalComponent);
    modalRef.result.then(result => {
      if (result) {
        this.service.report(this.contentId, (result as ReportReason))
          .subscribe(result => this.processBooleanResult(result, `${this.contentType} reported successfully!`))
      }
    })
  }

  activate() {
    const modal = this.modalService.open(AreYouSureModalComponent);
    modal.componentInstance.question = `Are you sure you want to activate this ${this.contentType}?`

    modal.result.then(result => {
      if((result as boolean)) {
        this.service.activate(this.contentId)
          .subscribe(result => this.processBooleanResult(result, `${this.contentType} activated successfully!`))
      }
    })
  }

  remove() {
    const modal = this.modalService.open(AreYouSureModalComponent);
    modal.componentInstance.question = `Are you sure you want to remove this ${this.contentType}?`

    modal.result.then(result => {
      if((result as boolean)) {
        this.service.remove(this.contentId)      
          .subscribe(result => this.processBooleanResult(result, `${this.contentType} removed successfully!`))
      }
    })
  
  }

  markIrrelevant() {
    if(this.contentType === UserContentType.PIN) {
      const modal = this.modalService.open(AreYouSureModalComponent);
      modal.componentInstance.question = `Are you sure you want to mark this pin as irrelevant?`

      modal.result.then(result => {
        if((result as boolean)) {
          this.service.report(this.contentId, ReportReason.IRRELEVANT)      
            .subscribe(result => this.processBooleanResult(result, `Pin marked as irrelevant!`))
        }
      })

      this.service.report(this.contentId, ReportReason.IRRELEVANT)
    }
  }

  processBooleanResult(result: boolean, successMsg: string) {
    if (result) {
      this.notificationService.showStandardSuccess(successMsg)
    } else {
      this.notificationService.showStandardError(`Operation failed, try later again`)
    }
  }

  editMode() {
    this.editContentEvent.emit()
  }

}