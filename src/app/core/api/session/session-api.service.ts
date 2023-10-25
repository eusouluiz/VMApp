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

    var nome: string = ''
    var idFuncionarioResponsavel: number = -1
    var tipoUsuario: 'F' | 'R' = 'R'
    var idCargo = undefined

    var listaFuncionalidades: number[] = []
    // so preenche a lista de funcionalidades caso o usuario seja um funcionario
    if (funcionario !== undefined) {
      funcionario.cargo.funcionalidades.forEach((f) => {
        listaFuncionalidades.push(f.idFuncionalidade)
      })
      nome = funcionario.nome
      idFuncionarioResponsavel = funcionario.idFuncionario
      tipoUsuario = 'F'
      idCargo = funcionario.cargo.idCargo
    } else if (responsavel !== undefined) {
      nome = responsavel?.nome
      idFuncionarioResponsavel = responsavel.idResponsavel
    }

    return of({ accessToken: '123456', tokenType: 'Bearer', usuarioLogado: {
      nome: nome,
      idFuncionarioResponsavel: idFuncionarioResponsavel,
      tipoUsuario: tipoUsuario, 
      idCargo: idCargo, 
      funcionalidadesAcessoId: listaFuncionalidades 
    }});
  }

  postLogout(): Observable<string> {
    return of('');
  }
}
