import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account, Course } from '../../models/firestore/firestore';
import { FirestoreProvider } from '../../providers/firestore/firestore';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

	email: string;
	course: string[];

	constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
		this.email = fire.auth.currentUser.email;
	}

	SignOut() {
		this.fire.auth.signOut();
  }

	ionViewDidLoad() {
		console.log('ionViewDidLoad FeedPage');
	}

}
