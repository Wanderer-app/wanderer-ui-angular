import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DiscussionElement } from 'src/app/common/data/duscussion-element';
import { MOCK_DISCUSSION_ELEMENTS } from 'src/app/common/mock/mock-discussion-elements';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor() { }

  elements = MOCK_DISCUSSION_ELEMENTS

  listForRoute(routeConde: string): Observable<DiscussionElement[]> {
    return of(
      this.elements.filter(e => e.routeCode === routeConde)
    ).pipe(delay(500))
  }

}
