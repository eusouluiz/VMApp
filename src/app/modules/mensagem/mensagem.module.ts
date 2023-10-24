import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensagemRoutingModule } from './mensagem-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { MensagemSelecaoCanalPage } from './pages/mensagem-selecao-canal/mensagem-selecao-canal.page';
import { MensagemSelecaoAlunoPage } from './pages/mensagem-selecao-aluno/mensagem-selecao-aluno.page';
import { MensagemCanalPage } from './pages/mensagem-canal/mensagem-canal.page';


@NgModule({
  declarations: [
    MensagemSelecaoCanalPage,
    MensagemSelecaoAlunoPage,
    MensagemCanalPage,
  ],
  imports: [
    CommonModule,
    MensagemRoutingModule,
    SharedModule,
    IonicModule,
  ]
})
export class MensagemModule { }
