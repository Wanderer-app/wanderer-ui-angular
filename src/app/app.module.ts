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
import { ReactiveFormsModule } from '@angular/forms';
import { ContentControlMenuComponent } from './content-control-menu/content-control-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PinsComponent,
    PinsDetailComponent,
    RatingComponent,
    CommentsComponent,
    UserFullNamePipePipe,
    ContentControlMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
