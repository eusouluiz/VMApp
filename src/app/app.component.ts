import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';

import { TranslationsService } from './core/services/translations-service/translations.service';
import { BehaviorSubject } from 'rxjs';
import { SplashScreen } from '@capacitor/splash-screen';
import { MenuArea } from './shared/components/page-menu/page-menu.interface';
import { PageMenuService } from './core/services/page-menu/page-menu.service';
import { SessionRepository } from './core/state/session/session.repository';
import { LocalNotificationsService } from './core/services/local-notifications/local-notifications.service';
import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentTab: BehaviorSubject<MenuArea> | undefined;

  showPageMenu: BehaviorSubject<boolean> | undefined;

  userIsFuncionario = new BehaviorSubject<boolean>(false);

  constructor(
    private translationsService: TranslationsService,
    private platform: Platform,
    private pageMenuService: PageMenuService,
    private sessionRepository: SessionRepository,
    private localNotificationsService: LocalNotificationsService,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready().then(() => {
      SplashScreen.hide();

      this.translationsService.init();

      console.info('Inicializando notificações locais');

      this.localNotificationsService.init();

      this.localNotificationsService.criarNotificacoes();

      console.info('Notificações locais inicializadas');

      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          CapacitorApp.exitApp();
        } else {
          window.history.back();
        }
      });

      this.sessionRepository.userInfo$.subscribe((tipoUsuario) => {
        if (tipoUsuario?.tipo === 'R') {
          this.userIsFuncionario = new BehaviorSubject<boolean>(false);
        } else {
          this.userIsFuncionario = new BehaviorSubject<boolean>(true);
        }
      });
      this.showPageMenu = this.pageMenuService.displayStatus;
      this.currentTab = this.pageMenuService.currentTab;
    });
  }

  onTabChange(newTab: MenuArea) {
    this.pageMenuService.navigateTab(newTab);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async setMobileStarterAssets() {}
}
