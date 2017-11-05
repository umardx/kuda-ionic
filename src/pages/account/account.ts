import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Account, Course } from '../../models/firestore/firestore';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * and https://www.youtube.com/watch?v=0Nah3foeyCM
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
	
	email: string;
	course: string[];

  accountsCollection: AngularFirestoreCollection<Account>;
  accounts: Observable<Account[]>;

  coursesCollection: AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;

  constructor(private fire: AngularFireAuth, private afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
    
    this.email = fire.auth.currentUser.email;

    this.accountsCollection = this.afs.collection('accounts', ref => ref.where('email', '==', this.email)); // reference
    this.accounts = this.accountsCollection.valueChanges(); // Observable of data account

    this.coursesCollection = this.afs.collection('courses'); // reference
    this.courses = this.coursesCollection.valueChanges(); // Observable of data course
  }

  SignOut() {
		this.fire.auth.signOut();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
