import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MensagemSelecaoCanalPage } from './pages/mensagem-selecao-canal/mensagem-selecao-canal.page';
import { MensagemSelecaoAlunoPage } from './pages/mensagem-selecao-aluno/mensagem-selecao-aluno.page';
import { MensagemCanalPage } from './pages/mensagem-canal/mensagem-canal.page';

const routes: Routes = [
  {path: '', component: MensagemSelecaoCanalPage},
  {path: 'selecao-aluno', component: MensagemSelecaoAlunoPage},
  {path: ':id/canal', component: MensagemCanalPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensagemRoutingModule { 
  static components = [
    MensagemSelecaoCanalPage,
    MensagemSelecaoAlunoPage,
    MensagemCanalPage,
  ]
}
