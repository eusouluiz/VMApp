import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Session } from '../../state/session/session.interface';
import { Funcionario, Responsavel } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class SessionApiService {
  postLogin(responsavel?: Responsavel, funcionario?: Funcionario): Observable<Session> {
    if (responsavel === undefined && funcionario === undefined){
      throw new Error('Responsavel e Funcionario nao definido')
    } else if (responsavel !== undefined && funcionario !== undefined) {
      throw new Error('Nao pode ser definido ambas entidades')
    }

    var tipoUsuario: 'F' | 'R' = 'R'
    var idCargo = undefined

    var listaFuncionalidades: number[] = []
    // so preenche a lista de funcionalidades caso o usuario seja um funcionario
    if (funcionario !== undefined) {
      funcionario.cargo.funcionalidades.forEach((f) => {
        listaFuncionalidades.push(f.idFuncionalidade)
      })
      tipoUsuario = 'F'
      idCargo = funcionario.cargo.idCargo
    }

    return of({ accessToken: '123456', tokenType: 'Bearer', usuarioLogado: {
      tipoUsuario: tipoUsuario, 
      idCargo: idCargo, 
      funcionalidadesAcessoId: listaFuncionalidades 
    }});
  }

  postLogout(): Observable<string> {
    return of('');
  }
}
