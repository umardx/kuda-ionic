import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { FeedPage } from '../pages/feed/feed';
import { LaporanPage } from '../pages/laporan/laporan';
import { UploadPage } from '../pages/upload/upload';
import { AccountPage } from '../pages/account/account';

import { FirestoreProvider } from '../providers/firestore/firestore';
import { UploadProvider } from '../providers/upload/upload';
import { firestore_env } from '../environments/firestore_env';
import { DocumentViewer} from '@ionic-native/document-viewer'
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    SigninPage,
    SignupPage,
    FeedPage,
    LaporanPage,
    UploadPage,
    AccountPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firestore_env.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    SigninPage,
    SignupPage,
    FeedPage,
    LaporanPage,
    UploadPage,
    AccountPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirestoreProvider,
    UploadProvider,
    DocumentViewer,
    FileTransfer,
    File
  ]
})
export class AppModule {}
