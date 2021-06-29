import { HttpClient } from '@angular/common/http';
import { flatten } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { delay, flatMap, map, switchMap, tap } from 'rxjs/operators';
import { UserData } from 'src/app/common/data/user-full-data';
import { LogInRequiredError } from 'src/app/common/errors/log-in-required-error';
import { LogInSubscriber } from 'src/app/common/event-listeners/log-in-subscriber';
import { JAMBURA, JANGULA, PATATA } from 'src/app/common/mock/mocked-short-users';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { environment } from 'src/environments/environment';
import { BackEndUserDataResponse } from '../back-end/response';
import { UserSession } from './user-session';

@Injectable({
  providedIn: 'root'
})
export class LogInService {


  constructor(private cookieService: CookieService, private router: Router, private notificationService: NotificationService, private httpClient: HttpClient) { }

  private SERVICE_URL = environment.userApiUrl

  loginSubscribers: LogInSubscriber[] = []

  registerLogInSubscriber(subscriber: LogInSubscriber) {
    this.loginSubscribers.push(subscriber)
  }

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
      return session.userData.id.toString()
    }
    return undefined
  }

  logIn(userName: string, password: string, remember: boolean): Observable<UserData> {
    let cookieParams = {
      path: "/",
      expires: remember ? 180 : undefined
    }
    
    return this.httpClient.post<BackEndUserDataResponse>(this.SERVICE_URL + "login", {
      username: userName,
      password: password
    })
      .pipe(map(response => ({
        id: response._id,
        firstName: response.name,
        lastName: response.surname,
        isAdmin: response.privilege === 1,
        username: response.surname,
      })))
      .pipe(
        tap(user => {
          this.cookieService.set(SESSION_COOKIE, JSON.stringify({sessionId: user.id, userData: user}), cookieParams)
          this.notifyLogInSubscribers()
        }))

  }

  logOut() {
    this.cookieService.delete(SESSION_COOKIE)
  }

  private notifyLogInSubscribers() {
    this.loginSubscribers.forEach(s => s.userLoggedIn())
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

  register(firstName: string, lastName: string, password: string, email: string, userName: string): Observable<UserData> {

    return this.httpClient.post(this.SERVICE_URL + "users", {
      name: firstName,
      surname: lastName,
      username: userName,
      password: password,
      email: email
    }, { responseType: 'text' })
      .pipe(switchMap(response => this.logIn(userName, password, false)))

  }
}

const SESSION_COOKIE = "user-session"
