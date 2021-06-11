import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { RatingComponentSize } from '../rating/rating-size';
import { PinData } from '../common/data/pin-data';
import { PinsService } from '../services/pins/pins.service';
import { UserContentType } from '../common/data/user-content-type';
import { ContentControlMenuPlacement } from '../content-control-menu/menu-placement';
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UpdatePinData } from './update-pin-details/update-pin-data';
import { FormBuilder } from '@angular/forms';
import { ExternalImageService } from '../services/external-images/external-image.service';
import { FileData, FileType } from '../common/data/file-data';
import { Observable } from 'rxjs';
import { pinTypeIcons, pinTypeTranslations } from '../common/data/pinType';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pins-detail',
  templateUrl: './pins-detail.component.html',
  styleUrls: ['./pins-detail.component.css']
})
export class PinsDetailComponent implements OnInit {

  @Input() pin!: PinData
  @Output() closeDetailsEvent = new EventEmitter();

  ratingSize = RatingComponentSize.MEDIUM
  pinContentType = UserContentType.PIN
  controlMenuPlacement = ContentControlMenuPlacement.LEFT_TOP

  editMode: boolean = false

  img$?: Observable<string>
  lastLoadedImg?: FileData

  pinTypeTexts = pinTypeTranslations

  closeIcon = faTimes

  pinIcons = pinTypeIcons

  constructor(public pinsService: PinsService, private formBuilder: FormBuilder, public imgService: ExternalImageService) {
  }


  ngOnInit(): void {
    console.log("init");
    if(this.pin.attachedFile) {
      this.img$ = this.imgService.getImageUrl(this.pin.attachedFile)
      this.lastLoadedImg = this.pin.attachedFile
    }
  }

  close() {
    this.closeDetailsEvent.emit();
  }

  enterEditMode() {
    this.editMode = true
    console.log(`Entered edit mode for pin ${this.pin.id}`);
  }

  exitEditMode() {
    this.editMode = false
    if(this.pin.attachedFile) {
      this.img$ = this.imgService.getImageUrl(this.pin.attachedFile)
    }
    console.log(`Exiting edit mode for pin ${this.pin.id}`);
  }

  getImage(): Observable<string> | undefined {
    if(this.pin.attachedFile) {

      if(this.lastLoadedImg !== this.pin.attachedFile) {
        this.img$ = this.imgService.getImageUrl(this.pin.attachedFile)
        this.lastLoadedImg = this.pin.attachedFile
      }
      return this.img$
    } else {
      return undefined
    }
  }


}
