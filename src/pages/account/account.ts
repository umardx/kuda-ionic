import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Account } from '../../models/firestore/firestore';

@IonicPage()
@Component({

  selector: 'page-account',
  templateUrl: 'account.html',

})
export class AccountPage {
	
  email: string;
  accounts: Account[];

  loading: Loading;

  constructor(

    public fp: FirestoreProvider,
    public fire: AngularFireAuth,
    public loadingCtrl: LoadingController

    ) {
    
    this.email = fire.auth.currentUser.email;

  }

  updateAccounts(accounts) {

    this.accounts = accounts;

  }

  getAccounts(val) {

    this.presentLoading();
    try {

      this.fp.getAccounts(val).subscribe(result => {

        this.updateAccounts(result);

      });
      this.dismissLoadng();
      
    } catch(err) {

      console.log('Got nothing');
      this.dismissLoadng();

    }

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

  signOut() {

		this.fire.auth.signOut();
    this.presentLoading();

	}

  ionViewDidLoad() {

    this.getAccounts(this.email);
    console.log('ionViewDidLoad AccountPage');
    
  }

}
