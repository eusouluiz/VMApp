import { Injectable } from '@angular/core';
import { LEMBRETE_DATA, Lembrete } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class LembreteService {

    buscarTodosLembretes(): Lembrete[]{
        return LEMBRETE_DATA
    }

    buscarLembrete(idLembrete: number): Lembrete | undefined{
        return LEMBRETE_DATA.find((l) => {
            return l.idLembrete === idLembrete
        })
    }

    incluirLembrete(lembrete: Lembrete) {
        lembrete.idLembrete = LEMBRETE_DATA[LEMBRETE_DATA.length-1].idLembrete + 1
        LEMBRETE_DATA.push(lembrete)
    }

    alterarLembrete(lembrete: Lembrete) {
        var indexL = LEMBRETE_DATA.findIndex((l) => {
            return l.idLembrete === lembrete.idLembrete
        })
        if (indexL !== -1) {
            LEMBRETE_DATA[indexL] = lembrete
        } else {
            throw new Error('lembrete nao encontrado')
        }
    }

    deletarLembrete(idLembrete: number) {
        var indexL = LEMBRETE_DATA.findIndex((l) => {
            return l.idLembrete === idLembrete
        })
        if (indexL !== -1){
            LEMBRETE_DATA.splice(indexL, 1)
        } else {
            throw new Error('lembrete nao encontrado')
        }
    }

}