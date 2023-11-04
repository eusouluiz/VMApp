import { Injectable } from '@angular/core';
import { TURMA_DATA, Turma } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {

    buscarTodosTurmas(): Turma[]{
        return TURMA_DATA
    }

    buscarTurma(idTurma: number): Turma | undefined{
        return TURMA_DATA.find((t) => {
            return t.idTurma === idTurma
        })
    }

    incluirTurma(turma: Turma) {
        turma.idTurma = TURMA_DATA[TURMA_DATA.length-1].idTurma + 1
        TURMA_DATA.push(turma)
    }

    alterarTurma(turma: Turma) {
        var indexT = TURMA_DATA.findIndex((t) => {
            return t.idTurma === turma.idTurma
        })
        if (indexT !== -1) {
            TURMA_DATA[indexT] = turma
        } else {
            throw new Error('turma nao encontrado')
        }
    }

    deletarTurma(idTurma: number) {
        var indexT = TURMA_DATA.findIndex((t) => {
            return t.idTurma === idTurma
        })
        if (indexT !== -1){
            TURMA_DATA.splice(indexT, 1)
        } else {
            throw new Error('turma nao encontrado')
        }
    }

}