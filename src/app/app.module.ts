import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PinsComponent } from './pins/pins.component';
import { PinsDetailComponent } from './pins-detail/pins-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PinsComponent,
    PinsDetailComponent
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
