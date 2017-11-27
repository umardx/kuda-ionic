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
	}

	getCourseCode(email) {

		this.fp.getAccounts(email).subscribe(result => {

			this.resetTps();
			this.resetModuls();
			this.updateTps(result[0].course);

		});
	}

	resetTps() {

		this.tps = [];

	}

	resetModuls() {

		this.moduls = [];
	}

	updateTps(course) {

		this.course = course;
		this.course.forEach((val)=>{

			// Retrieve TPs
			this.fp.getTPs(val).subscribe(result => {

				result.forEach(tp => {

					this.pushTps(tp)

				});

			});

			// Retrieve Moduls
			this.fp.getTPs(val).subscribe(result => {

				result.forEach(modul => {

					this.pushModuls(modul)

				});

			});

		});
	}

	pushTps(tp) {

		this.tps.push(tp);

	}

	pushModuls(modul) {

		this.moduls.push(modul);
	}

	doRefresh(refresher) {

		this.getCourseCode(this.email);
		console.log('tps:', this.tps);
		setTimeout(() => {

		  refresher.complete();

		}, 1000);
		
	}

	getItems() {

		console.log('getItem()');
	}

	ionViewDidLoad() {

		this.getCourseCode(this.email);
		console.log('ionViewDidLoad FeedPage');

	}

}
