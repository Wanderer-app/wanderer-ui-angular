import { Injectable } from '@angular/core';
import { CommentData } from 'src/app/common/data/comment-data';
import { Observable, of } from 'rxjs';
import { RatingData } from 'src/app/common/data/rating-data';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService implements CommentableContentService, RateableContentService {

  constructor() { }
  getComments(id: number): Observable<CommentData[]> {
    throw new Error('Method not implemented.');
  }
  addComment(id: number): Observable<CommentData> {
    throw new Error('Method not implemented.');
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
