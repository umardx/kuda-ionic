import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Account, Tps } from '../../models/firestore/firestore';

@IonicPage()
@Component({

  selector: 'page-account',
  templateUrl: 'account.html',

})
export class AccountPage {
	
  accounts: Account[];
  tps: Tps[];

  course: string[];
	email: string;

  loading: Loading;

  constructor(

    public fp: FirestoreProvider,
    public fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController

    ) {
    
    this.presentLoading();
    this.email = fire.auth.currentUser.email;

    this.fp.getAccounts(this.email).subscribe(result => {

      this.accounts = result;
      
    });

  }

  presentLoading() {

    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: "Please wait...",
      dismissOnPageChange: true
    });
    this.loading.present();

  }

  signOut() {
		this.fire.auth.signOut();
    this.presentLoading();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
