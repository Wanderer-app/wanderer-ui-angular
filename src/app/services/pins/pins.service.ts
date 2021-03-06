import { Injectable } from '@angular/core';
import { CommentData } from 'src/app/common/data/comment-data';
import { Observable, of, throwError  } from 'rxjs';
import { RatingData } from 'src/app/common/data/rating-data';
import { CommentableContentService } from '../commentable-content-servce';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';
import { ReportReason, reportReasons } from 'src/app/common/data/report-reason';
import { UpdatePinData } from 'src/app/pins-detail/update-pin-details/update-pin-data';
import { PinData, PinShortData } from 'src/app/common/data/pin-data';
import { NewPinInfo } from 'src/app/create-pin-form/new-pin-info';
import { FileData } from 'src/app/common/data/file-data';
import { LogInService } from '../log-in/log-in.service';
import { UserContentApiService } from '../back-end/user-content-api.service';
import { FilterOperation, FilterParam, SortingDirection, SortingParams } from 'src/app/common/listing/listing-params';
import { now } from '../back-end/date-functions';

@Injectable({
  providedIn: 'root'
})
export class PinsService implements CommentableContentService, RateableContentService, UserAddedContentService<PinData> {

  constructor(private logInService: LogInService, private api: UserContentApiService) { }

  pinsPerPage = 20
  commentsPageSize = 10
  defaultPinSorting: SortingParams = {fieldName: "rating", sortingDirection: SortingDirection.DESCENDING}

  createPin(newPinInfo: NewPinInfo, title: string, text: string, attachedFile: FileData | undefined): Observable<PinData> {
    let request = {
      onDate: now(),
      userId: this.logInService.requireLoggedInUser().id,
      type: newPinInfo.type,
      title: title,
      text: text,
      attachedFile: attachedFile,
      location: newPinInfo.location,
      routeCode: newPinInfo.routeCode
    }

    return this.api.post<PinData>("pins/create", request)
  }

  activate(id: number): Observable<PinData> {
    return this.api.post<PinData>("pins/activate", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  remove(id: number): Observable<PinData> {
    return this.api.post<PinData>("pins/remove", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  report(id: number, reason: ReportReason): Observable<PinData> {
    if (reason === ReportReason.IRRELEVANT) {
      return this.api.post<PinData>("pins/report-irrelevant", {
        contentId: id,
        userId: this.logInService.requireLoggedInUser().id,
        date: now()
      })
    } else {
      return this.api.post<PinData>("pins/report", {
        contentId: id,
        userId: this.logInService.requireLoggedInUser().id,
        date: now(),
        reportReason: reportReasons.get(reason)
      })
    }
  }

  getComments(id: number, pageNumber: number): Observable<CommentData[]> {
    return this.api.listOf<CommentData>(`pins/${id}/comments`, {
      batchNumber: pageNumber,
      batchSize: this.commentsPageSize,
      sortingParams: this.defaultPinSorting,
      filters: []
    })
  }

  addComment(id: number, text: string): Observable<CommentData> {
    return this.api.post<CommentData>("pins/add-comment", {
      contentId: id,
      commenterId: this.logInService.requireLoggedInUser().id,
      commentContent: text,
      date: now()
    })
  }

  upVote(id: number): Observable<RatingData> {
    return this.api.post("pins/up-vote", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  downVote(id: number): Observable<RatingData> {
    return this.api.post("pins/down-vote", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  removeVote(id: number): Observable<RatingData> {
    return this.api.post("pins/remove-vote", {
      contentId: id,
      userId: this.logInService.requireLoggedInUser().id,
      date: now()
    })
  }

  update(updateData: UpdatePinData): Observable<PinData> {
    updateData.updaterId = this.logInService.requireLoggedInUser().id
    return this.api.post<PinData>("pins/update", updateData)
  }

  getById(id: number): Observable<PinData> {
    return this.api.get<PinData>("pins/" + id)
  }

  list(): Observable<PinData[]> {
    return this.api.listOf<PinData>("pins/list", {
      batchNumber: 1,
      batchSize: this.pinsPerPage,
      sortingParams: this.defaultPinSorting,
      filters: []
    })
  }

  listForRoute(routeCode: string, pageNumber: number, filters: FilterParam[], sorting?:SortingParams): Observable<PinShortData[]> {
    return this.api.listOf<PinShortData>("pins/for-route/" + routeCode, {
      batchNumber: pageNumber,
      batchSize: this.pinsPerPage,
      sortingParams: sorting || this.defaultPinSorting,
      filters: filters
    })
  }

  // listForRouteAndType(routeCode: string, pinType: PinType): Observable<PinShortData[]> {

  //   return this.api.listOf<PinShortData>("pins/for-route/" + routeCode, {
  //     batchNumber: 1,
  //     batchSize: this.pinsPerPage,
  //     sortingParams: this.defaultPinSorting,
  //     filters: [{ fieldName: "pinType", operation: FilterOperation.IS, compareValue: pinType }]
  //   })
  // }
}
