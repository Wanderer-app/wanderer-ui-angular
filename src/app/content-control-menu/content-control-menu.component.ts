import { Component, Input, OnInit } from '@angular/core';
import { UserContentType } from '../common/data/user-content-type';
import { UserFullData } from '../common/data/user-full-data';
import { JAMBURA } from '../common/mock/mocked-short-users';
import { ContentControlMenuPlacement } from './menu-placement';

@Component({
  selector: 'app-content-control-menu',
  templateUrl: './content-control-menu.component.html',
  styleUrls: ['./content-control-menu.component.css']
})
export class ContentControlMenuComponent implements OnInit {

  @Input() placement!: ContentControlMenuPlacement
  @Input() contentType!: UserContentType
  @Input() contentId!: number
  @Input() contentCreatorId!: number
  @Input() contentIsActive!: boolean

  loggedInUser: UserFullData = {
    id: 111111,
    firstName: JAMBURA.firstName,
    lastName: JAMBURA.lastName,
    isAdmin: true
  }

  constructor() { }

  ngOnInit(): void {
  }

  hasFullRights(): boolean {    
    return this.loggedInUser.id === this.contentCreatorId || this.loggedInUser.isAdmin
  }

  isCreator(): boolean {
    return this.loggedInUser.id === this.contentCreatorId
  }

  isPin(): boolean {
    return this.contentType === UserContentType.PIN
  }

  canReport(): boolean {
    return this.loggedInUser.id !== this.contentCreatorId || (this.loggedInUser.isAdmin && this.loggedInUser.id !== this.contentCreatorId)
  }

}
