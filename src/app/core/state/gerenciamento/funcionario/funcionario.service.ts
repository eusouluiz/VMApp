import { Injectable } from '@angular/core';
import { FUNCIONARIO_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Funcionario, FuncionarioInterface } from './funcionario.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Cargo } from '../cargo/cargo.entity';

@Injectable({
    providedIn: 'root',
})
export class FuncionarioService {
    
    constructor(
        private gerenciamentoRepository: GerenciamentoRepository,
        private http: HttpClient,
    ) {

    }

    buscarTodosFuncionarios(): Observable<FuncionarioInterface[]>{
        return this.http
            .get<FuncionarioInterface[]>(`${environment.api.endpoint}/funcionario`)
            .pipe(tap((funcionarios) => this.saveFuncionariosInStorage(funcionarios)));
    }
    
    buscarFuncionario(idFuncionario: string): Observable<FuncionarioInterface>{
        return this.http
            .get<FuncionarioInterface>(`${environment.api.endpoint}/funcionario/${idFuncionario}`)
            .pipe(tap((funcionario) => this.saveFuncionarioInStorage(funcionario)));
    }

    alterarFuncionario(funcionario: FuncionarioInterface, funcionarioId: string):Observable<FuncionarioInterface> {
        return this.http
            .put<FuncionarioInterface>(`${environment.api.endpoint}/funcionario/${funcionarioId}`, funcionario);
    }
    
    deletarFuncionario(idFuncionario: string): Observable<FuncionarioInterface[]>{
        return this.http
            .delete<FuncionarioInterface[]>(`${environment.api.endpoint}/funcionario/${idFuncionario}`)
    }

    vincularCargo(funcionario: Funcionario, cargos: Cargo[]): Observable<FuncionarioInterface>{
        var idCargo = null
        if (cargos.length > 0){
            idCargo = cargos[0].cargo_id
        }

        const funcionarioVinculo = {
            user_id: funcionario.usuario.user_id,
            cargo_id: idCargo
        }

        return this.http
            .put<FuncionarioInterface>(`${environment.api.endpoint}/funcionario/${funcionario.funcionario_id}`, funcionarioVinculo)
    }
    
    saveFuncionariosInStorage(funcionarios: FuncionarioInterface[]) {
        this.gerenciamentoRepository.update({ funcionarios: funcionarios });
    }

    saveFuncionarioInStorage(funcionario: FuncionarioInterface): void {
        var funcionarios = this.gerenciamentoRepository.funcionarios()
        const indexFuncionario = funcionarios.findIndex((funcionarioStorage) => {
            return funcionarioStorage.funcionario_id === funcionario.funcionario_id
        })

        if (indexFuncionario !== -1) {
            funcionarios[indexFuncionario] = funcionario
        } else {
            funcionarios.push(funcionario)
        }

        this.gerenciamentoRepository.update({ funcionarios: funcionarios });
    }

    removerFuncionarioInStorage(idFuncionario: string) {
        var funcionarios = this.gerenciamentoRepository.funcionarios()
        const indexFuncionario = funcionarios.findIndex((funcionarioStorage) => {
            return funcionarioStorage.funcionario_id === idFuncionario
        })

        if (indexFuncionario !== -1) {
            funcionarios.splice(indexFuncionario, 1)
        } 

        this.gerenciamentoRepository.update({ funcionarios: funcionarios });
    }
}