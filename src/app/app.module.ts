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
import { RouteInformationModalComponent } from './common/modals/route-information-modal/route-information-modal.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MapComponent } from './map/map.component';


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
    RouteInformationModalComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({ apiKey: "AIzaSyC6H2kgr-9t53QyCpT4v-4Ee7JO73x4bvs" })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
