import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

	@ViewChild('username') username;
	@ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  SignIn() {
  	//console.log(this.username.value, this.password.value)
  	if (this.username.value == "admin" && this.password.value == "admin") {
  		let alert = this.alertCtrl.create({
	    title: 'Login Successful!',
	    subTitle: 'You are logged in',
	    buttons: ['OK']
    });
    alert.present();
  	}
  }

}
