import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Account, Course } from '../../app/models/models';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {
	accountsCollection: AngularFirestoreCollection<Account>;
	accounts: Observable<Account[]>;

	coursesCollection: AngularFirestoreCollection<Course>;
	courses: Observable<Course[]>;

	constructor(public afs: AngularFirestore) {
		this.accounts = this.afs.collection('accounts').valueChanges() as Observable<Account[]>;
		this.courses = this.afs.collection('courses').valueChanges() as Observable<Course[]>;
	}

  getAccounts() {
    return this.accounts;
  }
}