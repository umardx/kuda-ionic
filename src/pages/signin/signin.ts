import { Component, ViewChild } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
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
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad SigninPage');
    
  }

  presentToast(message: string) {

    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500,
      showCloseButton: true,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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
      this.presentToast('Success! You \'re logged in!');

    })
    .catch(error => {

      console.log('got error ', error);
      this.loading.dismiss();
      this.presentToast(error.message);

    });

  }
  
}
