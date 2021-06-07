import { Injectable } from '@angular/core';
import { CommentData } from 'src/app/common/data/comment-data';
import { Observable, of } from 'rxjs';
import { RatingData } from 'src/app/common/data/rating-data';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';
import { ReportReason, reportReasons } from 'src/app/common/data/report-reason';
import { LogInService } from '../log-in/log-in.service';
import { UserContentApiService } from '../back-end/user-content-api.service';
import { now } from '../back-end/conversions';
import { SortingDirection, SortingParams } from 'src/app/common/listing/listing-params';

@Injectable({
  providedIn: 'root'
})
export class CommentsService implements CommentableContentService, RateableContentService, UserAddedContentService<CommentData> {

  constructor(private loginService: LogInService, private api: UserContentApiService) { }

  repliesPerPage = 5
  defaultCommentSorting: SortingParams = {fieldName: "rating", sortingDirection: SortingDirection.DESCENDING}


  activate(id: number): Observable<CommentData> {
    return this.api.post<CommentData>("comments/activate", {
      contentId: id,
      userId: this.loginService.requireLoggedInUser().id,
      date: now()
    })
  }

  remove(id: number): Observable<CommentData> {
    return this.api.post<CommentData>("comments/remove", {
      contentId: id,
      userId: this.loginService.requireLoggedInUser().id,
      date: now()
    })
  }

  report(id: number, reason: ReportReason): Observable<CommentData> {
    return this.api.post<CommentData>("comments/report", {
      contentId: id,
      userId: this.loginService.requireLoggedInUser().id,
      date: now(),
      reportReason: reportReasons.get(reason)
    })
  }

  getComments(id: number, pageNumber: number): Observable<CommentData[]> {
    return this.api.listOf<CommentData>(`comments/${id}/replies`, {
      batchNumber: pageNumber,
      batchSize: this.repliesPerPage,
      sortingParams: this.defaultCommentSorting,
      filters: []
    })
  }

  addComment(id: number, text: string): Observable<CommentData> {
    return this.api.post<CommentData>("comments/add-reply", {
      contentId: id,
      commenterId: this.loginService.requireLoggedInUser().id,
      commentContent: text,
      date: now()
    })
  }

  upVote(id: number): Observable<RatingData> {
    return this.api.post("comments/up-vote", {
      contentId: id,
      userId: this.loginService.requireLoggedInUser().id,
      date: now()
    })
  }

  downVote(id: number): Observable<RatingData> {
    return this.api.post("comments/down-vote", {
      contentId: id,
      userId: this.loginService.requireLoggedInUser().id,
      date: now()
    })
  }

  removeVote(id: number): Observable<RatingData> {
    return this.api.post("comments/remove-vote", {
      contentId: id,
      userId: this.loginService.requireLoggedInUser().id,
      date: now()
    })
  }

  update(commentId: number, newText: string): Observable<CommentData> {
   return this.api.post<CommentData>("comments/update", {
      commentId: commentId,
      updaterId: this.loginService.requireLoggedInUser().id,
      text: newText
    })
  }
}
