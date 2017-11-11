import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Account, Moduls, Tps, Marks } from '../../models/firestore/firestore';

@Injectable()
export class FirestoreProvider {
  
	accountsCollection: AngularFirestoreCollection<Account>;
	accounts: Observable<Account[]>;

  constructor(

    public afs: AngularFirestore,
    public fire: AngularFireAuth) {

  }

  getAccounts(email) {

  	this.accountsCollection = this.afs.collection('accounts', ref => ref.where('email', '==', email)); // reference
    this.accounts = this.accountsCollection.valueChanges(); // Observable of data
  
  }

}
