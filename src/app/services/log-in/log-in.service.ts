import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { UserFullData } from 'src/app/common/data/user-full-data';
import { JAMBURA, JANGULA, PATATA } from 'src/app/common/mock/mocked-short-users';
import { UserSession } from './user-session';

@Injectable({
  providedIn: 'root'
})
export class LogInService {


  constructor(private cookieService: CookieService) { }

  usersEmails: Map<string, UserFullData> = new Map([
    ["jambura@gmail.lcom", JAMBURA],
    ["patata@gmail.lcom", PATATA],
    ["jangula@gmail.lcom", JANGULA],
  ])

  private loggedInUser = JAMBURA

  getLoggedInUser(): UserFullData | undefined {
    return this.loggedInUser
  }

  getLoggedInUserToken(): string | undefined {
    return this.loggedInUser.id.toString()
  }

  logIn(email: string, password: string, remember: boolean): Observable<UserFullData> {
    let params = {
      path: "/",
      expires: remember ? 180 : undefined
    }

    let user = this.usersEmails.get(email)
    if (user) {
      return of(user)
        .pipe(
          tap(user => this.cookieService.set(SESSION_COOKIE, JSON.stringify(user), params))
        )
        .pipe(delay(500))
    } else {
      return throwError("მომხმარებელი ვერ მოიძებნა")
    }
  }

  logOut() {
    this.cookieService.delete(SESSION_COOKIE)
  }

  private userSession(): UserSession | undefined {

    if(this.cookieService.check(SESSION_COOKIE) === true) {
      return JSON.parse(
        this.cookieService.get(SESSION_COOKIE)
      ) as UserSession
    } else {
      return undefined
    }
  }
}

const SESSION_COOKIE = "user-session"
