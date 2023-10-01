import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Session } from '../../state/session/session.interface';
import { Funcionalidade, Funcionario, Responsavel, Usuario } from '../../../app.module';

@Injectable({
  providedIn: 'root',
})
export class SessionApiService {
  postLogin(responsavel: Responsavel | undefined, funcionario: Funcionario | undefined): Observable<Session> {
    console.log('postLogin')

    if (responsavel === undefined && funcionario === undefined){
      throw new Error('Responsavel e Funcionario nao definido')
    } else if (responsavel !== undefined && funcionario !== undefined) {
      throw new Error('Nao pode ser definido ambas entidades')
    }

    var listaFuncionalidades: Funcionalidade[] = []
    // so preenche a lista de funcionalidades caso o usuario seja um funcionario
    if (funcionario !== undefined) {
      listaFuncionalidades = funcionario.cargo.funcionalidades
    }

    return of({ accessToken: '123456', tokenType: 'Bearer', funcionalidadeAcesso: listaFuncionalidades});
  }

  postLogout(): Observable<string> {
    return of('');
  }
}
