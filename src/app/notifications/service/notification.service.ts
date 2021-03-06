import { Injectable, TemplateRef } from '@angular/core';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { NotificationToast } from './notification-toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationToasts: NotificationToast[] = []

  constructor() { }


  show(notification: NotificationToast) {
    this.notificationToasts.push(notification)
  }

  remove(notification: NotificationToast) {
    this.notificationToasts = this.notificationToasts.filter(toast => toast !== notification)
  }

  showStandardSuccess(text: string) {
    this.notificationToasts.push ({
      cssClasses: "bg-light",
      content: {
        text: text,
        icon: faCheckCircle,
        iconCssClasses: "text-success"
      },
      dissapearAfter: 3000
    })
  }

  showStandardError(text: string) {
    this.notificationToasts.push ({
      cssClasses: "bg-light",
      content: {
        text: text,
        icon: faExclamationCircle,
        iconCssClasses: "text-danger"
      },
      dissapearAfter: 5000
    })
  }

}
