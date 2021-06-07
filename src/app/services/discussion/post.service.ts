import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CommentData } from 'src/app/common/data/comment-data';
import { DiscussionElement } from 'src/app/common/data/duscussion-element';
import { FileData } from 'src/app/common/data/file-data';
import { RatingData } from 'src/app/common/data/rating-data';
import { ReportReason, reportReasons } from 'src/app/common/data/report-reason';
import { UserContentType } from 'src/app/common/data/user-content-type';
import { SortingDirection, SortingParams } from 'src/app/common/listing/listing-params';
import { MOCK_DISCUSSION_ELEMENTS } from 'src/app/common/mock/mock-discussion-elements';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { now } from '../back-end/conversions';
import { UserContentApiService } from '../back-end/user-content-api.service';
import { CommentableContentService } from '../commentable-content-servce';
import { LogInService } from '../log-in/log-in.service';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';

@Injectable({
  providedIn: 'root'
})
export class PostService implements CommentableContentService, RateableContentService, UserAddedContentService<DiscussionElement> {

  constructor(private logInService: LogInService, private notificationService: NotificationService, private api: UserContentApiService) { }

  commentsBatchSize = 5
  commentsSorting: SortingParams = { fieldName: "rating", sortingDirection: SortingDirection.DESCENDING }

  getComments(id: number, pageNumber: number): Observable<CommentData[]> {
    return this.api.listOf<CommentData>(`posts/${id}/comments`, {
      batchNumber: pageNumber,
      batchSize: this.commentsBatchSize,
      sortingParams: this.commentsSorting,
      filters: []
    })
  }

  addComment(id: number, text: string): Observable<CommentData> {
    return this.api.post<CommentData>("posts/add-comment", {
      contentId: id,
      commenterId: this.logInService.requireLoggedInUser().id,
      commentContent: text,
      date: now()
    })
  }

  upVote(id: number): Observable<RatingData> {
    return this.api.post<RatingData>("posts/up-vote", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  downVote(id: number): Observable<RatingData> {
    return this.api.post<RatingData>("posts/down-vote", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  removeVote(id: number): Observable<RatingData> {
    return this.api.post<RatingData>("posts/remove-vote", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  activate(id: number): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("posts/activate", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  remove(id: number): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("posts/remove", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  report(id: number, reason: ReportReason): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("posts/report", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now(),
      reportReason: reportReasons.get(reason)
    })
  }

  createPost(text: string, images: FileData[], routeCode: string): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("posts/create", {
      onDate: now(),
      userId: this.logInService.requireLoggedInUser().id,
      routeCode: routeCode,
      text: text,
      attachedFiles: images
    })
  }

  update(newText: string, images: FileData[], postId: number): Observable<DiscussionElement> {
    return this.api.post<DiscussionElement>("posts/update", {
      postId: postId,
      newText: newText,
      files: images,
      updaterId: this.logInService.requireLoggedInUser().id
    })
  }

}
