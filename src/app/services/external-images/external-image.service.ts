import { Injectable } from '@angular/core';
import { concat, from, merge, Observable, of } from 'rxjs';
import { delay, finalize, map, switchMap } from 'rxjs/operators';
import { FileData } from 'src/app/common/data/file-data';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ExternalImageService {

  constructor(private storage: AngularFireStorage) { }

  getImageUrl(fileData: FileData): Observable<string> {        
    return this.storage.ref(fileData.externalId).getDownloadURL()
  }

  getImageUrls(files: FileData[]): Observable<string>[] {
    return files.map(file => this.getImageUrl(file))
  }

  uploadImage(file: File): Observable<UploadedImageData> {

    const fileId = `user-images/${Date.now()}-${file.name}`
    const fileRef = this.storage.ref(fileId)

    return from(this.storage.upload(fileId, file))
      .pipe(switchMap(() => fileRef.getDownloadURL()))
      .pipe(map(url => ({ id: fileId, url: url as string })))
  }

  uploadMultipleImages(files: File[]): Observable<UploadedImageData>[] {
    return files.map(file => this.uploadImage(file))
  }
}

export interface UploadedImageData {
  id: string,
  url: string
}
