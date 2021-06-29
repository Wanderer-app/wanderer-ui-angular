import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationData } from 'src/app/common/data/notification-data';
import { environment } from 'src/environments/environment';
import { BackEndUserDataResponse } from '../back-end/response';
import { LogInService } from '../log-in/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private logInService: LogInService, private httpClient: HttpClient) { }

  private SERVICE_URL = environment.userApiUrl

  getNotificationsForLoggedInUser(): Observable<NotificationData[]> {

    let user = this.logInService.requireLoggedInUser()

    return this.httpClient.get<BackEndUserDataResponse>(this.SERVICE_URL + "get_user?id=" + user.id)
      .pipe(map(user =>
        (user.notifications || []).map(n => ({
          id: n._id,
          forUser: user._id,
          text: n.text,
          redirectUrl: n.redirect_url,
          createdAt: n.created_at,
          type: n.type,
          status: n.status
        }))

      ))
  
  }

  notificationOpened(id: string): Observable<String> {

    return this.httpClient.post(this.SERVICE_URL + "notification-opened", {
      id: id
    }, { responseType: "text" })
    
  }

  notificationsSeen(ids: string[]): Observable<String> {  
    
    return this.httpClient.post(this.SERVICE_URL + "notifications-seen", {
      ids: ids
    }, { responseType: "text" })
    
  }

}
