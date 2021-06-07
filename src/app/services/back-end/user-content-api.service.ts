import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FilterOperation, FilterParam, ListingParams, SortingDirection, SortingParams } from 'src/app/common/listing/listing-params';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { environment } from 'src/environments/environment';
import { LogInService } from '../log-in/log-in.service';
import { ServiceListingResponse, ServiceResponse } from './response';

@Injectable({
  providedIn: 'root'
})
export class UserContentApiService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private logInService: LogInService
  ) { }

  private SERVICE_URL = environment.userContentApiUrl

  private defaultSorting: SortingParams = {
    fieldName: "createdAt",
    sortingDirection: SortingDirection.DESCENDING
  }

  private defaultFilters: FilterParam[] = [
    { fieldName: "isActive", operation: FilterOperation.IS, compareValue: "true" }
  ]

  listOf<T>(endpoint: string, listingParams: ListingParams): Observable<T[]> {

    return this.http.post<ServiceListingResponse<T>>(
      this.SERVICE_URL + endpoint,
      this.modifiedListingParams(listingParams),
      { headers: this.userTokenHeader() }
    )
    .pipe(map(response => {
      if (response.isSuccessful === true) {
        return response.data
      } else {
        this.notificationService.showStandardError(response.message)
        throw new Error(response.message)
      }
    }))
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<ServiceResponse<T>>(this.SERVICE_URL + endpoint, { headers: this.userTokenHeader() })
      .pipe(map(response => this.handleServiceResponse(response)))
  }

  post<T>(endpoint: string, requestBody: any): Observable<T> {
    return this.http.post<ServiceResponse<T>>(
      this.SERVICE_URL + endpoint,
      requestBody,
      { headers: this.userTokenHeader() }
    )
    .pipe(map(response => this.handleServiceResponse(response)))
  }

  private handleServiceResponse<T>(response: ServiceResponse<T>): T {
    if (response.isSuccessful === true) {
      return response.data!
    } else {
      this.notificationService.showStandardError(response.message)
      throw new Error(response.message)
    }
  }

  private modifiedListingParams(params: ListingParams): ListingParams {
    return {
      batchNumber: params.batchNumber,
      batchSize: params.batchSize,
      sortingParams: params.sortingParams || this.defaultSorting,
      filters: this.defaultFilters.concat(params.filters)
    }
  }

  private userTokenHeader() {
    let userId = this.logInService.getLoggedInUserId()

    if(userId) {
      return { "user-token": userId }
    }
    return undefined
  }

}
