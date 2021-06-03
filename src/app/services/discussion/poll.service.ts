import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommentData } from 'src/app/common/data/comment-data';
import { DiscussionElement, PollAnswerData, PollContent } from 'src/app/common/data/duscussion-element';
import { RatingData } from 'src/app/common/data/rating-data';
import { ReportReason, reportReasons } from 'src/app/common/data/report-reason';
import { SortingDirection, SortingParams } from 'src/app/common/listing/listing-params';
import { now } from '../back-end/conversions';
import { UserContentApiService } from '../back-end/user-content-api.service';
import { CommentableContentService } from '../commentable-content-servce';
import { LogInService } from '../log-in/log-in.service';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';

@Injectable({
  providedIn: 'root'
})
export class PollService implements CommentableContentService, RateableContentService, UserAddedContentService<DiscussionElement> {

  constructor(private logInService: LogInService, private api: UserContentApiService) { }

  commentsBatchSize = 5
  commentsSorting: SortingParams = { fieldName: "rating", sortingDirection: SortingDirection.DESCENDING }

  getComments(id: number, pageNumber: number): Observable<CommentData[]> {
    return this.api.listOf<CommentData>(`polls/${id}/comments`, {
      batchNumber: pageNumber,
      batchSize: this.commentsBatchSize,
      sortingParams: this.commentsSorting,
      filters: []
    })
  }

  addComment(id: number, text: string): Observable<CommentData> {
    return this.api.post<CommentData>("polls/add-comment", {
      contentId: id,
      commenterId: this.logInService.getLoggedInUser()!.id,
      commentContent: text,
      date: now()
    })
  }

  upVote(id: number): Observable<RatingData> {
    return this.api.post<RatingData>("polls/up-vote", {
      contentId: id,
      userId: this.logInService.getLoggedInUser()!.id,
      date: now()
    })
  }

  downVote(id: number): Observable<RatingData> {
    return this.api.post<RatingData>("polls/down-vote", {
      contentId: id,
      userId: this.logInService.getLoggedInUser()!.id,
      date: now()
    })
  }

  removeVote(id: number): Observable<RatingData> {
    return this.api.post<RatingData>("polls/remove-vote", {
      contentId: id,
      userId: this.logInService.getLoggedInUser()!.id,
      date: now()
    })
  }

  activate(id: number): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("polls/activate", {
      contentId: id,
      userId: this.logInService.getLoggedInUser()!.id,
      date: now()
    })
  }

  remove(id: number): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("polls/remove", {
      contentId: id,
      userId: this.logInService.getLoggedInUser()!.id,
      date: now()
    })
  }

  report(id: number, reason: ReportReason): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("polls/report", {
      contentId: id,
      userId: this.logInService.getLoggedInUser()!.id,
      date: now(),
      reportReason: reportReasons.get(reason)
    })
  }

  selectAnswer(pollId: number, answerId: number): Observable<DiscussionElement> {
    console.log("aeeeeeeeeee");
    
    return this.api.post<DiscussionElement>("polls/select-answer", {
      pollId: pollId,
      userId: this.logInService.getLoggedInUser()!.id,
      answerId: answerId
    })
  }

  createPoll(question: string, answers: string[], routeCode: string): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("polls/create", {
      onDate: now(),
      userId: this.logInService.getLoggedInUser()!.id,
      routeCode: routeCode,
      text: question,
      answers: answers
    })
  }

  update(newQuestion: string, pollId: number): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("polls/update", {
      pollId: pollId,
      newText: newQuestion,
      updaterId: this.logInService.getLoggedInUser()!.id
    })
  }

}
