import { Injectable } from '@angular/core';
import { CommentData } from 'src/app/common/data/comment-data';
import { Observable, of } from 'rxjs';
import { RatingData } from 'src/app/common/data/rating-data';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { JAMBURA, JANGULA } from 'src/app/common/mock/mocked-short-users';
import { UserAddedContentService } from '../user-added-content-service';
import { ReportReason } from 'src/app/common/data/report-reason';

@Injectable({
  providedIn: 'root'
})
export class CommentsService implements CommentableContentService, RateableContentService, UserAddedContentService {

  constructor() { }

  activate(id: number): Observable<boolean> {
    console.log(`activating comment ${id}`);
    return of(true)
  }
  remove(id: number): Observable<boolean> {
    console.log(`removing comment ${id}`);
    return of(true)
  }
  report(id: number, reason: ReportReason): Observable<boolean> {
    console.log(`reporting comment ${id} with reason ${reason}`);
    return of(true)
  }
  getComments(id: number): Observable<CommentData[]> {
    console.log(`getting Comment ${id} responses`);
    let data: CommentData[] = [
      {
        id: 100,
        author: JAMBURA,
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
        text: "aeeeeeeeeeeeeee",
        rating: 5,
        isActive: true,
        isRemoved: false,
        responseNumber: 0,
        responsesPreview: [],
    },
    {
        id: 101,
        author: JANGULA,
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
        text: "aeeeeeeeeeeeeeeeee",
        rating: 5,
        isActive: true,
        isRemoved: false,
        responseNumber: 0,
        responsesPreview: [],
    }
    ]
    return of(data)
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

  update(commentId: number, newText: string): Observable<CommentData> {
    console.log(`updating commend ${commentId} with new text: ${newText}`);
    let c = {
      id: 200,
      author: JANGULA,
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
      text: newText,
      rating: 5,
      isActive: true,
      isRemoved: false,
      responseNumber: 0,
      responsesPreview: [],
  }
    return of(c)
  }
}
