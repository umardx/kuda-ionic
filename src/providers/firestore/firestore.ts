import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Account, Tps, Uploads } from '../../models/firestore/firestore';

@Injectable()
export class FirestoreProvider {
  
	accountsCollection: AngularFirestoreCollection<Account>;
	accounts: Observable<Account[]>;

  tpsCollection: AngularFirestoreCollection<Tps>;
  tps: Observable<Tps[]>;

  uploadsCollection: AngularFirestoreCollection<Uploads>;
  uploads: Observable<Uploads[]>;

  jancokCollection: AngularFirestoreCollection<Account>;
  jancoks: Observable<Account[]>;

  constructor(

    public afs: AngularFirestore,
    public fire: AngularFireAuth) {

  }

  getJancoks(val: string) {

    this.jancokCollection = this.afs.collection<Account>('accounts', ref => ref.where('email', '==', val));
    this.jancoks = this.jancokCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Account;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    return this.jancoks;

  }

  getAccounts(val: string) {

  	this.accountsCollection = this.afs.collection('accounts', ref => ref.where('email', '==', val)); // reference
    this.accounts = this.accountsCollection.valueChanges(); // Observable of data
    return this.accounts;
  
  }

  getTPs(val: string) {

    this.tpsCollection = this.afs.collection('tps', ref => ref.where('code', '==', val));
    this.tps = this.tpsCollection.valueChanges();
    return this.tps;

  }

  getUploads(val: string) {

    this.uploadsCollection = this.afs.collection('uploads', ref => ref.where('code', '==', val));
    this.uploads = this.uploadsCollection.valueChanges();
    return this.tps;

  }

}
