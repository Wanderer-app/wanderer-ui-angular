import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommentData } from 'src/app/common/data/comment-data';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { BaseCommentsComponent } from '../base-comments-component';

@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.css']
})
export class CommentRepliesComponent extends BaseCommentsComponent implements OnInit {

  @Input() comment!: CommentData
  @Input() level!: number

  readonly MAX_LEVEL: number = 5;

  showReplies: boolean = false 

  constructor(
    public commentsService: CommentsService,
    protected formBuilder: FormBuilder
  ) {
    super(commentsService, formBuilder)
   }

  ngOnInit(): void {
  }

  gerRepliesForReply(reply: CommentData) {
    this.showReplies = true
    super.getMoreReplies(reply)
  }


}
