import { Component, OnDestroy, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { MenuArea } from '../../../../shared/components/page-menu/page-menu.interface';
import { Subscription } from 'rxjs';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnDestroy {
  @ViewChild('ionTabs') tabsRef: IonTabs | undefined = undefined;

  readonly currentArea: Subscription;

  constructor(private pageMenuService: PageMenuService) {
    this.currentArea = this.pageMenuService.tabNavigation.subscribe((newTab: MenuArea) => {
      this.tabsRef?.select(newTab);
    });
  }

  handleTabsChange(ev: any) {
    this.pageMenuService.updateDisplay(ev?.tab);
  }

  ngOnDestroy() {
    this.currentArea?.unsubscribe();
  }
}
