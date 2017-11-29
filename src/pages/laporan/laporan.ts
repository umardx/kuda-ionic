import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController, Platform } from 'ionic-angular';
import { UploadPage } from '../../pages/upload/upload';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Uploads } from '../../models/firestore/firestore';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-laporan',
  templateUrl: 'laporan.html',
})
export class LaporanPage {

	uploads: Uploads[];
	nim: number;
	email: string;
	loading: Loading;

	constructor(
		public fp: FirestoreProvider,
		public fire: AngularFireAuth,
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		private iab: InAppBrowser,
		private pl: Platform) {

		this.email = fire.auth.currentUser.email;
	}

	getUploads(email) {

		this.presentLoading();
		try {
			this.fp.getAccounts(email).subscribe(result => {

				if (result.length>0) {

					let nim = +result[0].nim;
					this.fp.getUploads(nim).subscribe(result => {

						this.updateUploads(result);

					})

				}

			});
			this.dismissLoadng();

		} catch(err) {
			
			console.log('got err: ', err);
			this.dismissLoadng();
		}
		this.dismissLoadng();

	}


	updateUploads(upload) {

		this.uploads = upload;

	}
	doRefresh(refresher) {

		this.getUploads(this.email);
		setTimeout(() => {

		  refresher.complete();

		}, 100);
		
	}

	openUploadnPage() {

		this.navCtrl.push(UploadPage, {

			data: this.uploads

		});

	}

	getItems() {

		console.log('getItems()');
	}

	presentLoading() {

		this.loading = this.loadingCtrl.create({

		  spinner: 'ios',
		  content: "Please wait...",
		  dismissOnPageChange: true

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

		this.getUploads(this.email);
		console.log('ionViewDidLoad LaporanPage');

	}

}
