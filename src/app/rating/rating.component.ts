import { Component, Input, OnInit } from '@angular/core';
import { UserContentType } from '../common/data/user-content-type';
import { VoteDirection } from '../common/data/vote-direction';
import { RatingComponentSize } from './rating-size';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() size!: RatingComponentSize
  @Input() contentId!: Number
  @Input() ratingValue!: Number
  @Input() userVoteDirection?: VoteDirection

  constructor() { }

  ngOnInit(): void {
  }

  getArrowSizeSuffix(): string {
    switch(this.size) {
      case RatingComponentSize.LARGE: 
          return "lg"
      
      case RatingComponentSize.MEDIUM:
        return "md"
    
      case RatingComponentSize.SMALL:
        return "sm"

      default: return "md"
      
    }
  }

  getRatingValueSize(): string {
    switch(this.size) {
      case RatingComponentSize.LARGE: 
          return "xx-large"
      
      case RatingComponentSize.MEDIUM:
        return "xx-large"
    
      case RatingComponentSize.SMALL:
        return "large"

      default: return "xx-large"
      
    }
  }

  upVote() {
    console.log("Upvoting Content " + this.contentId);
    this.userVoteDirection = VoteDirection.UP
  }

  downVote() {
    console.log("Downvoting Content " + this.contentId);
    this.userVoteDirection = VoteDirection.DOWN
  }

  removeVote() {
    console.log("Removing vote from Content " + this.contentId);
    this.userVoteDirection = undefined
  }

  isUpVoted(): boolean {
    return this.userVoteDirection === VoteDirection.UP
  }

  isDownVoted(): boolean {
    return this.userVoteDirection === VoteDirection.DOWN
  }

}
