import { Injectable } from '@angular/core';
import { RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Responsavel } from './responsavel.entity';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelService {

    buscarTodosResponsaveis(): Responsavel[]{
        return RESPONSAVEL_DATA
    }

    buscarResponsavel(idResponsavel: string): Responsavel | undefined{
        return RESPONSAVEL_DATA.find((r) => {
            return r.responsavel_id === idResponsavel
        })
    }

    incluirResponsavel(responsavel: Responsavel) {
        RESPONSAVEL_DATA.push(responsavel)
    }

    alterarResponsavel(responsavel: Responsavel) {
        var indexR = RESPONSAVEL_DATA.findIndex((r) => {
            return r.responsavel_id === responsavel.responsavel_id
        })
        if (indexR !== -1) {
            RESPONSAVEL_DATA[indexR] = responsavel
        } else {
            throw new Error('responsavel nao encontrado')
        }
    }

    deletarResponsavel(idResponsavel: string) {
        var indexR = RESPONSAVEL_DATA.findIndex((r) => {
            return r.responsavel_id === idResponsavel
        })
        if (indexR !== -1){
            RESPONSAVEL_DATA.splice(indexR, 1)
        } else {
            throw new Error('responsavel nao encontrado')
        }
    }

}