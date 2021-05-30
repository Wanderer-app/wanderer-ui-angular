import { Injectable } from '@angular/core';
import { concat, merge, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FileData } from 'src/app/common/data/file-data';

@Injectable({
  providedIn: 'root'
})
export class ExternalImageService {

  constructor() { }

  IMAGE_LOCATION = "assets/img/"

  files: Map<string, string> = new Map([
    ["123456", "butterfly.jpg"],
    ["1234567", "birds.jpg"],
    ["1234568", "moon.jpg"],
    ["1234569", "girl.webp"]
  ])

  getImageUrl(fileData: FileData): Observable<string> {        
    let imageName = this.files.get(fileData.externalId)

    if(imageName) {
      return of(this.IMAGE_LOCATION + imageName).pipe(delay(500))
    } else {
      return of(this.IMAGE_LOCATION + "no-image.jpg")
    }
  }

  getImageUrls(files: FileData[]): Observable<string>[] {
    return files.map(file => this.getImageUrl(file))
  }

  uploadImage(file: File): Observable<UploadedImageData> {
    let ids = [...this.files.keys()]
    let newId: string = ((+ids[ids.length-1])+1).toString()
    this.files.set(newId, file.name)

    return of({id: newId, url: this.IMAGE_LOCATION + file.name})
  }

  uploadMultipleImages(files: File[]): Observable<UploadedImageData>[] {
    return files.map(file => this.uploadImage(file))
  }
}

export interface UploadedImageData {
  id: string,
  url: string
}
