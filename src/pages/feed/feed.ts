import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Moduls, Tps } from '../../models/firestore/firestore';

@IonicPage()
@Component({

  selector: 'page-feed',
  templateUrl: 'feed.html',

})
export class FeedPage {

	moduls: Moduls[];
	tps: Tps[];

	course: string[];
	email: string;

	constructor(

		public fp: FirestoreProvider,
		public fire: AngularFireAuth,
		public navCtrl: NavController,
		public navParams: NavParams) {

		this.email = fire.auth.currentUser.email;
		this.fp.getAccounts(this.email).subscribe(result => {

		this.course = result[0].course;
		console.log('result: ', this.course);
		});
	}

	doRefresh(refresher) {

		console.log('Begin async operation', refresher);

		setTimeout(() => {
		  console.log('Async operation has ended');
		  refresher.complete();
		}, 1000);
		
	}

	getItems(ev: any) {
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FeedPage');
	}

}
