import { Injectable } from '@angular/core';
import { SessionRepository } from './../../../core/state/session/session.repository';

@Injectable({ providedIn: 'root' })
export class UsuarioLogado {
  constructor(private sessionRepository: SessionRepository) {}

  isResponsavel(): boolean {
    return this.sessionRepository.userInfo()?.tipo === 'R';
  }

  isFuncionario(): boolean {
    return this.sessionRepository.userInfo()?.tipo === 'F';
  }

  getFuncionalidadesAcessoId(): number[] | undefined {
    return this.sessionRepository.userInfo()?.funcionalidadesAcessoId;
  }

  getIdCargo(): number | undefined {
    return this.sessionRepository.userInfo()?.idCargo;
  }

  getNome(): string | undefined {
    return this.sessionRepository.userInfo()?.nome;
  }

  getIdResponsavel(): number | undefined {
    return this.sessionRepository.userInfo()?.idFuncionarioResponsavel;
  }

  getIdFuncionario(): number | undefined {
    return this.sessionRepository.userInfo()?.idFuncionarioResponsavel;
  }

  getIdUsuario(): number | undefined {
    return this.sessionRepository.userInfo()?.idUsuario;
  }
}
