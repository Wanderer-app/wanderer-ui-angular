import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PinsComponent } from './pins/pins.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: PinsComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
