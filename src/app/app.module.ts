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

@NgModule({
  declarations: [
    AppComponent,
    PinsComponent,
    PinsDetailComponent,
    RatingComponent,
    CommentsComponent,
    UserFullNamePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
