import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faPaperclip, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseFormComponent } from '../common/forms/base-form-component';
import { PostService } from '../services/discussion/post.service';
import { ExternalImageService, UploadedImageData } from '../services/external-images/external-image.service';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.css']
})
export class CreatePostFormComponent extends BaseFormComponent implements OnInit {

  @Output() postCreated = new EventEmitter()

  clipIcon = faPaperclip
  roundTimesIcon = faTimes
  uploadedImages: Observable<UploadedImageData>[] = []
  uploadedImageIds: Set<string> = new Set()

  constructor(private formBuilder: FormBuilder, private postService: PostService, private imgService: ExternalImageService) {
    super(formBuilder.group({
      text: ['']
    }))
   }

  ngOnInit(): void {
  }

  createPost() {

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
