import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DiscussionElement } from 'src/app/common/data/duscussion-element';
import { SortingDirection, SortingParams } from 'src/app/common/listing/listing-params';
import { UserContentApiService } from '../back-end/user-content-api.service';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private api: UserContentApiService) { }

  discussionsPerPage = 5
  discussionSorting: SortingParams = {fieldName: "createdAt", sortingDirection: SortingDirection.DESCENDING}

  listForRoute(routeCode: string, pageNumber: number): Observable<DiscussionElement[]> {
    return this.api.listOf<DiscussionElement>("discussion/for-route/" + routeCode, {
      batchSize: this.discussionsPerPage,
      batchNumber: pageNumber,
      sortingParams: this.discussionSorting,
      filters: []
    })
  }

}
