import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FileData } from 'src/app/common/data/file-data';

@Injectable({
  providedIn: 'root'
})
export class ExternalImageService {

  constructor() { }

  files: Map<string, string> = new Map([
    ["123456", "butterfly.jpg"],
    ["1234567", "avatar.jpg"]
  ])

  getImageUrl(fileData: FileData): Observable<string> {    
    console.log("aeeeeeeeeeeeee");
    
    let imageName = this.files.get(fileData.externalId)

    if(imageName) {
      return of("assets/img/" + imageName).pipe(delay(500))
    } else {
      return of("assers/img/no-image.jpg")
    }
  }

  uploadImage(file: File): Observable<string> {
    let ids = [...this.files.keys()]
    let newId: string = ((+ids[ids.length-1])+1).toString()
    this.files.set(newId, file.name)

    return of(newId)
  }
}
