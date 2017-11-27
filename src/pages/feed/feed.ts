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

		this.tps = [];
		this.email = fire.auth.currentUser.email;
	}

	getCourseCode(email) {

		this.fp.getAccounts(email).subscribe(result => {

			this.updateCourse(result[0].course);

		});
	}

	updateCourse(course) {

		this.course = course;
		this.course.forEach((val)=>{

			this.fp.getTPs(val).subscribe(result => {

				result.forEach(tp => {

					this.pushTps(tp)

				});

			});

		});
	}

	pushTps(tp) {

		this.tps.push(tp);

	}

	doRefresh(refresher) {

		this.getCourseCode(this.email);
		console.log('tps:', this.tps);
		setTimeout(() => {

		  refresher.complete();

		}, 1000);
		
	}

	ionViewDidLoad() {

		this.getCourseCode(this.email);
		console.log('ionViewDidLoad FeedPage');

	}

}
