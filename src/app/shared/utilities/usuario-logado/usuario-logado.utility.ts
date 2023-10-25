import { Injectable } from '@angular/core';
import { SessionRepository } from './../../../core/state/session/session.repository';

@Injectable({ providedIn: 'root' })
export class UsuarioLogado {

    constructor (
        private sessionRepository: SessionRepository
    ){
    }

    isResponsavel(): boolean{
        return this.sessionRepository.session()?.usuarioLogado.tipoUsuario === 'R'
    }

    isFuncionario(): boolean{
        return this.sessionRepository.session()?.usuarioLogado.tipoUsuario === 'F'
    }

    getFuncionalidadesAcessoId(): number[] | undefined{
        return this.sessionRepository.session()?.usuarioLogado.funcionalidadesAcessoId
    }

    getIdCargo(): number | undefined{
        return this.sessionRepository.session()?.usuarioLogado.idCargo
    }

    getNome(): string | undefined{
        return this.sessionRepository.session()?.usuarioLogado.nome
    }

    getId(): number | undefined{
        return this.sessionRepository.session()?.usuarioLogado.idFuncionarioResponsavel
    }

}