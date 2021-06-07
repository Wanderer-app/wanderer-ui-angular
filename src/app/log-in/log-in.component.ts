import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { BaseFormComponent } from '../common/forms/base-form-component';
import { NotificationService } from '../notifications/service/notification.service';
import { LogInService } from '../services/log-in/log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent extends BaseFormComponent implements OnInit, OnDestroy {

  constructor(formBuilder: FormBuilder,
    private logInService: LogInService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    super(formBuilder.group({
      email: [''],
      password: [''],
      remember: [false]
    }))
   }

  loggingIn = false
  errorText?: string
  logInSubscription?: Subscription

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.logInSubscription?.unsubscribe()
  }

  submitLogInForm() {
    this.loggingIn = false
    this.logInSubscription = this.logInService.logIn(
      this.form.controls.email.value,
      this.form.controls.password.value,
      this.form.controls.remember.value
    )
      .pipe(finalize(() => this.loggingIn = false))
      .pipe(catchError(error => this.handleError(error)))
      .subscribe(user => {
        if(user) {
          this.notificationService.showStandardSuccess("თქვენ შეხვედით სისტემაში")
          this.router.navigate([""])
        }
      })

  }

  handleError(error: any): any {
    this.errorText = error
  }

}
