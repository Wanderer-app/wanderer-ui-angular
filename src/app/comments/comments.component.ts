import { Component, Input, OnInit } from '@angular/core';
import { CommentData } from '../common/data/comment-data';
import { RatingComponentSize } from '../rating/rating-size';
import { CommentableContentService } from '../services/commentable-content-servce';
import { CommentsService } from '../services/comments/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() contentId!: number
  @Input() comments!: CommentData[]
  @Input() totalCommentsNumber!: number
  @Input() service!: CommentableContentService

  ratingSize: RatingComponentSize = RatingComponentSize.SMALL;

  constructor(public commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  loadMoreComments() {
    this.service.getComments(this.contentId)
    .subscribe(data => data.forEach(d => this.comments.unshift(d)))
  }

}
