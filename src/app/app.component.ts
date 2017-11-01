import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Account, Course } from './models/models';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../pages/home/home';
import { LoggedinPage } from '../pages/loggedin/loggedin';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private fire: AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.fire.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = HomePage;
      else
        this.rootPage = LoggedinPage;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

