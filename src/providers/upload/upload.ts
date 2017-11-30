import { Injectable } from '@angular/core';
import { Uploads } from '../../models/upload/upload'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

/*
  Generated class for the UploadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UploadProvider {

	constructor(
		public afs: AngularFirestore
		) {
	}

  pushUpload(upload: Uploads, code: string, index: number, nim: number, title: string) {

    let basePath = "laporans";
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${basePath}/${code}/${nim}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100 // CHANGEMENT IS HERE
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload, code, index, nim, title)
      }
    );

  }
  // Writes the file details to the realtime db
  private saveFileData(upload: Uploads, code: string, index: number, nim: number, title: string) {

    upload.createAt = new Date();
    this.afs.collection('laporans').add({

      'code': code,
      'createdAt': upload.createAt,
      'file': upload.url,
      'index': index,
      'key': upload.key,
      'mark': 0,
      'nim': nim,
      'title': title

      });    
    }

}