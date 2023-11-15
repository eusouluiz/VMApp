import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { TranslationsService } from './core/services/translations-service/translations.service';
import { BehaviorSubject } from 'rxjs';
import { MenuArea } from './shared/components/page-menu/page-menu.interface';
import { PageMenuService } from './core/services/page-menu/page-menu.service';
import { SessionRepository } from './core/state/session/session.repository';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  readonly currentTab: BehaviorSubject<MenuArea>;

  readonly showPageMenu: BehaviorSubject<boolean>;

  constructor(
    private translationsService: TranslationsService,
    private platform: Platform,
    private pageMenuService: PageMenuService,
    private sessionRepository: SessionRepository
  ) {
    this.initializeApp();

    this.showPageMenu = this.pageMenuService.displayStatus;
    this.currentTab = this.pageMenuService.currentTab;
  }

  async initializeApp() {
    await this.platform.ready();
    this.translationsService.init();

    // await this.localNotificationsService.init();
    // await this.pushNotificationsService.init();

    if (this.sessionRepository.isLoggedIn()) {
      // this.startUpService.loggedStart();
    }
  }

  onTabChange(newTab: MenuArea) {
    this.pageMenuService.navigateTab(newTab);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async setMobileStarterAssets() {}
}
