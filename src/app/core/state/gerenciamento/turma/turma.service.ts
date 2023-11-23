import { Injectable } from '@angular/core';
import { TURMA_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Turma, TurmaInterface } from './turma.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TurmaService {

    constructor(
        private gerenciamentoRepository: GerenciamentoRepository,
        private http: HttpClient,
    ) {

    }

    buscarTodosTurmas(): Observable<TurmaInterface[]> {
        // return TURMA_DATA
        return this.http
            .get<TurmaInterface[]>(`${environment.api.endpoint}/turma`)
            .pipe(tap((turmas) => this.saveTurmasInStorage(turmas)));
    }

    buscarTurma(idTurma: string): Observable<TurmaInterface> {
        // return TURMA_DATA.find((t) => {
        //     return t.turma_id === idTurma
        // })
        return this.http
            .get<TurmaInterface>(`${environment.api.endpoint}/turma/${idTurma}`)
            .pipe(tap((turma) => this.saveTurmaInStorage(turma)));
    }

    incluirTurma(turma: Turma) {
        TURMA_DATA.push(turma)
        // return this.http
        //     .post<TurmaInterface>(`${environment.api.endpoint}/turma`, turma);
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
        // return this.http
        //     .put<TurmaInterface>(`${environment.api.endpoint}/turma/${turma.turma_id}`, turma);
    }

    deletarTurma(idTurma: string) {
        var indexT = TURMA_DATA.findIndex((t) => {
            return t.turma_id === idTurma
        })
        if (indexT !== -1) {
            TURMA_DATA.splice(indexT, 1)
        } else {
            throw new Error('turma nao encontrado')
        }
        // return this.http
        //     .delete<TurmaInterface[]>(`${environment.api.endpoint}/turma/${idTurma}`)
    }

    saveTurmasInStorage(turmas: TurmaInterface[]) {
        this.gerenciamentoRepository.update({ turmas: turmas });
    }

    saveTurmaInStorage(turma: TurmaInterface): void {
        var turmas = this.gerenciamentoRepository.turmas()
        const indexTurma = turmas.findIndex((turma) => {
            return turma.turma_id === turma.turma_id
        })
        turmas[indexTurma] = turma

        this.gerenciamentoRepository.update({ turmas: turmas });
    }

}