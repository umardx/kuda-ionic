import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

	doRefresh(refresher) {

		setTimeout(() => {

		  refresher.complete();
		  
		}, 500);
	}

	openUploadnPage() {

		this.navCtrl.push(UploadPage);

	}

	getItems() {

		console.log('getItems()');
	}
	
	ionViewDidLoad() {

	console.log('ionViewDidLoad LaporanPage');
	
	}


	//anu

}
