import { Injectable } from '@angular/core';
import { CANAL_DATA, CANAL_RESPONSAVEL_DATA, Canal, CanalResponsavel } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class CanalService {

    buscarTodosCanais(): Canal[]{
        return CANAL_DATA
    }

    buscarCanal(idCanal: number): Canal | undefined{
        return CANAL_DATA.find((r) => {
            return r.idCanal === idCanal
        })
    }

    incluirCanal(canal: Canal) {
        canal.idCanal = CANAL_DATA[CANAL_DATA.length-1].idCanal + 1
        CANAL_DATA.push(canal)
    }

    alterarCanal(canal: Canal) {
        var indexC = CANAL_DATA.findIndex((c) => {
            return c.idCanal === canal.idCanal
        })
        if (indexC !== -1) {
            CANAL_DATA[indexC] = canal
        } else {
            throw new Error('canal nao encontrado')
        }
    }

    deletarCanal(idCanal: number) {
        var indexC = CANAL_DATA.findIndex((c) => {
            return c.idCanal === idCanal
        })
        if (indexC !== -1){
            CANAL_DATA.splice(indexC, 1)
        } else {
            throw new Error('canal nao encontrado')
        }
    }

    buscarIdCanalResponsavel(idCanal: number, idResponsavel: number): number | undefined{
        var idCanalResponsavel = CANAL_RESPONSAVEL_DATA.find((cr) => {
            return cr.idCanal === idCanal && cr.idResponsavel === idResponsavel
        })?.idCanalResponsavel

        if (idCanalResponsavel !== undefined){
            return idCanalResponsavel
        }
        return this.incluirCanalResponsavel(idCanal, idResponsavel)
    }

    incluirCanalResponsavel(idCanal: number, idResponsavel: number): number | undefined{
        var canalResponsavel: CanalResponsavel = {
            idCanalResponsavel: CANAL_RESPONSAVEL_DATA[CANAL_RESPONSAVEL_DATA.length-1].idCanalResponsavel + 1,
            idCanal: idCanal,
            idResponsavel: idResponsavel
        }

        CANAL_RESPONSAVEL_DATA.push(canalResponsavel)
        return canalResponsavel.idCanalResponsavel
    }

}