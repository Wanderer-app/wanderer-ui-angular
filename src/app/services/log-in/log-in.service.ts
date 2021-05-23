import { Injectable } from '@angular/core';
import { UserFullData } from 'src/app/common/data/user-full-data';
import { JAMBURA, JANGULA, PATATA } from 'src/app/common/mock/mocked-short-users';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor() { }

  users = [JANGULA, PATATA, JAMBURA]

  private loggedInUser = JAMBURA

  getLoggedInUser(): UserFullData | undefined {
    return this.loggedInUser
  }
}
