import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CommentData } from 'src/app/common/data/comment-data';
import { DiscussionElement, PollAnswerData, PollContent } from 'src/app/common/data/duscussion-element';
import { RatingData } from 'src/app/common/data/rating-data';
import { ReportReason } from 'src/app/common/data/report-reason';
import { UserContentType } from 'src/app/common/data/user-content-type';
import { MOCK_DISCUSSION_ELEMENTS } from 'src/app/common/mock/mock-discussion-elements';
import { CommentableContentService } from '../commentable-content-servce';
import { LogInService } from '../log-in/log-in.service';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';

@Injectable({
  providedIn: 'root'
})
export class PollService implements CommentableContentService, RateableContentService, UserAddedContentService<DiscussionElement> {

  constructor(private loginService: LogInService) { }

  getComments(id: number): Observable<CommentData[]> {
    console.log(`Getting poll ${id} comments`);
    return of([])
  }

  addComment(id: number, text: string): Observable<CommentData> {
    console.log(`adding comment to a poll ${id}. Comment text: ${text}`);
    return of()
  }

  upVote(id: number): Observable<RatingData> {
    console.log(`Upvoting poll ${id}`);
    return of({totalRating: 0})
  }

  downVote(id: number): Observable<RatingData> {
    console.log(`Downvoting poll ${id}`);
    return of({totalRating: 0})
  }

  removeVote(id: number): Observable<RatingData> {
    console.log(`Removing vote from poll ${id}`);
    return of({totalRating: 0})
  }

  activate(id: number): Observable<DiscussionElement> {
    console.log(`Activating poll ${id}`);
    return of()
  }

  remove(id: number): Observable<DiscussionElement> {
    console.log(`Removing poll ${id}`);
    return of()
  }

  report(id: number, reason: ReportReason): Observable<DiscussionElement> {
    console.log(`Reporting poll ${id} for ${reason}`);
    return of()
  }

  selectAnswer(pollId: number, answerId: number): Observable<DiscussionElement> {
    console.log(`Selecting answer ${answerId} of poll ${pollId}`);
    return of()
  }

  createPoll(question: string, answers: string[], routeCode: string): Observable<DiscussionElement> {
    console.log(`creating poll on route ${routeCode}`);

    let pollContent: PollContent = {
      question: question,
      answers: answers.map(answer => ({
        answerId: MOCK_DISCUSSION_ELEMENTS.map((el => el.id)).reduce((a, b) => a + b),
        title: answer,
        answererIds: [],
        percentage: 0
      }))
    }
    
    let poll: DiscussionElement = {
      id: MOCK_DISCUSSION_ELEMENTS.map((el => el.id)).reduce((a, b) => a + b),
      creator: this.loginService.getLoggedInUser()!,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      isActive: true,
      isRemoved: false,
      commentsPreview: [],
      commentsAmount: 0,
      routeCode: routeCode,
      attachedFiles: [],
      content: JSON.stringify(pollContent),
      type: UserContentType.POLL
    }

    MOCK_DISCUSSION_ELEMENTS.unshift(poll)

    return of(poll).pipe(delay(500))
    
  }

  update(newQuestion: string, pollId: number): Observable<DiscussionElement> {
    let poll = MOCK_DISCUSSION_ELEMENTS.find(element => element.type === UserContentType.POLL && element.id === pollId)

    if(poll) {
      let pollContent = JSON.parse(poll.content) as PollContent
      pollContent.question = newQuestion
      poll.content = JSON.stringify(pollContent)

      return of(poll).pipe(delay(500))
    } else {
      return of()
    }
  }

}
