import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentData } from 'src/app/common/data/comment-data';
import { RatingData } from 'src/app/common/data/rating-data';
import { ReportReason } from 'src/app/common/data/report-reason';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';

@Injectable({
  providedIn: 'root'
})
export class PostService implements CommentableContentService, RateableContentService, UserAddedContentService {

  constructor() { }

  getComments(id: number): Observable<CommentData[]> {
    throw new Error('Method not implemented.');
  }

  addComment(id: number, text: string): Observable<CommentData> {
    throw new Error('Method not implemented.');
  }

  upVote(id: number): Observable<RatingData> {
    throw new Error('Method not implemented.');
  }

  downVote(id: number): Observable<RatingData> {
    throw new Error('Method not implemented.');
  }

  removeVote(id: number): Observable<RatingData> {
    throw new Error('Method not implemented.');
  }

  activate(id: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  remove(id: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  report(id: number, reason: ReportReason): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

}
