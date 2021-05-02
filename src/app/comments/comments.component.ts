import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommentData } from '../common/data/comment-data';
import { CommentableContentService } from '../services/commentable-content-servce';
import { CommentsService } from '../services/comments/comments.service';
import { BaseCommentsComponent } from './base-comments-component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent extends BaseCommentsComponent implements OnInit {

  @Input() commentableContentId!: number
  @Input() comments!: CommentData[]
  @Input() totalCommentsNumber!: number
  @Input() commentableContentService!: CommentableContentService

  addCommentForm = this.formBuilder.group({ newCommentText: [''] })

  constructor(
    public commentsService: CommentsService,
    protected formBuilder: FormBuilder
  ) {
    super(commentsService, formBuilder)
   }

  ngOnInit(): void {
  }

  loadMoreComments() {
    this.commentableContentService.getComments(this.commentableContentId)
    .subscribe(data => this.comments.unshift(...data))
  }

  addCommentToContent() {    
    let commentText = this.addCommentForm.controls.newCommentText.value
    this.commentableContentService.addComment(this.commentableContentId, commentText)
      .subscribe(newComment => {
        this.comments.push(newComment)
      })
    this.addCommentForm.reset()
  }

}
