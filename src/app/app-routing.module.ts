import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { LogoAnimationComponent } from './logo-animation/logo-animation.component';
import { PinsComponent } from './pins/pins.component';

const routes: Routes = [
  { path: '', component: PinsComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'anim', component: LogoAnimationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
