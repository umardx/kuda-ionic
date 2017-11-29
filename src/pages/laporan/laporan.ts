import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Uploads } from '../../models/firestore/firestore';
import { UploadPage } from '../../pages/upload/upload';

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
		public navParams: NavParams) {

		this.email = fire.auth.currentUser.email;
	}

	getUploads(email) {

		this.presentLoading();
		try {
			this.fp.getAccounts(email).subscribe(result => {

				if (result.length>0) {

					let nim = +result[0].nim;
					this.fp.getUploads(nim).subscribe(result => {

						console.log('result2:', result);
						this.updateUploads(result);

					})

				}

			});
			this.dismissLoadng();

		} catch(err) {
			
			console.log('got err: ', err);
			this.dismissLoadng();
		}

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

		this.navCtrl.push(UploadPage);

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

	ionViewDidLoad() {

		this.getUploads(this.email);
		console.log('ionViewDidLoad LaporanPage');

	}

}
