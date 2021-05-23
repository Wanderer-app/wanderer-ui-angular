import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileData, FileType } from '../common/data/file-data';
import { PinData } from '../common/data/pin-data';
import { AVAILABLE_PIN_TYPES, PinType } from '../common/data/pinType';
import { BaseFormComponent } from '../common/forms/base-form-component';
import { ExternalImageService } from '../services/external-images/external-image.service';
import { PinsService } from '../services/pins/pins.service';
import { NewPinInfo } from './new-pin-info';

@Component({
  selector: 'app-create-pin-form',
  templateUrl: './create-pin-form.component.html',
  styleUrls: ['./create-pin-form.component.css']
})
export class CreatePinFormComponent extends BaseFormComponent implements OnInit, OnDestroy {

  @Input() newPinInfo!: NewPinInfo
  @Output() close = new EventEmitter()
  @Output() pinCreated = new EventEmitter()

  img$!: Observable<string>
  newImage?: FileData

  closeIcon = faTimes
  changeImageIcon= faImages
  availablePinTypes: PinType[] = AVAILABLE_PIN_TYPES

  pinCreateSubscription?: Subscription
  creating = false
  errorText?: string


  constructor(public imgService: ExternalImageService, private formBuilder: FormBuilder, private pinService: PinsService) { 
    super(formBuilder.group({ 
      title: [''],
      text: [''],
     }))
  }
  ngOnDestroy(): void {
    this.pinCreateSubscription?.unsubscribe()
  }

  ngOnInit(): void {
  }

  fileSelected(event: Event) {
    let file = (event.target as HTMLInputElement).files![0]
    this.imgService.uploadImage(file).subscribe(id => {
      this.newImage = { externalId: id, fileType: FileType.IMAGE }
      this.img$ = this.imgService.getImageUrl({externalId: id, fileType: FileType.IMAGE})
    })
  }

  removeFile() {
    this.newImage = undefined
  }

  createPin() {
    this.creating = true
    this.errorText = undefined
    if (this.form.valid) {
      this.pinCreateSubscription = this.pinService.createPin(
        this.newPinInfo,
        this.form.controls.title.value,
        this.form.controls.text.value,
        this.newImage
      )
        .pipe(finalize(() => this.creating = false))
        .subscribe(
          result => this.pinCreated.emit(result),
          error => this.errorText = error
        )
    }
  }


}
