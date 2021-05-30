import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faCheck, faCross, faEdit, faImages, faPlus, faPollH, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, observeOn, tap } from 'rxjs/operators';
import { DiscussionElement, PollAnswerData, PollContent } from '../common/data/duscussion-element';
import { FileData, FileType } from '../common/data/file-data';
import { UserContentType } from '../common/data/user-content-type';
import { UserFullData } from '../common/data/user-full-data';
import { CreatePollFormModalComponent } from '../common/modals/create-poll-form-modal/create-poll-form-modal.component';
import { ContentControlMenuPlacement } from '../content-control-menu/menu-placement';
import { NotificationService } from '../notifications/service/notification.service';
import { RatingComponentSize } from '../rating/rating-size';
import { DiscussionService } from '../services/discussion/discussion.service';
import { PollService } from '../services/discussion/poll.service';
import { PostService } from '../services/discussion/post.service';
import { ExternalImageService, UploadedImageData } from '../services/external-images/external-image.service';
import { LogInService } from '../services/log-in/log-in.service';

@Component({
  selector: 'app-route-discussion',
  templateUrl: './route-discussion.component.html',
  styleUrls: ['./route-discussion.component.css']
})
export class RouteDiscussionComponent implements OnInit, OnDestroy {

  @Input() routeCode!: string
  @Output() close = new EventEmitter()

  discussion$!: Observable<DiscussionElement[]>
  newlyCreatedElements: DiscussionElement[] = []
  additionalDiscussion: DiscussionElement[] = []
  additionalDiscussionSubScription?: Subscription

  discussionLoading = true
  additionalElementsLoading = false
  showCreatePostForm = false
  creatingPoll = false

  controlMenuPlacement = ContentControlMenuPlacement.LEFT_TOP
  post = UserContentType.POST
  poll = UserContentType.POLL 
  ratingSize = RatingComponentSize.EXTRA_SMALL

  loadedImages = new Map<number, Observable<string>[]>()
  maximizedImage?: string
  createPollSubscription?: Subscription

  pollToEditId?: number
  postToEditId?: number
  removedPolls: number[] = []
  removedPosts: number[] = []

  postNewImageIds: string[] = []
  postNewText?: string
  performingUpdate = false
  pollNewQuestion?: string
  updateSubscription?: Subscription

  constructor(
    private imageSevice: ExternalImageService,
    private logInService: LogInService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private discussionService: DiscussionService,
    public postService: PostService,
    public pollService: PollService
  ) { }

  closeIcon = faTimes
  addIcon = faPlus
  pollIcon = faPollH
  imgIcon = faImages
  editIcon = faEdit
  undoIcon = faUndo

  ngOnDestroy(): void {
    this.additionalDiscussionSubScription?.unsubscribe()
    this.createPollSubscription?.unsubscribe()
    this.updateSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.discussion$ = this.discussionService.listForRoute(this.routeCode)
      .pipe(finalize(() => this.discussionLoading = false))
  }

  pollQuestion(json: string): string {
    return (JSON.parse(json) as PollContent).question
  }

  pollAnswersData(json: string): PollAnswerData[] {
    return (JSON.parse(json) as PollContent).answers
  }

  selectPollAnswer(pollId: number, answerId: number) {
    this.pollService.selectAnswer(pollId, answerId)
    
  }

  loggedInUser(): UserFullData | undefined {
    return this.logInService.getLoggedInUser()
  }

  hasUsersVote(voterIds: number[]): boolean {
    let user = this.logInService.getLoggedInUser()

    return user !== undefined && voterIds.includes(user.id)
  }

  loadMore() {
    this.additionalElementsLoading = true
    this.discussionService.listForRoute(this.routeCode)
    .pipe(finalize(() => this.additionalElementsLoading = false))
    .subscribe(result => this.additionalDiscussion.push(...result))
  }

  hasImages(element: DiscussionElement): boolean {
    return element.attachedFiles.filter(file => file.fileType === FileType.IMAGE).length > 0
  }

  getImageFiles(element: DiscussionElement): FileData[] {
    return element.attachedFiles.filter(file => file.fileType == FileType.IMAGE)
  }

  getImageUrls(element: DiscussionElement): Observable<string>[] {
    if(this.loadedImages.has(element.id)) {
      return this.loadedImages.get(element.id)!
    } else {
      this.loadedImages.set(element.id, this.imageSevice.getImageUrls(element.attachedFiles))
      return this.loadedImages.get(element.id)!
    }
  }

  imageClicked(event: any) {    
      console.log(event.target.attributes.src.value);
      this.maximizedImage = event.target.attributes.src.value
  }

  editMode(elementInfo: any) {
    this.cancelEdit()

    if(elementInfo.contentType == UserContentType.POST) {
      this.postToEditId = elementInfo.id
      this.pollToEditId = undefined
    }

    if(elementInfo.contentType == UserContentType.POLL) {
      this.pollToEditId = elementInfo.id
      this.postToEditId = undefined
    }
  }

  pollRemoved(pollId: number) {
    this.removedPolls.push(pollId)
  }

  postRemoved(postId: number) {
    this.removedPosts.push(postId)
  }

  canAddPoll(): boolean {
    return this.logInService.getLoggedInUser()?.isAdmin || false
  }

  postCreated(newPost: DiscussionElement) {
    this.showCreatePostForm = false
    this.newlyCreatedElements.unshift(newPost)
    console.log(this.newlyCreatedElements);
    
  }

  showCreatePollForm() {
    const modalRef = this.modalService.open(CreatePollFormModalComponent);
    modalRef.result.then(result => {      
      if (result) {
        this.creatingPoll = true
        this.createPollSubscription = this.pollService.createPoll(result.question, result.answers, this.routeCode)
          .pipe(finalize(() => this.creatingPoll = false))
          .subscribe(poll => this.newlyCreatedElements.unshift(poll))
        
      }
    })
  }

  updatePostPictures(event: Event, postId: number) {
    let file = (event.target as HTMLInputElement).files![0]

    if (file) {
      this.loadedImages.get(postId)?.unshift(
        this.imageSevice.uploadImage(file)
        .pipe(tap(image => this.postNewImageIds.unshift(image.id)))
        .pipe(map(img => img.url))
      )
    }
  }

  canEditPost(post: DiscussionElement): boolean {
    return (this.postNewText && this.postNewText !== post.content )
      || this.postNewImageIds.length > 0
  }

  editPost(post: DiscussionElement) {

    this.performingUpdate = true

    if(this.canEditPost(post)) {
      this.updateSubscription = this.postService.update(
        this.postNewText!, 
        post.attachedFiles.concat(this.postNewImageIds.map(id => ({externalId: id, fileType: FileType.IMAGE}))),
        post.id
      )
      .pipe(finalize(() => this.performingUpdate = false))
      .subscribe(data => {
        this.cancelEdit()
        this.notificationService.showStandardSuccess("პოსტი დარედაქტირდა!")
      })
    }
    
  }

  cancelEdit() {
    this.postToEditId = undefined
    this.pollToEditId = undefined
    this.postNewImageIds = []
    this.postNewText = undefined
    this.pollNewQuestion = undefined
  }

  editPoll(newQuestion: string, poll: DiscussionElement) {
    this.performingUpdate = true
    this.updateSubscription = this.pollService.update(newQuestion, poll.id)
      .pipe(finalize(() => this.performingUpdate = false))
      .subscribe(data => {
        this.notificationService.showStandardSuccess("პოლი დარედაქტირდა")
        this.cancelEdit()
      })
  }

  canEditPoll(): boolean {
    return (this.pollNewQuestion !== undefined && this.pollNewQuestion !== '')
  }

}
