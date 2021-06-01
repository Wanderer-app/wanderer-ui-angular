import { Injectable } from '@angular/core';
import { CommentData } from 'src/app/common/data/comment-data';
import { Observable, of, throwError  } from 'rxjs';
import { RatingData } from 'src/app/common/data/rating-data';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';
import { ReportReason } from 'src/app/common/data/report-reason';
import { UpdatePinData } from 'src/app/pins-detail/update-pin-details/update-pin-data';
import { PinData, PinShortData } from 'src/app/common/data/pin-data';
import { MOCKED_PIN_DETAILS } from 'src/app/common/mock/mocked-pin-details';
import { PinType, pinTypeNames } from 'src/app/common/data/pinType';
import { delay } from 'rxjs/operators';
import { NewPinInfo } from 'src/app/create-pin-form/new-pin-info';
import { FileData } from 'src/app/common/data/file-data';
import { LogInService } from '../log-in/log-in.service';
import { UserContentApiService } from '../back-end/user-content-api.service';
import { FilterOperation, SortingDirection, SortingParams } from 'src/app/common/listing/listing-params';
import { dateAsRequestString } from '../back-end/conversions';

@Injectable({
  providedIn: 'root'
})
export class PinsService implements CommentableContentService, RateableContentService, UserAddedContentService {

  constructor(private logInService: LogInService, private api: UserContentApiService) { }

  pinsPerPage = 20
  defaultPinSorting: SortingParams = {fieldName: "rating", sortingDirection: SortingDirection.DESCENDING}

  createPin(newPinInfo: NewPinInfo, title: string, text: string, attachedFile: FileData | undefined): Observable<PinData> {
    console.log(`Creating new Pin`);

    let request = {
      onDate: dateAsRequestString(new Date()),
      userId: this.logInService.getLoggedInUser()!.id,
      type: pinTypeNames.get(newPinInfo.type),
      title: title,
      text: text,
      attachedFile: attachedFile,
      location: newPinInfo.location,
      routeCode: newPinInfo.routeCode
    }

    return this.api.post<PinData>("pins/create", request)
  }

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
    updateData.updaterId = this.logInService.getLoggedInUser()!.id
    return this.api.post<PinData>("pins/update", updateData)
  }

  getById(id: number): Observable<PinData> {
    return this.api.get<PinData>("pins/" + id)
  }

  list(): Observable<PinData[]> {
    return this.api.listOf<PinData>("pins/list", {
      batchNumber: 0,
      batchSize: this.pinsPerPage,
      sortingParams: this.defaultPinSorting,
      filters: []
    })
  }

  listForRoute(routeCode: string): Observable<PinShortData[]> {
    return this.api.listOf<PinShortData>("pins/for-route/" + routeCode, {
      batchNumber: 0,
      batchSize: this.pinsPerPage,
      sortingParams: this.defaultPinSorting,
      filters: []
    })
  }

  listForRouteAndType(routeCode: string, pinType: PinType): Observable<PinShortData[]> {

    return this.api.listOf<PinShortData>("pins/for-route/" + routeCode, {
      batchNumber: 0,
      batchSize: this.pinsPerPage,
      sortingParams: this.defaultPinSorting,
      filters: [{ fieldName: "pinType", operation: FilterOperation.IS, compareValue: pinTypeNames.get(pinType) || "" }]
    })
  }
}
