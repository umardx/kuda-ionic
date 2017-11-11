import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  accountsCollection: AngularFirestoreCollection<Account>;
  accounts: Observable<Account[]>;

  constructor(private fire: AngularFireAuth, private afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

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

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

  }
  SignUp() {

    this.presentLoading();
  
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

        this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
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
          this.alert(error.message);
        });
      }

    }

  }

}
