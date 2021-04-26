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

  @Input() commentableContentId!: number
  @Input() comments!: CommentData[]
  @Input() totalCommentsNumber!: number
  @Input() commentableContentService!: CommentableContentService

  ratingSize: RatingComponentSize = RatingComponentSize.SMALL;

  constructor(public commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  loadMoreComments() {
    this.commentableContentService.getComments(this.commentableContentId)
    .subscribe(data => data.forEach(d => this.comments.unshift(d)))
  }

  addCommentToContent() {    
    let commentText = (document.getElementById("newCommentText")! as HTMLInputElement).value
    this.commentableContentService.addComment(this.commentableContentId, commentText)
      .subscribe(newComment =>
        this.comments.push(newComment)
      )
  }

}
