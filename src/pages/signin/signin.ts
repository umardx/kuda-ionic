import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoggedinPage } from '../loggedin/loggedin';

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

  @ViewChild('nim') nim;
	@ViewChild('email') email;
	@ViewChild('password') password;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  
  SignIn() {
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log('got data ', data);
      this.alert('Success! You \'re logged in!');
      this.navCtrl.setRoot(LoggedinPage);
    })
    .catch(error => {
      console.log('got error ', error);
      this.alert(error.message);
    });
  }
  
}
