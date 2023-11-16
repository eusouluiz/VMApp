import { Injectable } from '@angular/core';
import { ALUNO_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Aluno } from './aluno.entity';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {

    buscarTodosAlunos(): Aluno[]{
        return ALUNO_DATA
    }

    buscarAluno(idAluno: string): Aluno | undefined{
        return ALUNO_DATA.find((a) => {
            return a.aluno_id === idAluno
        })
    }

    incluirAluno(aluno: Aluno) {
        ALUNO_DATA.push(aluno)
    }

    alterarAluno(aluno: Aluno) {
        var indexA = ALUNO_DATA.findIndex((a) => {
            return a.aluno_id === aluno.aluno_id
        })
        if (indexA !== -1) {
            ALUNO_DATA[indexA] = aluno
        } else {
            throw new Error('aluno nao encontrado')
        }
    }

    deletarAluno(idAluno: string) {
        var indexA = ALUNO_DATA.findIndex((a) => {
            return a.aluno_id === idAluno
        })
        if (indexA !== -1){
            ALUNO_DATA.splice(indexA, 1)
        } else {
            throw new Error('aluno nao encontrado')
        }
    }

}