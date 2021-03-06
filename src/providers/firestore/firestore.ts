import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Account, Tps, Moduls, Laporans } from '../../models/firestore/firestore';

@Injectable()
export class FirestoreProvider {
  
	accountsCollection: AngularFirestoreCollection<Account>;
	accounts: Observable<Account[]>;

  tpsCollection: AngularFirestoreCollection<Tps>;
  tps: Observable<Tps[]>;

  modulsCollection: AngularFirestoreCollection<Moduls>;
  moduls: Observable<Moduls[]>;

  uploadsCollection: AngularFirestoreCollection<Laporans>;
  uploads: Observable<Laporans[]>;

  constructor(

    public afs: AngularFirestore,
    public fire: AngularFireAuth) {

  }

  getAccounts(val: string) {

  	this.accountsCollection = this.afs.collection('accounts', ref => ref.where('email', '==', val));
    this.accounts = this.accountsCollection.valueChanges();
    return this.accounts;
  
  }

  getTPs(val: string) {

    this.tpsCollection = this.afs.collection('tps', ref => ref.where('code', '==', val));
    this.tps = this.tpsCollection.valueChanges();
    return this.tps;

  }

   getModuls(val: string) {

    this.modulsCollection = this.afs.collection('moduls', ref => ref.where('code', '==', val));
    this.moduls = this.modulsCollection.valueChanges();
    return this.moduls;

  }

  getUploads(val: number) {

    this.uploadsCollection = this.afs.collection('laporans', ref => ref.where('nim', '==', val));
    this.uploads = this.uploadsCollection.valueChanges();
    return this.uploads;

  }

}
