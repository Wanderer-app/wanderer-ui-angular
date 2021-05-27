import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { error } from 'selenium-webdriver';
import { FileData, FileType } from 'src/app/common/data/file-data';
import { PinData } from 'src/app/common/data/pin-data';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { ExternalImageService } from 'src/app/services/external-images/external-image.service';
import { PinsService } from 'src/app/services/pins/pins.service';
import { UpdatePinData } from './update-pin-data';

@Component({
  selector: 'app-update-pin-details',
  templateUrl: './update-pin-details.component.html',
  styleUrls: ['./update-pin-details.component.css']
})
export class UpdatePinDetailsComponent implements OnInit {

  @Input() pin!: PinData
  @Output() exitedEditMode = new EventEmitter()

  updatePinForm = this.formBuilder.group({
    newTitle: [''],
    newText: [''],
  })

  img$!: Observable<string>

  newFile?: FileData

  closeIcon = faTimes
  changeImageIcon= faImages

  updateErrorText?: string
  updateInProgress = false

  constructor(private formBuilder: FormBuilder, public imgService: ExternalImageService, private pinService: PinsService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    if(this.pin.attachedFile) {
      this.img$ = this.imgService.getImageUrl(this.pin.attachedFile)
    }
    this.newFile = this.pin.attachedFile
  }

  exitEditMode() {
    console.log(`Exiting edit mode for pin ${this.pin.id}`);
    this.exitedEditMode.emit()
  }

  updatePin() {
    this.updateErrorText = undefined
    this.updateInProgress = true

    let updatePinData: UpdatePinData = {
      pinId: this.pin.id,
      newTitle: this.updatePinForm.controls.newTitle.value,
      newText: this.updatePinForm.controls.newText.value,
      newFile: this.newFile
    }

    this.pinService.update(updatePinData)
    .pipe(finalize(() => this.updateInProgress = false))
    .subscribe(data => {
      this.pin.title = updatePinData.newTitle
      this.pin.text = updatePinData.newText
      this.pin.attachedFile = updatePinData.newFile
      this.exitEditMode()
      this.notificationService.showStandardSuccess("პინი წარმატებით დარედაქტირდა!")
    },
      error => this.updateErrorText = error
    )
  }

  fileSelected(event: Event) {
    let file = (event.target as HTMLInputElement).files![0]
    this.imgService.uploadImage(file).subscribe(image => {
      this.newFile = { externalId: image.id, fileType: FileType.IMAGE }
      this.img$ = of(image.url)
    })
  }

  canUpdate(): boolean {    
    return this.updatePinForm.controls.newTitle.value !== this.pin.title
      || this.updatePinForm.controls.newText.value !== this.pin.text
      || this.newFile !== this.pin.attachedFile
  }

  removeFile() {
    console.log("removing file");    
    this.newFile = undefined
  }


}
