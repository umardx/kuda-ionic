import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

	@ViewChild('email') email;
	@ViewChild('password') password;

  loading: Loading;

  constructor(
    public fire: AngularFireAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
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

  presentLoading() {

    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: "Please wait...",
      dismissOnPageChange: true
    });
    this.loading.present();

  }

  signIn() {

    this.presentLoading();
    this.fire.auth.signInWithEmailAndPassword(
      
      this.email.value,
      this.password.value

      )
    .then(data => {

      console.log('got data ', data);
      this.alert('Success! You \'re logged in!');

    })
    .catch(error => {

      console.log('got error ', error);
      this.loading.dismiss();
      this.alert(error.message);

    });

  }
  
}
