import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Accounts, Courses } from '../../app/models/models';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {
	accountCollection: AngularFirestoreCollection<Accounts>;
	courseCollection: AngularFirestoreCollection<Courses>;

	constructor(public afs: AngularFirestore) {

	}
}