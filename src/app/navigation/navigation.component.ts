import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faMapMarkedAlt, faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserData } from '../common/data/user-full-data';
import { LogInService } from '../services/log-in/log-in.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private logInService: LogInService, private router: Router) { }

  userIcon = faUser
  logOutIcon = faSignOutAlt
  cogIcon = faCog
  mapIcon = faMapMarkedAlt
  logInIcon = faSignInAlt

  isCollapsed = true;

  ngOnInit(): void {
  }

  logOut(element: HTMLElement) {
    element.classList.add("d-none")
    this.logInService.logOut()
    this.router.navigate([""])
  }

  loggedInUser(): UserData | undefined {
    return this.logInService.getLoggedInUser()
  }

}
