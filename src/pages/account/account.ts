import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';

@IonicPage()
@Component({

  selector: 'page-account',
  templateUrl: 'account.html',

})
export class AccountPage {
	
	email: string;

  constructor(

    public fp: FirestoreProvider,
    public fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams

    ) {
    
    this.email = fire.auth.currentUser.email;
    this.fp.getAccounts(this.email);

  }

  SignOut() {
		this.fire.auth.signOut();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
