import { FuncionalidadeService } from '../../../core/state/gerenciamento/funcionalidade/funcionalidade.service';
import { Injectable } from '@angular/core';
import { SessionRepository } from './../../../core/state/session/session.repository';
import { Responsavel } from '../../../core/state/gerenciamento/responsavel/responsavel.entity';

@Injectable({ providedIn: 'root' })
export class UsuarioLogado {
  constructor(
    private sessionRepository: SessionRepository,
    private funcionalidadeService: FuncionalidadeService
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
      this.funcionalidadeService.buscarFuncionalidadesCargo(cargoId)?.forEach((funcionalidade) => {
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
