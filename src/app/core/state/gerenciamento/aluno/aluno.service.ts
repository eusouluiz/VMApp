import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ALUNO_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Aluno, AlunoInterface } from './aluno.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Responsavel } from '../responsavel/responsavel.entity';
import { ListaUtil } from '../../../../shared/utilities/lista/lista.utility';

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

    buscarAluno(idAluno: string): Aluno | undefined /* Observable<AlunoInterface> */ {
        return ALUNO_DATA.find((a) => {
            return a.aluno_id === idAluno
        })
        // return this.http
        //     .get<AlunoInterface>(`${environment.api.endpoint}/aluno/${idAluno}`)
        //     .pipe(tap((aluno) => this.saveAlunoInStorage(aluno)));
    }

    incluirAluno(aluno: Aluno /* aluno: AlunoInterface */)/* :Observable<AlunoInterface> */ {
        ALUNO_DATA.push(aluno)

        // return this.http
        //     .post<AlunoInterface>(`${environment.api.endpoint}/aluno`, aluno);
    }

    alterarAluno(aluno: Aluno /* aluno: AlunoInterface */)/* :Observable<AlunoInterface> */ {
        var indexA = ALUNO_DATA.findIndex((a) => {
            return a.aluno_id === aluno.aluno_id
        })
        if (indexA !== -1) {
            ALUNO_DATA[indexA] = aluno
        } else {
            throw new Error('aluno nao encontrado')
        }

        // return this.http
        //     .put<AlunoInterface>(`${environment.api.endpoint}/aluno/${aluno.aluno_id}`, aluno);
    }

    deletarAluno(idAluno: string)/* :Observable<AlunoInterface> */ {
        var indexA = ALUNO_DATA.findIndex((a) => {
            return a.aluno_id === idAluno
        })
        if (indexA !== -1) {
            ALUNO_DATA.splice(indexA, 1)
        } else {
            throw new Error('aluno nao encontrado')
        }

        // return this.http
        //     .delete<AlunoInterface[]>(`${environment.api.endpoint}/aluno/${idAluno}`)
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

        //TODO completar ids deletados
        // idsDeletados.forEach((id: string) => {
        //     const associacao: AssociacaoAlunoResponsavel = {
        //         aluno_id: aluno.aluno_id,
        //         responsavel_id: id,
        //     }
        //     this.desvincularResponsavel(associacao).subscribe()
        // })
    }

    vincularResponsavel(associacao: AssociacaoAlunoResponsavel): Observable<AssociacaoAlunoResponsavel> {
        return this.http
            .post<AssociacaoAlunoResponsavel>(`${environment.api.endpoint}/aluno-responsavel`, associacao);
    }

    desvincularResponsavel(associacao: AssociacaoAlunoResponsavel): Observable<AssociacaoAlunoResponsavel> {
        if (associacao.id !== undefined) {
            return this.http
                .delete<AssociacaoAlunoResponsavel>(`${environment.api.endpoint}/aluno-responsavel/${associacao.id}`)
        } else {
            throw new Error('id vinculo indefinido')
        }
    }

    private saveAlunosInStorage(alunos: AlunoInterface[]) {
        this.gerenciamentoRepository.update({ alunos: alunos });
    }

    saveAlunoInStorage(aluno: AlunoInterface): void {
        var alunos = this.gerenciamentoRepository.alunos()
        const indexAluno = alunos.findIndex((aluno) => {
            return aluno.aluno_id === aluno.aluno_id
        })
        alunos[indexAluno] = aluno

        this.gerenciamentoRepository.update({ alunos: alunos });
    }
}