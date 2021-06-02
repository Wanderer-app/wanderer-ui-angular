import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CommentData } from 'src/app/common/data/comment-data';
import { DiscussionElement } from 'src/app/common/data/duscussion-element';
import { FileData } from 'src/app/common/data/file-data';
import { RatingData } from 'src/app/common/data/rating-data';
import { ReportReason } from 'src/app/common/data/report-reason';
import { UserContentType } from 'src/app/common/data/user-content-type';
import { MOCK_DISCUSSION_ELEMENTS } from 'src/app/common/mock/mock-discussion-elements';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { CommentableContentService } from '../commentable-content-servce';
import { LogInService } from '../log-in/log-in.service';
import { RateableContentService } from '../rateable-content-service';
import { UserAddedContentService } from '../user-added-content-service';

@Injectable({
  providedIn: 'root'
})
export class PostService implements CommentableContentService, RateableContentService, UserAddedContentService<DiscussionElement> {

  constructor(private loginService: LogInService, private notificationService: NotificationService) { }

  getComments(id: number): Observable<CommentData[]> {
    console.log(`Getting post ${id} comments`);
    return of([])
  }

  addComment(id: number, text: string): Observable<CommentData> {
    console.log(`adding comment to a post ${id}. Comment text: ${text}`);
    return of()
  }

  upVote(id: number): Observable<RatingData> {
    console.log(`Upvoting post ${id}`);
    return of({totalRating: 0})
  }

  downVote(id: number): Observable<RatingData> {
    console.log(`Downvoting post ${id}`);
    return of({totalRating: 0})
  }

  removeVote(id: number): Observable<RatingData> {
    console.log(`Removing vote from post ${id}`);
    return of({totalRating: 0})
  }

  activate(id: number): Observable<DiscussionElement> {
    console.log(`Activating post ${id}`);
    return of()
  }

  remove(id: number): Observable<DiscussionElement> {
    console.log(`Removing post ${id}`);
    return of()
  }

  report(id: number, reason: ReportReason): Observable<DiscussionElement> {
    console.log(`Reporting post ${id} for ${reason}`);
    return of()
  }

  createPost(text: string, images: FileData[], routeCode: string): Observable<DiscussionElement> {
    console.log(`creating post on route ${routeCode}`);
    
    let post: DiscussionElement = {
      id: MOCK_DISCUSSION_ELEMENTS.map((el => el.id)).reduce((a, b) => a + b),
      creator: this.loginService.getLoggedInUser()!,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      isActive: true,
      isRemoved: false,
      ratingData: {totalRating: 0},
      commentsPreview: [],
      commentsAmount: 0,
      routeCode: routeCode,
      content: text,
      attachedFiles: images,
      type: UserContentType.POST
    }

    MOCK_DISCUSSION_ELEMENTS.unshift(post)

    return of(post).pipe(delay(500))
    
  }

  update(newText: string, images: FileData[], postId: number): Observable<DiscussionElement> {
    let post = MOCK_DISCUSSION_ELEMENTS.find(element => element.type === UserContentType.POST && element.id === postId)

    if(post) {
      post.content = newText
      post.attachedFiles = images
      return of(post).pipe(delay(500))
    } else {
      this.notificationService.showStandardError("დაფიქსირდა შეცდომა. პოსტი ვერ მოიძებნა")
      return throwError("პოსტი ვერ მოიძებნა")
    }
  }

}
