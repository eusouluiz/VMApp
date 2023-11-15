import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuArea } from '../../../shared/components/page-menu/page-menu.interface';
import { SessionRepository } from '../../state/session/session.repository';

@Injectable({
  providedIn: 'root',
})
export class PageMenuService {
  readonly displayStatus = new BehaviorSubject<boolean>(false);

  readonly currentTab = new BehaviorSubject<MenuArea>('mensagem');

  readonly tabNavigation = new Subject<MenuArea>();

  userIsFuncionario = new BehaviorSubject<boolean>(false);

  constructor(private sessionRepository: SessionRepository) {}

  navigateTab(newTab: MenuArea) {
    this.currentTab.next(newTab);
    this.tabNavigation.next(newTab);
  }

  updateDisplay(newTab: MenuArea) {
    this.currentTab.next(newTab);
    // this.userIsFuncionario = this.setTabStyle();
  }

  // setTabStyle() {
  //   if (this.sessionRepository.session()?.usuarioLogado.tipo === 'R') {
  //     return new BehaviorSubject<boolean>(false);
  //   }
  //   return new BehaviorSubject<boolean>(true);
  // }
}
