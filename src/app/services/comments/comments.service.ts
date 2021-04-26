import { Injectable } from '@angular/core';
import { CommentData } from 'src/app/common/data/comment-data';
import { Observable, of } from 'rxjs';
import { RatingData } from 'src/app/common/data/rating-data';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { JAMBURA } from 'src/app/common/mock/mocked-short-users';

@Injectable({
  providedIn: 'root'
})
export class CommentsService implements CommentableContentService, RateableContentService {

  constructor() { }
  getComments(id: number): Observable<CommentData[]> {
    console.log(`getting Comment ${id} responses`);
    return of([])
  }
  addComment(id: number, text: string): Observable<CommentData> {
    console.log(`adding response to comment ${id}. Response text: ${text}`);
    return of()
  }
  upVote(id: number): Observable<RatingData> {
    console.log(`up voting a comment ${id}`);
    let data: RatingData = {totalRating: 0}
    return of(data)
  }
  downVote(id: number): Observable<RatingData> {
    console.log(`down voting a comment ${id}`);
    let data: RatingData = {totalRating: 0}
    return of(data)
  }
  removeVote(id: number): Observable<RatingData> {
    console.log(`removing vote from a comment ${id}`);
    let data: RatingData = {totalRating: 0}
    return of(data)
  }
}
