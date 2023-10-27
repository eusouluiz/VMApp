import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisoRoutingModule } from './aviso-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { AvisoPage } from './pages/aviso/aviso.page';
import { AvisoItemComponent } from './components/aviso-item/aviso-item.component';


@NgModule({
  declarations: [
    AvisoPage,
  ],
  imports: [
    CommonModule,
    AvisoRoutingModule,
    SharedModule,
    IonicModule,
    AvisoItemComponent,
  ]
})
export class AvisoModule { }
