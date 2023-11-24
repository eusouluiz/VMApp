import { AlunoService } from './../aluno/aluno.service';
import { Injectable } from '@angular/core';
import { RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Turma, TurmaInterface } from './turma.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Aluno, AlunoInterface } from '../aluno/aluno.entity';
import { ListaUtil } from '../../../../shared/utilities/lista/lista.utility';

interface ResponseTurma {
    msg: string,
    data: TurmaInterface,
}

@Injectable({
    providedIn: 'root',
})
export class TurmaService {

    constructor(
        private gerenciamentoRepository: GerenciamentoRepository,
        private http: HttpClient,
        private alunoService: AlunoService
    ) {

    }

    buscarTodosTurmas(): Observable<TurmaInterface[]> {
        return this.http
            .get<TurmaInterface[]>(`${environment.api.endpoint}/turma`)
            .pipe(tap((turmas) => this.saveTurmasInStorage(turmas)));
    }

    buscarTurma(idTurma: string): Observable<TurmaInterface> {
        return this.http
            .get<TurmaInterface>(`${environment.api.endpoint}/turma/${idTurma}`)
            .pipe(tap((turma) => this.saveTurmaInStorage(turma)));
    }

    incluirTurma(turma: TurmaInterface): Observable<ResponseTurma> {
        return this.http
            .post<ResponseTurma>(`${environment.api.endpoint}/turma`, turma)
            .pipe(tap((response) => {
                if ((response.data.turma_id !== undefined && response.data.turma_id !== null)) {
                    turma.turma_id = response.data.turma_id
                }
            }));
    }

    alterarTurma(turma: TurmaInterface, turmaId: string): Observable<TurmaInterface> {
        return this.http
            .put<TurmaInterface>(`${environment.api.endpoint}/turma/${turmaId}`, turma);
    }

    deletarTurma(idTurma: string): Observable<TurmaInterface[]> {
        return this.http
            .delete<TurmaInterface[]>(`${environment.api.endpoint}/turma/${idTurma}`)
    }

    vincularAlunos(turma: Turma, alunos: Aluno[]) {
        console.log(turma.alunos)
        console.log(alunos)
        var listaIdAlunos: string[] = []
        turma.alunos.forEach((aluno) => {
            listaIdAlunos.push(aluno.aluno_id)
        })
        var listaIdAlunosNovos: string[] = []
        alunos.forEach((aluno) => {
            listaIdAlunosNovos.push(aluno.aluno_id)
        })

        const [idsNovos, idsDeletados, idsExistentes] = ListaUtil.retornarDiferencaListas(listaIdAlunosNovos, listaIdAlunos)

        console.log([idsNovos, idsDeletados, idsExistentes])

        // vincular
        idsNovos.forEach((id: string) => {
            console.log(id)
            console.log('aluno.aluno_id')
            const alunoNovo = alunos.find((aluno) => {
                console.log(aluno.aluno_id)
                return aluno.aluno_id === id
            })

            if (alunoNovo !== undefined) {
                const alunoInterface: AlunoInterface = {
                    nome: alunoNovo.nome,
                    cgm: alunoNovo.cgm,
                    turma_id: turma.turma_id
                }

                this.alunoService.alterarAluno(alunoInterface, alunoNovo.aluno_id).subscribe()
            }
        })

        // desvincular
        idsDeletados.forEach((id: string) => {
            const alunoDeletado = turma.alunos.find((aluno) => {
                return aluno.aluno_id === id
            })

            if (alunoDeletado !== undefined) {
                const alunoInterface: AlunoInterface = {
                    nome: alunoDeletado.nome,
                    cgm: alunoDeletado.cgm,
                    turma_id: null
                }

                this.alunoService.alterarAluno(alunoInterface, alunoDeletado.aluno_id).subscribe()
            }
        })
    }

    saveTurmasInStorage(turmas: TurmaInterface[]) {
        console.log('saveTurmasInStorage')
        this.gerenciamentoRepository.update({ turmas: turmas });
    }

    saveTurmaInStorage(turma: TurmaInterface): void {
        console.log('saveTurmaInStorage')
        var turmas = this.gerenciamentoRepository.turmas()
        const indexTurma = turmas.findIndex((turma) => {
            return turma.turma_id === turma.turma_id
        })
        turmas[indexTurma] = turma

        this.gerenciamentoRepository.update({ turmas: turmas });
    }
}