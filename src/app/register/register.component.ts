import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BaseFormComponent } from '../common/forms/base-form-component';
import { NotificationService } from '../notifications/service/notification.service';
import { LogInService } from '../services/log-in/log-in.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseFormComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private logInService: LogInService, private router: Router, private notificationService: NotificationService) { 
    super(formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      passwordRepeat: ['']
    }))
  }

  registering = false
  errorText?: string

  registerSubscription?: Subscription

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe()
  }

  submitRegisterForm() {
    
    let firstName = this.form.controls.firstName.value
    let lastName = this.form.controls.lastName.value
    let email = this.form.controls.email.value
    let password = this.form.controls.password.value
    let passwordRepeat = this.form.controls.passwordRepeat.value

    if (password !== passwordRepeat) {
      this.form.controls.password.setErrors({custom: {errorText: "პაროლი არ ემთხვევა"}})
      this.form.controls.passwordRepeat.setErrors({custom:  {errorText: "პაროლი არ ემთხვევა"}})
      return
    }

    this.registering = true
    this.registerSubscription = this.logInService.register(firstName, lastName, password, email)
      .pipe(finalize(() => this.registering = false))
      .subscribe(
        userdata => {
          this.notificationService.showStandardSuccess("თქვენ წარმატებით დარეგისტრირდით!")
          this.router.navigate([""])
        },
        error => {
          this.errorText = error
        }
      )

  }

  removePasswordErrors() {
    if(this.form.controls.password.errors && this.form.controls.password.errors.custom) {
      this.form.controls.password.setErrors(null)
      this.form.controls.passwordRepeat.setErrors(null)
    }
  }

}
