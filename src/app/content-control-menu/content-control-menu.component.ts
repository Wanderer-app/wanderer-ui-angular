import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportReason } from '../common/data/report-reason';
import { UserContentType } from '../common/data/user-content-type';
import { UserData } from '../common/data/user-full-data';
import { AreYouSureModalComponent } from '../common/modals/are-you-sure-modal/are-you-sure-modal.component';
import { ContentReportModalComponent } from '../common/modals/content-report-modal/content-report-modal.component';
import { UserAddedContentService } from '../services/user-added-content-service';
import { ContentControlMenuPlacement } from './menu-placement';
import { faBars, faCheck, faEdit, faFlag, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../notifications/service/notification.service';
import { LogInService } from '../services/log-in/log-in.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-control-menu',
  templateUrl: './content-control-menu.component.html',
  styleUrls: ['./content-control-menu.component.css']
})
export class ContentControlMenuComponent implements OnInit, OnDestroy {

  @Input() placement!: ContentControlMenuPlacement
  @Input() contentType!: UserContentType
  @Input() contentId!: number
  @Input() contentCreatorId!: string
  @Input() contentIsActive!: boolean
  @Input() service!: UserAddedContentService<any>
  @Input() backgroundColor?: string

  @Output() editContentEvent = new EventEmitter()
  @Output() contentRemoved = new EventEmitter()

  loggedInUser?: UserData = this.logInService.getLoggedInUser()

  barsIcon = faBars
  removeIcon = faTrashAlt
  editIcon = faEdit
  reportIcon = faFlag
  activateIcon = faCheck

  subscription?: Subscription

  constructor(private modalService: NgbModal, private notificationService: NotificationService, private logInService: LogInService) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  ngOnInit(): void {
  }

  hasFullRights(): boolean {    
    if(this.loggedInUser) {
      return this.loggedInUser.id === this.contentCreatorId || this.loggedInUser.isAdmin
    }  
    return false
  }

  isCreator(): boolean {
    if(this.loggedInUser) {
      return this.loggedInUser.id === this.contentCreatorId
    }  
    return false
  }

  canReport(): boolean {
    if(this.loggedInUser) {
      return this.loggedInUser.id !== this.contentCreatorId || (this.loggedInUser.isAdmin && this.loggedInUser.id !== this.contentCreatorId)
    }
    return false

  }

  isPin(): boolean {
    return this.contentType === UserContentType.PIN
  }

  report() {
    const modalRef = this.modalService.open(ContentReportModalComponent);
    modalRef.result.then(result => {
      if (result) {
        this.subscription = this.service.report(this.contentId, (result as ReportReason))
          .subscribe(result => this.notificationService.showStandardSuccess("კონტენტი წარმატებიდ დარეპორტდა!"))
      }
    })
  }

  activate() {
    const modal = this.modalService.open(AreYouSureModalComponent);
    modal.componentInstance.question = `დარწმუნებული ხართ, რომ გინდათ გაააქტიუროთ ეს კონტენტი?`

    modal.result.then(result => {
      if((result as boolean)) {
        this.subscription = this.service.activate(this.contentId)
          .subscribe(result => this.notificationService.showStandardSuccess("კონტენტი წარმატებით გაააქტიურდა!"))
      }
    })
  }

  remove() {
    const modal = this.modalService.open(AreYouSureModalComponent);
    modal.componentInstance.question = `დარწმუნებული ხართ, რომ გინდათ ამ კონტენტის წაშლა?`

    modal.result.then(result => {
      if((result as boolean)) {
        this.subscription = this.service.remove(this.contentId)      
          .subscribe(result => {
            this.notificationService.showStandardSuccess("კონტენტი წარმატებით წაიშალა!")
            this.contentRemoved.emit(this.contentId)
          })
      }
    })
  
  }

  markIrrelevant() {
    if(this.contentType === UserContentType.PIN) {
      const modal = this.modalService.open(AreYouSureModalComponent);
      modal.componentInstance.question = `დარწმუნებული ხართ, რომ გინდათ მონიშნოთ ეს პინი როგორც არააქტუალური?`

      modal.result.then(result => {
        if((result as boolean)) {
          this.subscription = this.service.report(this.contentId, ReportReason.IRRELEVANT)      
            .subscribe(result => this.notificationService.showStandardSuccess("პინი მოინიშნა როგორც არააქტუალური!"))
        }
      })
    }
  }


  editMode() {    
    this.editContentEvent.emit({id: this.contentId, contentType: this.contentType})
  }

}