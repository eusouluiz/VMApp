import { Injectable } from '@angular/core';
import { RESPONSAVEL_DATA, Responsavel } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelService {

    buscarTodosResponsaveis(): Responsavel[]{
        return RESPONSAVEL_DATA
    }

    buscarResponsavel(idResponsavel: Number): Responsavel | undefined{
        return RESPONSAVEL_DATA.find((r) => {
            return r.idResponsavel === idResponsavel
        })
    }

    incluirResponsavel(responsavel: Responsavel) {
        RESPONSAVEL_DATA.push(responsavel)
    }

    alterarResponsavel(responsavel: Responsavel) {
        var indexR = RESPONSAVEL_DATA.findIndex((r) => {
            return r.idResponsavel === responsavel.idResponsavel
        })
        if (indexR !== -1) {
            RESPONSAVEL_DATA[indexR] = responsavel
        } else {
            throw new Error('responsavel nao encontrado')
        }
    }

    deletarResponsavel(idResponsavel: Number) {
        var indexR = RESPONSAVEL_DATA.findIndex((r) => {
            return r.idResponsavel === idResponsavel
        })
        if (indexR !== -1){
            RESPONSAVEL_DATA.splice(indexR, 1)
        } else {
            throw new Error('responsavel nao encontrado')
        }
    }

}