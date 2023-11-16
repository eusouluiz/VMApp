import { Injectable } from '@angular/core';
import { TURMA_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Turma } from './turma.entity';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {

    buscarTodosTurmas(): Turma[]{
        return TURMA_DATA
    }

    buscarTurma(idTurma: string): Turma | undefined{
        return TURMA_DATA.find((t) => {
            return t.turma_id === idTurma
        })
    }

    incluirTurma(turma: Turma) {
        TURMA_DATA.push(turma)
    }

    alterarTurma(turma: Turma) {
        var indexT = TURMA_DATA.findIndex((t) => {
            return t.turma_id === turma.turma_id
        })
        if (indexT !== -1) {
            TURMA_DATA[indexT] = turma
        } else {
            throw new Error('turma nao encontrado')
        }
    }

    deletarTurma(idTurma: string) {
        var indexT = TURMA_DATA.findIndex((t) => {
            return t.turma_id === idTurma
        })
        if (indexT !== -1){
            TURMA_DATA.splice(indexT, 1)
        } else {
            throw new Error('turma nao encontrado')
        }
    }

}