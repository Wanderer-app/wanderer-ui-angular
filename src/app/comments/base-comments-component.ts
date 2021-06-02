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

  replyPages: Map<number, number> = new Map()
  hiddenComments: CommentData[] = []

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
      }
    }
  
    getMoreReplies(comment: CommentData) {
      let replyPage = this.nextReplyPage(comment)
      this.commentsService.getComments(comment.id, replyPage)
        .subscribe(replies => {
          if (replies.length !== 0) {
            let allReplies = comment.responsesPreview
            allReplies.push(
              ...replies.filter(r => 
                !allReplies.map(reply => reply.id)
                .includes(r.id)
              )
            )
            this.replyPages.set(comment.id, replyPage + 1)
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

    hide(comment: CommentData) {
      this.hiddenComments.push(comment)
    }

    private nextReplyPage(comment: CommentData): number {
      let replyCount = this.replyPages.get(comment.id)

      if(replyCount) {
        return replyCount
      } else {
        this.replyPages.set(comment.id, 1)
        return 1
      }

    }
}