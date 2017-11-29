import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Moduls, Tps } from '../../models/firestore/firestore';

import { InAppBrowser } from '@ionic-native/in-app-browser';

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
	loading: Loading;

	constructor(

		public fp: FirestoreProvider,
		public fire: AngularFireAuth,
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		private iab: InAppBrowser) {

		this.email = fire.auth.currentUser.email;
	}

	getCourseCode(email) {

		this.presentLoading();
		try {

			this.fp.getAccounts(email).subscribe(result => {

				this.resetTps();
				this.resetModuls();
				if (result.length>0) {
					
					this.updateCourseList(result[0].course);

				} else {

					console.log('Got nothing');
				}
				this.dismissLoadng();

			});

		} catch(err) {

			console.log('got err: ', err);
			this.dismissLoadng();
			
		}
		this.dismissLoadng();

	}

	resetTps() {

		this.tps = [];

	}

	resetModuls() {

		this.moduls = [];
	}

	updateCourseList(course) {

		this.course = course;
		this.course.forEach((val)=>{

			// Retrieve TPs
			this.fp.getTPs(val).subscribe(result => {

				result.forEach(tp => {

					this.pushTps(tp)

				});

			});

			// Retrieve Moduls
			this.fp.getModuls(val).subscribe(result => {

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
		setTimeout(() => {

		  refresher.complete();

		}, 100);
		
	}

	getItems() {

		console.log('getItem()');
	}

	presentLoading() {

		this.loading = this.loadingCtrl.create({

		  spinner: 'ios',
		  content: "Please wait...",
		  dismissOnPageChange: true,
		  duration: 5000

		});
		this.loading.present();

	}

	dismissLoadng() {

		if (this.loading) {

			this.loading.dismiss();
			this.loading = null;

		}

	}

	presentToast(message: string) {

	let toast = this.toastCtrl.create({

	  message: message,
	  duration: 2500,
	  showCloseButton: true,
	  position: 'top'

	});

	toast.onDidDismiss(() => {

	  console.log('Dismissed toast');

	});

	toast.present();
	}

	clickView(url) {
		
		console.log(url);
		this.iab.create(url,'_system');

	}

	ionViewDidLoad() {

		this.getCourseCode(this.email);
		console.log('ionViewDidLoad FeedPage');

	}

}
