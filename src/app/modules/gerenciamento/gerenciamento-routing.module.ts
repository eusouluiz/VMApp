import { GerenciamentoTurmaPage } from './pages/gerenciamento-turma/gerenciamento-turma.page';
import { GerenciamentoResponsavelPage } from './pages/gerenciamento-responsavel/gerenciamento-responsavel.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenciamentoPage } from './pages/gerenciamento/gerenciamento.page';
import { GerenciamentoAlunoPage } from './pages/gerenciamento-aluno/gerenciamento-aluno.page';
import { GerenciamentoFuncionarioPage } from './pages/gerenciamento-funcionario/gerenciamento-funcionario.page';
import { GerenciamentoCargoPage } from './pages/gerenciamento-cargo/gerenciamento-cargo.page';
import { GerenciamentoResponsavelDetalhesPage } from './pages/gerenciamento-responsavel-detalhes/gerenciamento-responsavel-detalhes.page';
import { GerenciamentoAlunoDetalhesPage } from './pages/gerenciamento-aluno-detalhes/gerenciamento-aluno-detalhes.page';
import { GerenciamentoTurmaDetalhesPage } from './pages/gerenciamento-turma-detalhes/gerenciamento-turma-detalhes.page';
import { GerenciamentoFuncionarioDetalhesPage } from './pages/gerenciamento-funcionario-detalhes/gerenciamento-funcionario-detalhes.page';
import { GerenciamentoCargoDetalhesPage } from './pages/gerenciamento-cargo-detalhes/gerenciamento-cargo-detalhes.page';
import { GerenciamentoCanalPage } from './pages/gerenciamento-canal/gerenciamento-canal.page';
import { GerenciamentoCanalDetalhesPage } from './pages/gerenciamento-canal-detalhes/gerenciamento-canal-detalhes.page';

const routes: Routes = [
  { path: '', component: GerenciamentoPage },
  { path: 'responsavel', component: GerenciamentoResponsavelPage },
  { path: 'responsavel/:id/detalhes', component: GerenciamentoResponsavelDetalhesPage },
  { path: 'responsavel/cadastro', component: GerenciamentoResponsavelDetalhesPage },
  { path: 'aluno', component: GerenciamentoAlunoPage },
  { path: 'aluno/:id/detalhes', component: GerenciamentoAlunoDetalhesPage },
  { path: 'aluno/cadastro', component: GerenciamentoAlunoDetalhesPage },
  { path: 'turma', component: GerenciamentoTurmaPage },
  { path: 'turma/:id/detalhes', component: GerenciamentoTurmaDetalhesPage },
  { path: 'turma/cadastro', component: GerenciamentoTurmaDetalhesPage },
  { path: 'funcionario', component: GerenciamentoFuncionarioPage },
  { path: 'funcionario/:id/detalhes', component: GerenciamentoFuncionarioDetalhesPage },
  { path: 'funcionario/cadastro', component: GerenciamentoFuncionarioDetalhesPage },
  { path: 'cargo', component: GerenciamentoCargoPage },
  { path: 'cargo/:id/detalhes', component: GerenciamentoCargoDetalhesPage },
  { path: 'cargo/cadastro', component: GerenciamentoCargoDetalhesPage },
  { path: 'canal', component: GerenciamentoCanalPage },
  { path: 'canal/:id/detalhes', component: GerenciamentoCanalDetalhesPage },
  { path: 'canal/cadastro', component: GerenciamentoCanalDetalhesPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoRoutingModule {
  static components = [
    GerenciamentoPage,
    GerenciamentoResponsavelPage, GerenciamentoResponsavelDetalhesPage,
    GerenciamentoAlunoPage, GerenciamentoAlunoDetalhesPage,
    GerenciamentoTurmaPage, GerenciamentoTurmaDetalhesPage,
    GerenciamentoFuncionarioPage, GerenciamentoFuncionarioDetalhesPage,
    GerenciamentoCargoPage, GerenciamentoCargoDetalhesPage,
    GerenciamentoCanalPage, GerenciamentoCanalDetalhesPage,
  ]
}
