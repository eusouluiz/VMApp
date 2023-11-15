import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsPage } from './pages/tabs/tabs.page';

@NgModule({
  declarations: [TabsPage],
  imports: [CommonModule, IonicModule, SharedModule, TabsRoutingModule],
})
export class TabsModule {}
