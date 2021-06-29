import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faCircle, faCog, faComment, faComments, faInfoCircle, faMapMarkedAlt, faRoute, faSignInAlt, faSignOutAlt, faStar, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { NotificationData, NotificationStatus, NotificationType } from '../common/data/notification-data';
import { UserData } from '../common/data/user-full-data';
import { LogInSubscriber } from '../common/event-listeners/log-in-subscriber';
import { LogInService } from '../services/log-in/log-in.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy, LogInSubscriber {

  constructor(private logInService: LogInService, private router: Router, private userService: UserService) { }

  userIcon = faUser
  logOutIcon = faSignOutAlt
  cogIcon = faCog
  mapIcon = faMapMarkedAlt
  logInIcon = faSignInAlt
  notificationsIcon = faBell

  pinsIcon = faRoute
  newNotificationIcon = faCircle

  isCollapsed = true;

  notifications?: NotificationData[]
  notificationsSubscription?: Subscription
  notificationStatus = NotificationStatus
  notificationType = NotificationType

  ngOnInit(): void {
    this.loadNotifications()
    this.logInService.registerLogInSubscriber(this)
  }

  ngOnDestroy(): void {
    this.notificationsSubscription?.unsubscribe()
  }

  userLoggedIn(): void {
    this.loadNotifications()
  }

  loadNotifications() {
    if(this.loggedInUser()) {
      this.userService.getNotificationsForLoggedInUser()
      .subscribe(data => {
        this.notifications = data
      }) 
    }
  }

  logOut(element: HTMLElement) {
    element.classList.add("d-none")
    this.logInService.logOut()
    this.router.navigate([""])
  }

  loggedInUser(): UserData | undefined {
    return this.logInService.getLoggedInUser()
  }

  notificationTypeIcons: Map<NotificationType, IconDefinition> = new Map([
    [NotificationType.COMMENT, faComment],
    [NotificationType.REPLY, faComments],
    [NotificationType.RATING, faStar],
    [NotificationType.CONTENT_STATUS_CHANGE, faInfoCircle]
  ])

  unseenNotificationsCount(): number {
    if(this.notifications) {
      return this.notifications.filter(n => n.status === NotificationStatus.UNSEEN).length
    } else {
      return 0;
    }
  }

  notificationClicked(notification: NotificationData) {
    this.notificationsSubscription = this.userService.notificationOpened(notification.id)
      .subscribe(n => notification.status = NotificationStatus.OPENED)

    if (notification.redirectUrl !== "") {
      this.router.navigateByUrl(this.router.parseUrl(notification.redirectUrl))
    }
  }

  notificationsSeen() {
    if(this.notifications) {
      this.notificationsSubscription = this.userService.notificationsSeen(
        this.notifications
        .filter(n => n.status === NotificationStatus.UNSEEN)
        .map(n => n.id)
      ).subscribe(reslut => {
        this.notifications!
          .filter(n => n.status === NotificationStatus.UNSEEN)
          .forEach(n => n.status = NotificationStatus.SEEN)
      })      
    }
  }

  orderByStatus(notification: NotificationData[]): NotificationData[] {
    return notification.filter(d => d.status === NotificationStatus.UNSEEN)
        .concat(notification.filter(d => d.status === NotificationStatus.SEEN))
        .concat(notification.filter(d => d.status === NotificationStatus.OPENED))
  }

}
