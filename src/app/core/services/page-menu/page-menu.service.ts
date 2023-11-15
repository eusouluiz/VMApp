import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuArea } from '../../../shared/components/page-menu/page-menu.interface';

@Injectable({
  providedIn: 'root',
})
export class PageMenuService {
  readonly displayStatus = new BehaviorSubject<boolean>(false);

  readonly currentTab = new BehaviorSubject<MenuArea>('mensagem');

  readonly tabNavigation = new Subject<MenuArea>();

  navigateTab(newTab: MenuArea) {
    this.currentTab.next(newTab);
    this.tabNavigation.next(newTab);
  }

  updateDisplay(newTab: MenuArea) {
    this.currentTab.next(newTab);
  }
}
