import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
