import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { finalize, observeOn, tap } from 'rxjs/operators';
import { DiscussionElement } from '../common/data/duscussion-element';
import { DiscussionService } from '../services/discussion/discussion.service';
import { PollService } from '../services/discussion/poll.service';
import { PostService } from '../services/discussion/post.service';

@Component({
  selector: 'app-route-discussion',
  templateUrl: './route-discussion.component.html',
  styleUrls: ['./route-discussion.component.css']
})
export class RouteDiscussionComponent implements OnInit {

  @Input() discussion$!: Observable<DiscussionElement[]>
  @Output() close = new EventEmitter()

  discussionLoading = true

  constructor(
    private discussionService: DiscussionService,
    public postService: PostService,
    public pollService: PollService
  ) { }

  closeIcon = faTimes

  ngOnInit(): void {
    this.discussion$ = this.discussion$.pipe(finalize(() => this.discussionLoading = false))
  }

}
