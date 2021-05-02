import { FormBuilder } from "@angular/forms";
import { faEdit, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CommentData } from "../common/data/comment-data";
import { UserContentType } from "../common/data/user-content-type";
import { ContentControlMenuPlacement } from "../content-control-menu/menu-placement";
import { RatingComponentSize } from "../rating/rating-size";
import { CommentsService } from "../services/comments/comments.service";

export abstract class BaseCommentsComponent {

  ratingSize: RatingComponentSize = RatingComponentSize.SMALL;
  selectedCommentForReply?: CommentData = undefined
  commentContentType: UserContentType = UserContentType.COMMENT
  controlMenuPlacement = ContentControlMenuPlacement.LEFT_TOP    

  commentToEdit?: CommentData

  sendIcon = faPaperPlane
  closeIcon = faTimes
  editIcon = faEdit

  replyForm = this.formBuilder.group({ replyText: [''] })
  editCommentForm = this.formBuilder.group({ newText: [''] })


  constructor(
      protected commentsService: CommentsService,
      protected formBuilder: FormBuilder
    ) { }

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
  
    getMoreReplies(comment: CommentData) {
      this.commentsService.getComments(comment.id)
        .subscribe(replies => {
          if (replies.length !== 0) {
            comment.responsesPreview.push(...replies)
          }
        })
    }

    enterEditMode(comment: CommentData) {
      this.commentToEdit = comment
    }
  
    exitEditMode() {
      this.commentToEdit = undefined
    }
  
    isEditable(comment: CommentData): boolean {
      return this.commentToEdit === comment
    }
  
    updateComment() {
      let newText = this.editCommentForm.controls.newText.value
      if (this.commentToEdit) {
        this.commentsService.update(this.commentToEdit.id, newText).subscribe(updatedComment => {
          this.commentToEdit!!.text = newText
          this.exitEditMode()
        })
      }
    }
  
    canUpdate(): boolean {
      return this.editCommentForm.controls.newText.value !== this.commentToEdit?.text
    }
}