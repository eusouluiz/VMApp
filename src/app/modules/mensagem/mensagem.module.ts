import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensagemRoutingModule } from './mensagem-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { HubPage } from './pages/hub/hub.page';


@NgModule({
  declarations: [HubPage],
  imports: [
    CommonModule,
    MensagemRoutingModule,
    SharedModule,
    IonicModule,
  ]
})
export class MensagemModule { }
