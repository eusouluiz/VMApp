import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToastModule } from './core/toasts/toast.module';

// ====================================
// SERVICES
// ====================================

import { ExampleCoreService } from './core/services/example-service/example-core.service';
import { GlobalErrorHandlerService } from './core/services/global-error-handler/global-error-handler.service';
import { CustomTranslationsLoaderService } from './core/services/custom-translations-loader-service/custom-translations-loader.service';

// ====================================
// INTERCEPTORS
// ====================================

import { ApiInterceptor } from './core/interceptors/api/api.interceptor';

// ====================================
// ENTIDADES
// ====================================

export interface Usuario {
  idUsuario: Number,
  cpf: String,
  senha: String,
  telefone: String,
  tipoUsuario: 'R' | 'F' | 'A' | '',
}

export interface Responsavel {
  idResponsavel: Number,
  nome: String,
  usuario: Usuario,
}

export interface Funcionalidade {
  idFuncionalidade: Number
  nome: String,
  descricao: String
}

export interface Cargo {
  idCargo: Number,
  nome: String,
  funcionalidades: Funcionalidade[]
}

export interface Funcionario {
  idFuncionario: Number,
  nome: String,
  usuario: Usuario,
  cargo: Cargo
}

const USUARIO_DATA: Usuario[] = [
  {idUsuario: 0, cpf: '00000000000', senha: 'admin000', telefone: '041000000000', tipoUsuario: 'F'},
  {idUsuario: 1, cpf: '12345678900', senha: 'senha123', telefone: '041987654321', tipoUsuario: 'R'},
  {idUsuario: 2, cpf: '98765432100', senha: 'senha456', telefone: '041123456789', tipoUsuario: 'R'},
  {idUsuario: 3, cpf: '08918011970', senha: 'senha789', telefone: '041988222527', tipoUsuario: 'F'},
  {idUsuario: 4, cpf: '00011122233', senha: 'senha000', telefone: '041999666333', tipoUsuario: 'F'},
]

const RESPONSAVEL_DATA: Responsavel[] = [
  {idResponsavel: 0, nome: 'Gabriel r0', usuario: USUARIO_DATA[1]},
  {idResponsavel: 1, nome: 'Luiz r1', usuario: USUARIO_DATA[2]}
]

const FUNCIONALIDADE_DATA: Funcionalidade[] = [
  {idFuncionalidade: 0, nome: 'Gerenciamento Responsaveis', descricao: 'Gerencia todos os responsaveis'},
  {idFuncionalidade: 1, nome: 'Gerenciamento Funcionarios', descricao: 'Gerencia todos os funcionarios'},
]

const CARGO_DATA: Cargo[] = [
  {idCargo: 0, nome: 'Admin', funcionalidades: FUNCIONALIDADE_DATA},
  {idCargo: 1, nome: 'Funcionarios - Responsavel', funcionalidades: [FUNCIONALIDADE_DATA[0]]},
  {idCargo: 2, nome: 'Funcionarios - Funcionario', funcionalidades: [FUNCIONALIDADE_DATA[1]]},
]

const FUNCIONARIO_DATA: Funcionario[] = [
  {idFuncionario: 0, nome: 'Admin f0', usuario: USUARIO_DATA[0], cargo: CARGO_DATA[0]},
  {idFuncionario: 1, nome: 'Giacomo f1', usuario: USUARIO_DATA[1], cargo: CARGO_DATA[1]},
  {idFuncionario: 2, nome: 'Madu f2', usuario: USUARIO_DATA[2], cargo: CARGO_DATA[2]},
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslationsLoaderService,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    ExampleCoreService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  static listaUsuarios = USUARIO_DATA
  static listaResponsaveis = RESPONSAVEL_DATA
  static listaFuncionarios = FUNCIONARIO_DATA

  static usuarioLogado: Responsavel | Funcionario | null = null

}
