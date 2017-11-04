import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Account, Course } from '../../app/models/models';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {
	accountsCollection: AngularFirestoreCollection<Account>;
	accounts: Observable<Account[]>;

	coursesCollection: AngularFirestoreCollection<Course>;
	courses: Observable<Course[]>;

  constructor(public http: Http, public afs: AngularFirestore) {
    console.log('Hello FirestoreProvider Provider');

	this.accountsCollection = this.afs.collection('accounts'); // reference
	this.accounts = this.accountsCollection.valueChanges(); // Observable of data

	this.coursesCollection = this.afs.collection('courses');
	this.courses = this.coursesCollection.valueChanges();
	console.log('Hello AccountProvider Provider');
  }

  getData() {
  		return this.accounts;
  	}

}
