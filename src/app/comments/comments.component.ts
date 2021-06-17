import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommentData } from '../common/data/comment-data';
import { CommentableContentService } from '../services/commentable-content-servce';
import { CommentsService } from '../services/comments/comments.service';
import { BaseCommentsComponent } from './base-comments-component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent extends BaseCommentsComponent implements OnInit, OnDestroy {

  @Input() commentableContentId!: number
  @Input() comments!: CommentData[]
  @Input() totalCommentsNumber!: number
  @Input() commentableContentService!: CommentableContentService

  addCommentForm = this.formBuilder.group({ newCommentText: [''] })

  commentsSubsciption?: Subscription
  addingComment = false

  commentPage = 1

  constructor(
    public commentsService: CommentsService,
    protected formBuilder: FormBuilder
  ) {
    super(commentsService, formBuilder)
  }

  ngOnDestroy(): void {
    this.commentsSubsciption?.unsubscribe()
  }

  ngOnInit(): void {
  }

  loadMoreComments() {
    this.commentsSubsciption = this.commentableContentService.getComments(this.commentableContentId, this.commentPage)
    .subscribe(data => {
      this.comments.unshift(...data.filter(newComment => !this.comments.map(c => c.id).includes(newComment.id)))
      this.commentPage += 1
    })
  }

  addCommentToContent() {        
    let commentText = this.addCommentForm.controls.newCommentText.value
    this.addingComment = true

    this.commentsSubsciption = this.commentableContentService.addComment(this.commentableContentId, commentText)
      .pipe(finalize(() => this.addingComment = false))
      .subscribe(newComment => {
        this.comments.push(newComment)
        this.addCommentForm.reset()
      })
  }

}
