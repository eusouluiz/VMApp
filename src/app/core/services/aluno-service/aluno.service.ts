import { Injectable } from '@angular/core';
import { ALUNO_DATA, Aluno } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {

    buscarTodosAlunos(): Aluno[]{
        return ALUNO_DATA
    }

    buscarAluno(idAluno: number): Aluno | undefined{
        return ALUNO_DATA.find((a) => {
            return a.idAluno === idAluno
        })
    }

    incluirAluno(aluno: Aluno) {
        aluno.idAluno = ALUNO_DATA[ALUNO_DATA.length-1].idAluno + 1
        ALUNO_DATA.push(aluno)
    }

    alterarAluno(aluno: Aluno) {
        var indexA = ALUNO_DATA.findIndex((a) => {
            return a.idAluno === aluno.idAluno
        })
        if (indexA !== -1) {
            ALUNO_DATA[indexA] = aluno
        } else {
            throw new Error('aluno nao encontrado')
        }
    }

    deletarAluno(idAluno: number) {
        var indexA = ALUNO_DATA.findIndex((a) => {
            return a.idAluno === idAluno
        })
        if (indexA !== -1){
            ALUNO_DATA.splice(indexA, 1)
        } else {
            throw new Error('aluno nao encontrado')
        }
    }

}