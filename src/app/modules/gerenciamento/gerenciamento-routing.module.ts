import { GerenciamentoTurmaPage } from './pages/gerenciamento-turma/gerenciamento-turma.page';
import { GerenciamentoResponsavelPage } from './pages/gerenciamento-responsavel/gerenciamento-responsavel.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenciamentoPage } from './pages/gerenciamento/gerenciamento.page';
import { GerenciamentoAlunoPage } from './pages/gerenciamento-aluno/gerenciamento-aluno.page';
import { GerenciamentoFuncionarioPage } from './pages/gerenciamento-funcionario/gerenciamento-funcionario.page';
import { GerenciamentoCargoPage } from './pages/gerenciamento-cargo/gerenciamento-cargo.page';
import { GerenciamentoResponsavelDetalhesPage } from './pages/gerenciamento-responsavel-detalhes/gerenciamento-responsavel-detalhes.page';

const routes: Routes = [
  {path: '', component: GerenciamentoPage},
  {path: 'responsavel', component: GerenciamentoResponsavelPage},
  {path: 'aluno', component: GerenciamentoAlunoPage},
  {path: 'turma', component: GerenciamentoTurmaPage},
  {path: 'funcionario', component: GerenciamentoFuncionarioPage},
  {path: 'cargo', component: GerenciamentoCargoPage},
  {path: 'responsavel/:id/detalhes', component: GerenciamentoResponsavelDetalhesPage},
  {path: 'responsavel/cadastro', component: GerenciamentoResponsavelDetalhesPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoRoutingModule { 
  static components = [
    GerenciamentoPage, 
    GerenciamentoResponsavelPage, GerenciamentoResponsavelDetalhesPage,
    GerenciamentoAlunoPage, GerenciamentoTurmaPage,
    GerenciamentoFuncionarioPage, GerenciamentoCargoPage,
  ]
}
