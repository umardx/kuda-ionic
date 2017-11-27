import { Component, ViewChild } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Account } from '../../models/firestore/firestore';

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

  @ViewChild('nim') nim;
	@ViewChild('email') email;
	@ViewChild('password') password;
  @ViewChild('retype_password') retype_password;

  loading: Loading;

  accountsCollection: AngularFirestoreCollection<Account>;
  accounts: Observable<Account[]>;

  constructor(
    public fire: AngularFireAuth,
    public afs: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
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

  SignUp() {
  
    if(this.nim.value < 18100000 || this.nim.value > 18199999) {

      this.presentToast('Correct your NIM!');
      return;

    } else {

      if(this.password.value !== this.retype_password.value) {

      this.presentToast('Your re-entered password doesn\'t match.');
      return;

      } else {

        this.presentLoading();
        this.fire.auth.createUserWithEmailAndPassword(

          this.email.value,
          this.password.value
          
          )
        .then(data => {

          this.afs.collection('accounts').add({

            'nim': this.nim.value,
            'email': this.email.value,
            'course': [""]

          });
          console.log('got data ', data);
          this.presentToast('Account was added successfully!');
          this.fire.auth.signOut();
          this.loading.dismiss();
          this.navCtrl.remove(1);

        })
        .catch(error => {

          console.log('got an error ', error);
          this.loading.dismiss();
          this.presentToast(error.message);

        });

      }

    }

  }

}
