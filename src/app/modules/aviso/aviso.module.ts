import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisoRoutingModule } from './aviso-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { AvisoPage } from './pages/aviso/aviso.page';
import { AvisoItemComponent } from './components/aviso-item/aviso-item.component';
import { AvisoModalComponent } from './components/aviso-modal/aviso-modal.component';
import { NovoAvisoPage } from './pages/novo-aviso/novo-aviso.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AvisoPage,
    NovoAvisoPage,
  ],
  imports: [
    CommonModule,
    AvisoRoutingModule,
    SharedModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AvisoItemComponent,
    AvisoModalComponent,
  ]
})
export class AvisoModule { }
