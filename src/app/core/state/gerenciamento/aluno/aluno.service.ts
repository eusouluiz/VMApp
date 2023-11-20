import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ALUNO_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Aluno, AlunoInterface } from './aluno.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AlunoService {

    constructor(
        private gerenciamentoRepository: GerenciamentoRepository,
        private http: HttpClient,
    ) {

    }

    buscarTodosAlunos(): Observable<AlunoInterface[]> {
        console.log(`${environment.api.endpoint}/aluno`)
        // return ALUNO_DATA
        return this.http
            .get<AlunoInterface[]>(`${environment.api.endpoint}/aluno`)
            .pipe(tap((alunos) => this.saveAlunosInStorage(alunos)));
    }

    buscarAluno(idAluno: string): Aluno | undefined {
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
        if (indexA !== -1) {
            ALUNO_DATA.splice(indexA, 1)
        } else {
            throw new Error('aluno nao encontrado')
        }
    }

    private saveAlunosInStorage(alunos: AlunoInterface[]) {
        this.gerenciamentoRepository.update({ alunos: alunos });
    }
}