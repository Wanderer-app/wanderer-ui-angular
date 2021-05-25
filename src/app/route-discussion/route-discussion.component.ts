import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { finalize, observeOn, tap } from 'rxjs/operators';
import { DiscussionElement, PollAnswerData, PollContent } from '../common/data/duscussion-element';
import { UserContentType } from '../common/data/user-content-type';
import { UserFullData } from '../common/data/user-full-data';
import { VoteDirection } from '../common/data/vote-direction';
import { ContentControlMenuPlacement } from '../content-control-menu/menu-placement';
import { RatingComponentSize } from '../rating/rating-size';
import { DiscussionService } from '../services/discussion/discussion.service';
import { PollService } from '../services/discussion/poll.service';
import { PostService } from '../services/discussion/post.service';
import { LogInService } from '../services/log-in/log-in.service';

@Component({
  selector: 'app-route-discussion',
  templateUrl: './route-discussion.component.html',
  styleUrls: ['./route-discussion.component.css']
})
export class RouteDiscussionComponent implements OnInit {

  @Input() discussion$!: Observable<DiscussionElement[]>
  @Output() close = new EventEmitter()

  discussionLoading = true

  controlMenuPlacement = ContentControlMenuPlacement.LEFT_TOP
  post = UserContentType.POST
  ratingSize = RatingComponentSize.EXTRA_SMALL

  poll = UserContentType.POLL 

  constructor(
    private logInService: LogInService,
    private discussionService: DiscussionService,
    public postService: PostService,
    public pollService: PollService
  ) { }

  closeIcon = faTimes

  ngOnInit(): void {
    this.discussion$ = this.discussion$.pipe(finalize(() => this.discussionLoading = false))
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
}
