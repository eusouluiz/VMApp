import { Injectable } from '@angular/core';
import { RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Responsavel, ResponsavelInterface } from './responsavel.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelService {
    
    constructor(
        private gerenciamentoRepository: GerenciamentoRepository,
        private http: HttpClient,
    ) {

    }

    buscarTodosResponsaveis(): Observable<ResponsavelInterface[]>{
        return this.http
            .get<ResponsavelInterface[]>(`${environment.api.endpoint}/responsavel`)
            .pipe(tap((responsaveis) => this.saveResponsaveisInStorage(responsaveis)));
    }
    
    buscarResponsavel(idResponsavel: string): Observable<ResponsavelInterface>{
        return this.http
            .get<ResponsavelInterface>(`${environment.api.endpoint}/responsavel/${idResponsavel}`)
            .pipe(tap((responsavel) => this.saveResponsavelInStorage(responsavel)));
    }
    
    deletarResponsavel(idResponsavel: string): Observable<ResponsavelInterface[]>{
        return this.http
            .delete<ResponsavelInterface[]>(`${environment.api.endpoint}/responsavel/${idResponsavel}`)
    }
    
    saveResponsaveisInStorage(responsaveis: ResponsavelInterface[]) {
        this.gerenciamentoRepository.update({ responsaveis: responsaveis });
    }

    saveResponsavelInStorage(responsavel: ResponsavelInterface): void {
        var responsaveis = this.gerenciamentoRepository.responsaveis()
        const indexResponsavel = responsaveis.findIndex((r) => {
            return r.responsavel_id === responsavel.responsavel_id
        })
        responsaveis[indexResponsavel] = responsavel

        this.gerenciamentoRepository.update({ responsaveis: responsaveis });
    }
}