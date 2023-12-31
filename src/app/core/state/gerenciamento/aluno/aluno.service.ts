import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Aluno, AlunoInterface } from './aluno.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Responsavel } from '../responsavel/responsavel.entity';
import { ListaUtil } from '../../../../shared/utilities/lista/lista.utility';

interface ResponseAluno {
    msg: string,
    data: AlunoInterface,
  }

interface AssociacaoAlunoResponsavel {
    id?: string,
    aluno_id: string,
    responsavel_id: string,
}

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
        return this.http
            .get<AlunoInterface[]>(`${environment.api.endpoint}/aluno`)
            .pipe(tap((alunos) => this.saveAlunosInStorage(alunos)));
    }

    buscarAluno(idAluno: string): Observable<AlunoInterface> {
        return this.http
            .get<AlunoInterface>(`${environment.api.endpoint}/aluno/${idAluno}`)
            .pipe(tap((aluno) => this.saveAlunoInStorage(aluno)));
    }

    incluirAluno(aluno: AlunoInterface):Observable<ResponseAluno> {
        return this.http
            .post<ResponseAluno>(`${environment.api.endpoint}/aluno`, aluno)
            .pipe(tap((response) => {
              if ((response.data.aluno_id !== undefined && response.data.aluno_id !== null)) {
                aluno.aluno_id = response.data.aluno_id
              }
            }));
    }

    alterarAluno(aluno: AlunoInterface, alunoId: string):Observable<AlunoInterface> {
        return this.http
            .put<AlunoInterface>(`${environment.api.endpoint}/aluno/${alunoId}`, aluno);
    }

    deletarAluno(idAluno: string): Observable<AlunoInterface> {
        return this.http
            .delete<AlunoInterface>(`${environment.api.endpoint}/aluno/${idAluno}`)
    }

    vincularResponsaveis(aluno: Aluno, responsaveis: Responsavel[]) {
        var listaIdResponsaveis: string[] = []
        aluno.responsaveis.forEach((responsavel) => {
            listaIdResponsaveis.push(responsavel.responsavel_id)
        })
        var listaIdResponsaveisNovos: string[] = []
        responsaveis.forEach((responsavel) => {
            listaIdResponsaveisNovos.push(responsavel.responsavel_id)
        })

        const [idsNovos, idsDeletados, idsExistentes] = ListaUtil.retornarDiferencaListas(listaIdResponsaveisNovos, listaIdResponsaveis)

        idsNovos.forEach((id: string) => {
            const associacao: AssociacaoAlunoResponsavel = {
                aluno_id: aluno.aluno_id,
                responsavel_id: id,
            }
            this.vincularResponsavel(associacao).subscribe()
        })

        idsDeletados.forEach((id: string) => {
            const associacao: AssociacaoAlunoResponsavel = {
                aluno_id: aluno.aluno_id,
                responsavel_id: id,
            }
            this.desvincularResponsavel(associacao).subscribe()
        })
    }

    vincularResponsavel(associacao: AssociacaoAlunoResponsavel): Observable<AssociacaoAlunoResponsavel> {
        return this.http
            .post<AssociacaoAlunoResponsavel>(`${environment.api.endpoint}/aluno-responsavel`, associacao);
    }

    desvincularResponsavel(associacao: AssociacaoAlunoResponsavel): Observable<AssociacaoAlunoResponsavel> {
        return this.http
            .delete<AssociacaoAlunoResponsavel>(`${environment.api.endpoint}/aluno-responsavel/${associacao.aluno_id}/${associacao.responsavel_id}`)
    }

    private saveAlunosInStorage(alunos: AlunoInterface[]) {
        this.gerenciamentoRepository.update({ alunos: alunos });
    }

    saveAlunoInStorage(aluno: AlunoInterface): void {
        var alunos = this.gerenciamentoRepository.alunos()
        const indexAluno = alunos.findIndex((alunoStorage) => {
            return alunoStorage.aluno_id === aluno.aluno_id
        })

        if (indexAluno !== -1) {
            alunos[indexAluno] = aluno
        } else {
            alunos.push(aluno)
        }

        this.gerenciamentoRepository.update({ alunos: alunos });
    }

    removerAlunoInStorage(idAluno: string) {
        var alunos = this.gerenciamentoRepository.alunos()
        const indexAluno = alunos.findIndex((alunoStorage) => {
            return alunoStorage.aluno_id === idAluno
        })

        if (indexAluno !== -1) {
            alunos.splice(indexAluno, 1)
        } 

        this.gerenciamentoRepository.update({ alunos: alunos });
    }
}