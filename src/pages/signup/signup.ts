import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	@ViewChild('username') username;
	@ViewChild('email') email;
	@ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  SignUp() {
  	//console.log(this.username.value, this.password.value)
  	if (this.username.value == "admin" && this.password.value == "admin") {
  		let alert = this.alertCtrl.create({
	    title: 'Sign Up Successful!',
	    buttons: ['OK']
    });
    alert.present();
  	}
  }

}
