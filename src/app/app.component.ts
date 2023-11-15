import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { TranslationsService } from './core/services/translations-service/translations.service';
import { SessionRepository } from './core/state/session/session.repository';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translationsService: TranslationsService,
    private platform: Platform,
    private sessionRepository: SessionRepository
  ) {
    this.initializeApp();
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async setMobileStarterAssets() {}
}
