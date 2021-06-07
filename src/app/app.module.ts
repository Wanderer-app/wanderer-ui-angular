import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PinsComponent } from './pins/pins.component';
import { PinsDetailComponent } from './pins-detail/pins-detail.component';
import { RatingComponent } from './rating/rating.component';
import { CommentsComponent } from './comments/comments.component';
import { UserFullNamePipePipe } from './common/pipes/user-full-name-pipe.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContentControlMenuComponent } from './content-control-menu/content-control-menu.component';
import { AreYouSureModalComponent } from './common/modals/are-you-sure-modal/are-you-sure-modal.component';
import { ContentReportModalComponent } from './common/modals/content-report-modal/content-report-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentRepliesComponent } from './comments/comment-replies/comment-replies.component';
import { NotificationsComponent } from './notifications/component/notifications.component';
import { UpdatePinDetailsComponent } from './pins-detail/update-pin-details/update-pin-details.component';
import { RouteDiscussionComponent } from './route-discussion/route-discussion.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MapComponent } from './map/map.component';
import { RouteDescriptionComponent } from './route-description/route-description.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { CreatePinFormComponent } from './create-pin-form/create-pin-form.component';
import { MaximizedImageComponent } from './maximized-image/maximized-image.component';
import { CreatePostFormComponent } from './create-post-form/create-post-form.component';
import { CreatePollFormModalComponent } from './common/modals/create-poll-form-modal/create-poll-form-modal.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { VarDirective } from './common/directives/var.directive';
import { registerLocaleData } from '@angular/common';
import localeKa from '@angular/common/locales/ka';
import { CookieService } from 'ngx-cookie-service';

registerLocaleData(localeKa)


@NgModule({
  declarations: [
    AppComponent,
    PinsComponent,
    PinsDetailComponent,
    RatingComponent,
    CommentsComponent,
    UserFullNamePipePipe,
    ContentControlMenuComponent,
    AreYouSureModalComponent,
    ContentReportModalComponent,
    CommentRepliesComponent,
    NotificationsComponent,
    UpdatePinDetailsComponent,
    RouteDiscussionComponent,
    MapComponent,
    RouteDescriptionComponent,
    CreatePinFormComponent,
    MaximizedImageComponent,
    CreatePostFormComponent,
    CreatePollFormModalComponent,
    VarDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBxxdK5ZjrGYz-kgOviDEGqgJuTVqMoSUI",
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "wanderer-ui-angular")
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
