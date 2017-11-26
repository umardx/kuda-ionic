import { Component } from '@angular/core';
import { UploadPage } from '../../pages/upload/upload';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LaporanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-laporan',
  templateUrl: 'laporan.html',
})
export class LaporanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

	doRefresh(refresher) {

		console.log('Begin async operation', refresher);

		setTimeout(() => {
		  console.log('Async operation has ended');
		  refresher.complete();
		}, 1000);
	}

	openUploadnPage() {

		this.navCtrl.push(UploadPage);

	}
	
	ionViewDidLoad() {
	console.log('ionViewDidLoad LaporanPage');
	}

}
