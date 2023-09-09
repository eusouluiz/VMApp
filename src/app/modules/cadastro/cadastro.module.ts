import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { HubPage } from './pages/hub/hub.page';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [HubPage],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    SharedModule,
    IonicModule,
  ],
})
export class CadastroModule { }
