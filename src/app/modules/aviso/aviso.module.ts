import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisoRoutingModule } from './aviso-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { AvisoPage } from './pages/aviso/aviso.page';
import { AvisoItemComponent } from './components/aviso-item/aviso-item.component';
import { AvisoModalComponent } from './components/aviso-modal/aviso-modal.component';
import { NovoAvisoComponent } from './components/novo-aviso/novo-aviso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AvisoPage,
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
    NovoAvisoComponent,
    
  ]
})
export class AvisoModule { }
