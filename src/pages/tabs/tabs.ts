import { Component } from '@angular/core';

import { FeedPage } from '../../pages/feed/feed';
import { LaporanPage } from '../../pages/laporan/laporan';
import { UploadPage } from '../../pages/upload/upload';
import { AccountPage } from '../../pages/account/account';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = LaporanPage;
  tab3Root = AccountPage;

  constructor() {

  }
}
