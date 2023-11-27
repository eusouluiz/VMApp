import { Injectable } from '@angular/core';
import { SessionRepository } from './../../../core/state/session/session.repository';
import { Responsavel } from '../../../core/state/gerenciamento/responsavel/responsavel.entity';
import { FUNCIONALIDADE_DATA } from '../../../core/state/gerenciamento/funcionalidade/funcionalidade.entity';

@Injectable({ providedIn: 'root' })
export class UsuarioLogado {
  constructor(
    private sessionRepository: SessionRepository,
  ) { }

  isResponsavel(): boolean {
    return this.sessionRepository.userInfo()?.tipo === 'R';
  }

  isFuncionario(): boolean {
    return this.sessionRepository.userInfo()?.tipo === 'F';
  }

  getFuncionalidadesAcessoId(): string[] {
    let funcionalidadesId: string[] = [];
    const cargoId = this.getIdCargo();
    if (cargoId !== null && cargoId !== undefined) {
      this.sessionRepository.userInfo()?.funcionario.cargo.funcionalidades.forEach((funcionalidade) => {
        funcionalidadesId.push(funcionalidade.funcionalidade_id);
      });
    } else {
      return [];
    }

    return funcionalidadesId;
  }

  getIdCargo(): string | null | undefined {
    if (
      this.sessionRepository.userInfo()?.funcionario !== null &&
      this.sessionRepository.userInfo()?.funcionario.cargo !== undefined
    ) {
      return this.sessionRepository.userInfo()?.funcionario.cargo.cargo_id;
    } else {
      return undefined;
    }
  }

  getNome(): string | undefined {
    return this.sessionRepository.userInfo()?.nome;
  }

  getResponsavel(): Responsavel | undefined {
    if (this.sessionRepository.userInfo()?.responsavel !== null) {
      return this.sessionRepository.userInfo()?.responsavel;
    } else {
      return undefined;
    }
  }

  getIdResponsavel(): string | undefined {
    if (this.sessionRepository.userInfo()?.responsavel !== null) {
      return this.sessionRepository.userInfo()?.responsavel.responsavel_id;
    } else {
      return undefined;
    }
  }

  getListaIdTurmas(): string[] {
    var listaTurmas: string[] = []
    const responsavel = this.sessionRepository.userInfo()?.responsavel
    if (responsavel !== undefined && responsavel !== null) {
      responsavel.alunos.forEach((aluno) => {
        if (aluno.turma_id !== null) {
          listaTurmas.push(aluno.turma_id)
        }
      })
    } 
    return listaTurmas
  }

  getIdFuncionario(): string | undefined {
    if (this.sessionRepository.userInfo()?.funcionario !== null) {
      return this.sessionRepository.userInfo()?.funcionario.funcionario_id;
    } else {
      return undefined;
    }
  }

  getIdUsuario(): string | undefined {
    return this.sessionRepository.userInfo()?.user_id;
  }
}
