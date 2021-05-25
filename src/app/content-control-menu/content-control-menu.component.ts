import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportReason } from '../common/data/report-reason';
import { UserContentType } from '../common/data/user-content-type';
import { UserFullData } from '../common/data/user-full-data';
import { AreYouSureModalComponent } from '../common/modals/are-you-sure-modal/are-you-sure-modal.component';
import { ContentReportModalComponent } from '../common/modals/content-report-modal/content-report-modal.component';
import { UserAddedContentService } from '../services/user-added-content-service';
import { ContentControlMenuPlacement } from './menu-placement';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../notifications/service/notification.service';
import { LogInService } from '../services/log-in/log-in.service';

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
  @Input() backgroundColor?: string

  @Output() editContentEvent = new EventEmitter()
  @Output() contentRemoved = new EventEmitter()

  loggedInUser: UserFullData = this.logInService.getLoggedInUser()!

  barsIcon = faBars

  constructor(private modalService: NgbModal, private notificationService: NotificationService, private logInService: LogInService) { }

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
          .subscribe(result => this.processBooleanResult(result, `კონტენტი წარმატებიდ დარეპორტდა!`))
      }
    })
  }

  activate() {
    const modal = this.modalService.open(AreYouSureModalComponent);
    modal.componentInstance.question = `დარწმუნებული ხართ, რომ გინდათ გაააქტიუროთ ეს კონტენტი?`

    modal.result.then(result => {
      if((result as boolean)) {
        this.service.activate(this.contentId)
          .subscribe(result => this.processBooleanResult(result, `კონტენტი წარმატებით გაააქტიურდა!`))
      }
    })
  }

  remove() {
    const modal = this.modalService.open(AreYouSureModalComponent);
    modal.componentInstance.question = `დარწმუნებული ხართ, რომ გინდათ ამ კონტენტის წაშლა?`

    modal.result.then(result => {
      if((result as boolean)) {
        this.service.remove(this.contentId)      
          .subscribe(result => {
            this.processBooleanResult(result, `კონტენტი წარმატებით წაიშალა!`)
            this.contentRemoved.emit(this.contentId)
            },
            error => this.notificationService.showStandardError(error)
          )
      }
    })
  
  }

  markIrrelevant() {
    if(this.contentType === UserContentType.PIN) {
      const modal = this.modalService.open(AreYouSureModalComponent);
      modal.componentInstance.question = `დარწმუნებული ხართ, რომ გინდათ მონიშნოთ ეს პინი როგორც არააქტუალური?`

      modal.result.then(result => {
        if((result as boolean)) {
          this.service.report(this.contentId, ReportReason.IRRELEVANT)      
            .subscribe(result => this.processBooleanResult(result, `პინი მოინიშნა როგორც არააქტუალური!`))
        }
      })

      this.service.report(this.contentId, ReportReason.IRRELEVANT)
    }
  }

  processBooleanResult(result: boolean, successMsg: string) {
    if (result) {
      this.notificationService.showStandardSuccess(successMsg)
    } else {
      this.notificationService.showStandardError( `დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით`)
    }
  }

  editMode() {
    this.editContentEvent.emit()
  }

}