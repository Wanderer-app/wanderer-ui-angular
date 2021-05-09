import { Injectable } from '@angular/core';
import { CommentData } from 'src/app/common/data/comment-data';
import { Observable, of  } from 'rxjs';
import { RatingData } from 'src/app/common/data/rating-data';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';
import { ReportReason } from 'src/app/common/data/report-reason';
import { UpdatePinData } from 'src/app/pins-detail/update-pin-details/update-pin-data';
import { PinData, PinShortData } from 'src/app/common/data/pin-data';
import { MOCKED_PIN_DETAILS } from 'src/app/pins-detail/data/mocked-pin-details';
import { PinType } from 'src/app/common/data/pinType';

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
    if (reason === ReportReason.IRRELEVANT) {
      console.log(`marking Pin ${id} as irrelevant`);
    } else {
      console.log(`reporting Pin ${id} with reason ${reason}`);
    }
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

  update(updateData: UpdatePinData): Observable<PinData> {
    console.log(`Updating pin ${updateData.pinId}`);
    console.log(updateData);
    return of()
  }

  getById(id: number): Observable<PinData | undefined> {
    return of(MOCKED_PIN_DETAILS.find(data => data.id === id))
  }

  list(): Observable<PinData[]> {
    return of(MOCKED_PIN_DETAILS)
  }

  listForRoute(routeCode: string): Observable<PinShortData[]> {
    return of(
      MOCKED_PIN_DETAILS.map(data => {
        return {
          id: data.id,
          routeCode: data.routeCode,
          location: data.location,
          type: data.type,
          createdAt: data.createdAt,
          title: data.title,
          rating: data.rating.totalRating
        } as PinShortData
      }).filter(pin => pin.routeCode === routeCode)
    )
  }

  listForRouteAndType(routeCode: string, pinType: PinType): Observable<PinShortData[]> {
    return of(
      MOCKED_PIN_DETAILS.map(data => {
        return {
          id: data.id,
          routeCode: data.routeCode,
          location: data.location,
          type: data.type,
          createdAt: data.createdAt,
          title: data.title,
          rating: data.rating.totalRating
        } as PinShortData
      })
      .filter(pin => pin.routeCode === routeCode)
      .filter(pin => pin.type === pinType)
    )
  }
}
