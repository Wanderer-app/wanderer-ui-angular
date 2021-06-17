import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NotificationData, NotificationStatus, NotificationType } from 'src/app/common/data/notification-data';
import { LogInService } from '../log-in/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private logInService: LogInService) { }

  getNotificationsForLoggedInUser(pageSize: number, pageNumber: number): Observable<NotificationData[]> {
    console.log("Getting notifications");
    
    let user = this.logInService.requireLoggedInUser()
    return of(this.notifications).pipe(delay(500))

  }

  notificationOpened(id: number): Observable<NotificationData> {
    console.log("Notification opened");

    let notification = this.notifications.find(n => n.id === id)

    if(notification) {
      notification.status = NotificationStatus.OPENED
      return of(notification).pipe(delay(500))
    }
    return of()
    
  }

  notificationsSeen(ids: number[]): Observable<NotificationData[]> {    
    this.notifications
      .filter(n => ids.includes(n.id))
      .forEach(n => n.status = NotificationStatus.SEEN)
    
    return of(this.notifications)
  }

  notifications: NotificationData[] = [
    {
      id: 1,
      forUser: 1,
      text: "მომხმარებელმა Nikoloz Patatishvili დააკომენტარა თქვენი პინი",
      redirectUrl: "/?route=TB201301&pin=1",
      createdAt: "2021-06-10",
      type: NotificationType.COMMENT,
      status: NotificationStatus.UNSEEN
    },
    {
      id: 2,
      forUser: 1,
      text: "მომხმარებელმა Nika Jangulashvili შეაფასა თქვენი პინი",
      redirectUrl: "/?route=TB201301&pin=2",
      createdAt: "2021-06-10",
      type: NotificationType.RATING,
      status: NotificationStatus.UNSEEN
    },
    {
      id: 3,
      forUser: 1,
      text: "aaaa",
      redirectUrl: "/?route=TB201301&pin=3",
      createdAt: "2021-06-10",
      type: NotificationType.COMMENT,
      status: NotificationStatus.UNSEEN
    },
    {
      id: 4,
      forUser: 1,
      text: "თქვენი პინი სათაურით 'აეეეეეეეე' დაბლოკა ადმინისტრაციამ",
      redirectUrl: "",
      createdAt: "2021-06-10",
      type: NotificationType.CONTENT_STATUS_CHANGE,
      status: NotificationStatus.OPENED
    },
    {
      id: 5,
      forUser: 1,
      text: "მომხმარებელმა Nika Jangulashvili უპასუხა თქვენ კომენტარს 'რაღაცა ტექს...'",
      redirectUrl: "/?route=TB201301&post=4",
      createdAt: "2021-06-10",
      type: NotificationType.REPLY,
      status: NotificationStatus.OPENED
    },
  ]
}
