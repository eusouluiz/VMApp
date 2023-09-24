import { GerenciamentoResponsavelPage } from './pages/gerenciamento-responsavel/gerenciamento-responsavel.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenciamentoRoutingModule } from './gerenciamento-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { GerenciamentoPage } from './pages/gerenciamento/gerenciamento.page';
import { GerenciamentoAlunoPage } from './pages/gerenciamento-aluno/gerenciamento-aluno.page';
import { GerenciamentoTurmaPage } from './pages/gerenciamento-turma/gerenciamento-turma.page';
import { GerenciamentoFuncionarioPage } from './pages/gerenciamento-funcionario/gerenciamento-funcionario.page';
import { GerenciamentoCargoPage } from './pages/gerenciamento-cargo/gerenciamento-cargo.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
// import { provideAnimations} from '@angular/platform-browser/animations'
import { GerenciamentoResponsavelDetalhesPage } from './pages/gerenciamento-responsavel-detalhes/gerenciamento-responsavel-detalhes.page';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { GerenciamentoAlunoDetalhesPage } from './pages/gerenciamento-aluno-detalhes/gerenciamento-aluno-detalhes.page';
import { GerenciamentoTurmaDetalhesPage } from './pages/gerenciamento-turma-detalhes/gerenciamento-turma-detalhes.page';
import { AutocompleteV2Component } from './components/autocomplete-v2/autocomplete-v2.component';

@NgModule({
  declarations: [
    GerenciamentoPage, 
    GerenciamentoResponsavelPage, GerenciamentoResponsavelDetalhesPage,
    GerenciamentoAlunoPage, GerenciamentoAlunoDetalhesPage, 
    GerenciamentoTurmaPage, GerenciamentoTurmaDetalhesPage,
    GerenciamentoFuncionarioPage, GerenciamentoCargoPage,
  ],
  imports: [
    CommonModule,
    GerenciamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AutocompleteComponent,
    AutocompleteV2Component
  ]
})
export class GerenciamentoModule { }
