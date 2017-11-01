import { Component, ViewChild } from '@angular/core';

import { FeedPage } from '../../pages/feed/feed';
import { ModulPage } from '../../pages/modul/modul';
import { UploadPage } from '../../pages/upload/upload';
import { AccountPage } from '../../pages/account/account';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = ModulPage;
  tab3Root = UploadPage;
  tab4Root = AccountPage;

  constructor() {

  }
}
