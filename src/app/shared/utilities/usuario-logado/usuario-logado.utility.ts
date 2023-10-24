import { SessionRepository } from './../../../core/state/session/session.repository';

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

    getCargoId(): number | undefined{
        return this.sessionRepository.session()?.usuarioLogado.cargoId
    }

}