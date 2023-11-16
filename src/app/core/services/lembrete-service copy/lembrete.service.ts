import { Injectable } from '@angular/core';
import { LEMBRETE_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Lembrete } from './lembrete.entity';

@Injectable({
  providedIn: 'root',
})
export class LembreteService {

    buscarTodosLembretes(): Lembrete[]{
        return LEMBRETE_DATA
    }

    buscarLembrete(idLembrete: string): Lembrete | undefined{
        return LEMBRETE_DATA.find((l) => {
            return l.id === idLembrete
        })
    }

    incluirLembrete(lembrete: Lembrete) {
        LEMBRETE_DATA.push(lembrete)
    }

    alterarLembrete(lembrete: Lembrete) {
        var indexL = LEMBRETE_DATA.findIndex((l) => {
            return l.id === lembrete.id
        })
        if (indexL !== -1) {
            LEMBRETE_DATA[indexL] = lembrete
        } else {
            throw new Error('lembrete nao encontrado')
        }
    }

    deletarLembrete(idLembrete: string) {
        var indexL = LEMBRETE_DATA.findIndex((l) => {
            return l.id === idLembrete
        })
        if (indexL !== -1){
            LEMBRETE_DATA.splice(indexL, 1)
        } else {
            throw new Error('lembrete nao encontrado')
        }
    }

}