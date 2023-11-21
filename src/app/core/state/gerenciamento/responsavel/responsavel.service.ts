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
    
    incluirResponsavel(responsavel: Responsavel) {
        RESPONSAVEL_DATA.push(responsavel)
    }
    
    alterarResponsavel(responsavel: Responsavel) {
        var indexR = RESPONSAVEL_DATA.findIndex((r) => {
            return r.responsavel_id === responsavel.responsavel_id
        })
        if (indexR !== -1) {
            RESPONSAVEL_DATA[indexR] = responsavel
        } else {
            throw new Error('responsavel nao encontrado')
        }
    }
    
    deletarResponsavel(idResponsavel: string) {
        var indexR = RESPONSAVEL_DATA.findIndex((r) => {
            return r.responsavel_id === idResponsavel
        })
        if (indexR !== -1){
            RESPONSAVEL_DATA.splice(indexR, 1)
        } else {
            throw new Error('responsavel nao encontrado')
        }
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