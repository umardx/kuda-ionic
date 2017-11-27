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

			this.updateCourse(result[0].course);

		});

		this.tps = []
	}

	updateCourse(course) {
		this.course = course;

		this.course.forEach((c)=>{

			this.fp.getTPs(c).subscribe(result => {

				result.forEach((tp)=>this.pushTP(tp));

			});

		});
	}

	pushTP(tp){
		this.tps.push(tp)
	}

	doRefresh(refresher) {

		setTimeout(() => {

		  refresher.complete();

		}, 1000);
		
	}

	ionViewDidLoad() {

		console.log('ionViewDidLoad FeedPage');

	}

}
