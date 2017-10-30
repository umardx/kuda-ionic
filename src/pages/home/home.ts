import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openSignInPage() {
  	this.navCtrl.push(SigninPage);
  }

  openSignUpPage() {
  	this.navCtrl.push(SignupPage);

  }

}
