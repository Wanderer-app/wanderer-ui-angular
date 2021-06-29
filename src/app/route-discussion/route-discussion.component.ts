import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faCross, faEdit, faImages, faPlus, faPollH, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription } from 'rxjs';
import { finalize, map, observeOn, shareReplay, tap } from 'rxjs/operators';
import { DiscussionElement, PollAnswerData, PollContent } from '../common/data/duscussion-element';
import { FileData, FileType } from '../common/data/file-data';
import { UserContentType } from '../common/data/user-content-type';
import { UserData } from '../common/data/user-full-data';
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
  selectAnswerSubscription?: Subscription

  pollToEditId?: number
  postToEditId?: number
  removedPolls: number[] = []
  removedPosts: number[] = []

  postNewImageIds: string[] = []
  postNewText?: string
  performingUpdate = false
  pollNewQuestion?: string
  updateSubscription?: Subscription

  queryParamsSubscription?: Subscription

  constructor(
    private imageSevice: ExternalImageService,
    private logInService: LogInService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
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

  discussionPage = 2

  ngOnDestroy(): void {
    this.additionalDiscussionSubScription?.unsubscribe()
    this.createPollSubscription?.unsubscribe()
    this.updateSubscription?.unsubscribe()
    this.selectAnswerSubscription?.unsubscribe()
    this.queryParamsSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.discussion$ = this.discussionService.listForRoute(this.routeCode, 1)
      .pipe(tap(discussion => this.getPostFromQueryParam(discussion)))
      .pipe(shareReplay())
      .pipe(finalize(() => this.discussionLoading = false))
  }

  pollQuestion(json: string): string {
    return (JSON.parse(json) as PollContent).question
  }

  pollAnswersData(json: string): PollAnswerData[] {
    return (JSON.parse(json) as PollContent).answers
  }

  selectPollAnswer(poll: DiscussionElement, answerId: number) {
    this.selectAnswerSubscription = this.pollService.selectAnswer(poll.id, answerId)
      .subscribe(data => poll.content = data.content)
    
  }

  loggedInUser(): UserData | undefined {
    return this.logInService.getLoggedInUser()
  }

  hasUsersVote(voterIds: string[]): boolean {
    let user = this.logInService.getLoggedInUser()

    return user !== undefined && voterIds.includes(user.id)
  }

  aaa(element: HTMLInputElement) {
    console.log(element);
    element.click()
  }

  loadMore() {
    this.additionalElementsLoading = true
    this.discussionService.listForRoute(this.routeCode, this.discussionPage)
      .pipe(finalize(() => this.additionalElementsLoading = false))
      .subscribe(result => {
        this.additionalDiscussion.push(...result)
        this.discussionPage += 1
      })
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

  uploadSubscription?: Subscription
  updatePostPictures(element: HTMLInputElement) {
    let file = element.files![0]

    if (file && this.postToEditId) {

      let images = this.loadedImages.get(this.postToEditId)

      this.uploadSubscription = this.imageSevice.uploadImage(file)
        .subscribe(image => {
          this.postNewImageIds.unshift(image.id)

          if (images) {
            images.unshift(of(image.url))
          } else {
            this.loadedImages.set(this.postToEditId!, [of(image.url)])        
          }

        })
    
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
        this.postNewText || post.content, 
        post.attachedFiles.concat(this.postNewImageIds.map(id => ({externalId: id, fileType: FileType.IMAGE}))),
        post.id
      )
      .pipe(finalize(() => this.performingUpdate = false))
      .subscribe(data => {
        post.attachedFiles = data.attachedFiles
        post.content = data.content
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
        poll.content = data.content
        this.notificationService.showStandardSuccess("პოლი დარედაქტირდა")
        this.cancelEdit()
      })
  }

  canEditPoll(): boolean {
    return (this.pollNewQuestion !== undefined && this.pollNewQuestion !== '')
  }

  private getPostFromQueryParam(discussion: DiscussionElement[]) {
    
    this.queryParamsSubscription = this.route.queryParamMap.subscribe(params => {
      let postId = params.get("post")
      let pollId = params.get("poll")
      if (postId) {
        this.findDiscussionElement(UserContentType.POST, parseInt(postId), discussion)
      }

      if (pollId) {
        this.findDiscussionElement(UserContentType.POLL, parseInt(pollId), discussion)
      }
    })
  }

  private findDiscussionElement(type: UserContentType, id: number, discussion: DiscussionElement[]) {
    let matchedDiscussion = discussion.find(d => d.type === type && d.id === id)

    if (matchedDiscussion) {
      matchedDiscussion.highlighted = true
      this.additionalDiscussion.unshift(matchedDiscussion)
    } else {
      this.additionalDiscussionSubScription = (type === UserContentType.POST ? this.postService.getPostById(id) : this.pollService.getPollById(id))
        .subscribe(element => {
          element.highlighted = true
          this.newlyCreatedElements.unshift(element)          
        })
    }
  }

}
