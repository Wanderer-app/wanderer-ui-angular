import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selectedCommentForReply?: CommentData = undefined

  addCommentForm = this.formBuilder.group({
    newCommentText: ['']
  })

  replyForm = this.formBuilder.group({
    replyText: ['']
  })

  constructor(
    public commentsService: CommentsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  loadMoreComments() {
    this.commentableContentService.getComments(this.commentableContentId)
    .subscribe(data => data.forEach(d => this.comments.unshift(d)))
  }

  addCommentToContent() {    
    let commentText = this.addCommentForm.controls.newCommentText.value
    this.commentableContentService.addComment(this.commentableContentId, commentText)
      .subscribe(newComment => {
        this.comments.push(newComment)
      })
    this.addCommentForm.reset()
  }

  showReplyForm(comment: CommentData) {
    this.selectedCommentForReply = comment
  }

  replyToComment() {
    if (this.selectedCommentForReply) {
      let comment = this.selectedCommentForReply
      let replyText = this.replyForm.controls.replyText.value

      this.commentsService.addComment(this.selectedCommentForReply.id, replyText)
        .subscribe(reply => {
          comment.responsesPreview.push(reply);
          this.selectedCommentForReply = undefined
        })
        this.replyForm.reset()
    }
  }

}
