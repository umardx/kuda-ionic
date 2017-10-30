import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { LoggedinPage } from '../pages/loggedin/loggedin';


// Ref: https://www.youtube.com/watch?v=qKajGwYe4TI&index=11&list=PLYxzS__5yYQng-XnJhB21Jc7NW1OIaqct
const firebaseAuth = {
  apiKey: "AIzaSyBjCiiVurxPITeLpl3mElnxm426YuPhtWw",
  authDomain: "kuda-24.firebaseapp.com",
  databaseURL: "https://kuda-24.firebaseio.com",
  projectId: "kuda-24",
  storageBucket: "kuda-24.appspot.com",
  messagingSenderId: "253973356505"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    LoggedinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    LoggedinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
