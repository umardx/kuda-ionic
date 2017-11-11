import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
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

  SignUp() {
  
    if(this.nim.value < 18100000 || this.nim.value > 18199999) {

      let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'Correct your NIM!',
          buttons: ['OK']
      });
      alert.present();
      return;

    } else {

      if(this.password.value !== this.retype_password.value) {

      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Your password and your re-entered password doesn\'t.',
        buttons: ['OK']

      });
      alert.present();
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
            'courses': null

          });
          console.log('got data ', data);
          this.alert('Registered!');

        })
        .catch(error => {

          console.log('got an error ', error);
          this.loading.dismiss();
          this.alert(error.message);

        });

      }

    }

  }

}
