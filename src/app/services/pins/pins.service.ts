import { Injectable } from '@angular/core';
import { CommentData } from 'src/app/common/data/comment-data';
import { Observable, of  } from 'rxjs';
import { RatingData } from 'src/app/common/data/rating-data';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';
import { ReportReason } from 'src/app/common/data/report-reason';

@Injectable({
  providedIn: 'root'
})
export class PinsService implements CommentableContentService, RateableContentService, UserAddedContentService {

  constructor() { }

  activate(id: number): Observable<boolean> {
    console.log(`activating Pin ${id}`);
    return of(true)
  }
  remove(id: number): Observable<boolean> {
    console.log(`removing Pin ${id}`);
    return of(true)
  }
  report(id: number, reason: ReportReason): Observable<boolean> {
    console.log(`reporting Pin ${id} with reason ${reason}`);
    return of(true)
  }
  getComments(id: number): Observable<CommentData[]> {
    console.log(`getting Pin ${id} comments`);
    return of([])
  }
  addComment(id: number, text: string): Observable<CommentData> {
    console.log(`adding comment to a pin ${id}. Comment text: ${text}`);
    return of()
  }
  upVote(id: number): Observable<RatingData> {
    console.log(`up voting a pin ${id}`);
    let data: RatingData = {totalRating: 0}
    return of(data)
  }
  downVote(id: number): Observable<RatingData> {
    console.log(`down voting a pin ${id}`);
    let data: RatingData = {totalRating: 0}
    return of(data)
  }
  removeVote(id: number): Observable<RatingData> {
    console.log(`removing vote from a pin ${id}`);
    let data: RatingData = {totalRating: 0}
    return of(data)
  }
}