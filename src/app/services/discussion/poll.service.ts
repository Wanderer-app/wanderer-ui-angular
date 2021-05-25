import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommentData } from 'src/app/common/data/comment-data';
import { DiscussionElement } from 'src/app/common/data/duscussion-element';
import { RatingData } from 'src/app/common/data/rating-data';
import { ReportReason } from 'src/app/common/data/report-reason';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';

@Injectable({
  providedIn: 'root'
})
export class PollService implements CommentableContentService, RateableContentService, UserAddedContentService {

  constructor() { }

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

  activate(id: number): Observable<boolean> {
    console.log(`Activating poll ${id}`);
    return of(true)
  }

  remove(id: number): Observable<boolean> {
    console.log(`Removing poll ${id}`);
    return of(true)
  }

  report(id: number, reason: ReportReason): Observable<boolean> {
    console.log(`Reporting poll ${id} for ${reason}`);
    return of(true)
  }

  selectAnswer(pollId: number, answerId: number): Observable<DiscussionElement> {
    console.log(`Selecting answer ${answerId} of poll ${pollId}`);
    return of()
  }

}
