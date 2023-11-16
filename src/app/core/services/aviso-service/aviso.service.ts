import { Injectable } from '@angular/core';
import { AVISO_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Aviso } from './aviso.entity';

@Injectable({
  providedIn: 'root',
})
export class AvisoService {

    buscarTodosAvisos(): Aviso[]{
        return AVISO_DATA
    }

    buscarAviso(idAviso: string): Aviso | undefined{
        return AVISO_DATA.find((m) => {
            return m.aviso_id === idAviso
        })
    }

    incluirAviso(aviso: Aviso) {
        AVISO_DATA.push(aviso)
    }

    alterarAviso(aviso: Aviso) {
        var indexA = AVISO_DATA.findIndex((a) => {
            return a.aviso_id === aviso.aviso_id
        })
        if (indexA !== -1) {
            AVISO_DATA[indexA] = aviso
        } else {
            throw new Error('aviso nao encontrado')
        }
    }

    deletarAviso(idAviso: string) {
        var indexA = AVISO_DATA.findIndex((a) => {
            return a.aviso_id === idAviso
        })
        if (indexA !== -1){
            AVISO_DATA.splice(indexA, 1)
        } else {
            throw new Error('aviso nao encontrado')
        }
    }

}