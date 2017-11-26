import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModulPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modul',
  templateUrl: 'modul.html',
})
export class ModulPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

	doRefresh(refresher) {

		console.log('Begin async operation', refresher);

		setTimeout(() => {
		  console.log('Async operation has ended');
		  refresher.complete();
		}, 1000);
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad ModulPage');
	}

}
