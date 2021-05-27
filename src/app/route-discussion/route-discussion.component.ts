import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { faCross, faPlus, faPollH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, observeOn, tap } from 'rxjs/operators';
import { DiscussionElement, PollAnswerData, PollContent } from '../common/data/duscussion-element';
import { FileData, FileType } from '../common/data/file-data';
import { UserContentType } from '../common/data/user-content-type';
import { UserFullData } from '../common/data/user-full-data';
import { ContentControlMenuPlacement } from '../content-control-menu/menu-placement';
import { RatingComponentSize } from '../rating/rating-size';
import { DiscussionService } from '../services/discussion/discussion.service';
import { PollService } from '../services/discussion/poll.service';
import { PostService } from '../services/discussion/post.service';
import { ExternalImageService } from '../services/external-images/external-image.service';
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
  additionalDiscussion: DiscussionElement[] = []
  additionalDiscussionSubScription?: Subscription

  discussionLoading = true
  additionalElementsLoading = false
  showCreatePostForm = false
  showCreatePollForm = false

  controlMenuPlacement = ContentControlMenuPlacement.LEFT_TOP
  post = UserContentType.POST
  poll = UserContentType.POLL 
  ratingSize = RatingComponentSize.EXTRA_SMALL

  loadedImages = new Map<number, Observable<string>[]>()
  maximizedImage?: string

  pollToEditId?: number
  postToEditId?: number
  removedPolls: number[] = []
  removedPosts: number[] = []

  constructor(
    private imageSevice: ExternalImageService,
    private logInService: LogInService,
    private discussionService: DiscussionService,
    public postService: PostService,
    public pollService: PollService
  ) { }

  closeIcon = faTimes
  addIcon = faPlus
  pollIcon = faPollH

  ngOnDestroy(): void {
    this.additionalDiscussionSubScription?.unsubscribe()
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
    console.log(`Editing ${elementInfo.contentType} with id ${elementInfo.id}`);

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
  }

}
