import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { UserData } from 'src/app/common/data/user-full-data';
import { LogInRequiredError } from 'src/app/common/errors/log-in-required-error';
import { JAMBURA, JANGULA, PATATA } from 'src/app/common/mock/mocked-short-users';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { UserSession } from './user-session';

@Injectable({
  providedIn: 'root'
})
export class LogInService {


  constructor(private cookieService: CookieService, private router: Router, private notificationService: NotificationService) { }

  usersEmails: Map<string, UserData> = new Map([
    ["jambura@gmail.com", JAMBURA],
    ["patata@gmail.com", PATATA],
    ["jangula@gmail.com", JANGULA],
  ])

  getLoggedInUser(): UserData | undefined {
    return this.userSession()?.userData || undefined
  }

  requireLoggedInUser(): UserData {
    let session = this.userSession()

    if(session) {
      return session.userData
    } else {
      this.notificationService.showStandardError("ოპერაციის შესრულებისთვის აუცილებელია ავტორიზაცია")
      this.router.navigate(["log-in"])
      throw new LogInRequiredError("Logged in user required!")
    }
  }

  getLoggedInUserId(): string | undefined {    
    let session = this.userSession()
    if (session) {
      session.userData.id.toString()
    }
    return undefined
  }

  logIn(email: string, password: string, remember: boolean): Observable<UserData> {
    let params = {
      path: "/",
      expires: remember ? 180 : undefined
    }

    let user = this.usersEmails.get(email)
    if (user) {
      return of(user)
        .pipe(
          tap(user => this.cookieService.set(SESSION_COOKIE, JSON.stringify({sessionId: "12345", userData: user}), params))
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
