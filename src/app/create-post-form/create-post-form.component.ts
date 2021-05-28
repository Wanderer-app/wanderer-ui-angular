import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faPaperclip, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FileType } from '../common/data/file-data';
import { BaseFormComponent } from '../common/forms/base-form-component';
import { PostService } from '../services/discussion/post.service';
import { ExternalImageService, UploadedImageData } from '../services/external-images/external-image.service';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.css']
})
export class CreatePostFormComponent extends BaseFormComponent implements OnInit, OnDestroy {

  @Input() routeCode!: string
  @Output() postCreated = new EventEmitter()

  clipIcon = faPaperclip
  roundTimesIcon = faTimes
  uploadedImages: Observable<UploadedImageData>[] = []
  uploadedImageIds: Set<string> = new Set()

  createSubscription?: Subscription
  creatingPost = false

  constructor(private formBuilder: FormBuilder, private postService: PostService, private imgService: ExternalImageService) {
    super(formBuilder.group({
      text: ['']
    }))
  }

  ngOnDestroy(): void {
    this.createSubscription?.unsubscribe()
  }

  ngOnInit(): void {
  }

  createPost() {
    this.creatingPost = true
    console.log(Array.from(document.getElementsByClassName("uploaded-img")));
    
    this.createSubscription = this.postService.createPost(
      this.form.controls.text.value,
      Array.from(document.getElementsByClassName("uploaded-img")).map(element => ({externalId: element.id!, fileType: FileType.IMAGE})),
      this.routeCode
    ).pipe(finalize(() => this.creatingPost = false))
    .subscribe(post => this.postCreated.emit(post))
  }

  fileSelected(event: Event) {
    let files = (event.target as HTMLInputElement).files
    if(files) {
      this.uploadedImages.push(...this.imgService.uploadMultipleImages(Array.from(files)))
    }
  }

  removeImage(imageObservable: Observable<UploadedImageData>) {
    this.uploadedImages = this.uploadedImages.filter(img => img !== imageObservable)
  }

}
