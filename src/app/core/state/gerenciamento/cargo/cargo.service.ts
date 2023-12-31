import { Injectable } from '@angular/core';
import { Cargo, CargoInterface } from './cargo.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Funcionario, FuncionarioInterface } from '../funcionario/funcionario.entity';
import { ListaUtil } from '../../../../shared/utilities/lista/lista.utility';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { Funcionalidade, FuncionalidadeInterface } from '../funcionalidade/funcionalidade.entity';

interface ResponseCargo {
    msg: string,
    data: CargoInterface,
}

interface AssociacaoFuncionalidadeCargo {
    id?: string,
    funcionalidade_id: string,
    cargo_id: string,
}

@Injectable({
    providedIn: 'root',
})
export class CargoService {

    constructor(
        private funcionarioService: FuncionarioService,
        private gerenciamentoRepository: GerenciamentoRepository,
        private http: HttpClient,
    ) {

    }

    buscarTodosCargos(): Observable<CargoInterface[]> {
        return this.http
            .get<CargoInterface[]>(`${environment.api.endpoint}/cargo`)
            .pipe(tap((cargos) => this.saveCargosInStorage(cargos)));
    }

    buscarCargo(idCargo: string): Observable<CargoInterface> {
        return this.http
            .get<CargoInterface>(`${environment.api.endpoint}/cargo/${idCargo}`)
            .pipe(tap((cargo) => this.saveCargoInStorage(cargo)));
    }

    incluirCargo(cargo: CargoInterface): Observable<ResponseCargo> {
        return this.http
            .post<ResponseCargo>(`${environment.api.endpoint}/cargo`, cargo)
            .pipe(tap((response) => {
                if ((response.data.cargo_id !== undefined && response.data.cargo_id !== null)) {
                    cargo.cargo_id = response.data.cargo_id
                }
            }));
    }

    alterarCargo(cargo: CargoInterface, cargoId: string): Observable<CargoInterface> {
        return this.http
            .put<CargoInterface>(`${environment.api.endpoint}/cargo/${cargoId}`, cargo);
    }

    deletarCargo(idCargo: string): Observable<CargoInterface[]> {
        return this.http
            .delete<CargoInterface[]>(`${environment.api.endpoint}/cargo/${idCargo}`)
    }

    vincularFuncionarios(cargo: Cargo, funcionarios: Funcionario[]) {
        var listaIdFuncionarios: string[] = []
        cargo.funcionarios.forEach((funcionario) => {
            listaIdFuncionarios.push(funcionario.funcionario_id)
        })
        var listaIdFuncionariosNovos: string[] = []
        funcionarios.forEach((funcionario) => {
            listaIdFuncionariosNovos.push(funcionario.funcionario_id)
        })

        const [idsNovos, idsDeletados, idsExistentes] = ListaUtil.retornarDiferencaListas(listaIdFuncionariosNovos, listaIdFuncionarios)

        
        // vincular
        idsNovos.forEach((id: string) => {
            const funcionarioNovo = funcionarios.find((funcionario) => {
                console.log(funcionario.funcionario_id)
                return funcionario.funcionario_id === id
            })

            if (funcionarioNovo !== undefined) {
                const funcionarioInterface: FuncionarioInterface = {
                    user_id: funcionarioNovo.usuario.user_id,
                    cargo_id: cargo.cargo_id
                }

                this.funcionarioService.alterarFuncionario(funcionarioInterface, funcionarioNovo.funcionario_id).subscribe()
            }
        })

        // desvincular
        idsDeletados.forEach((id: string) => {
            const funcionarioDeletado = cargo.funcionarios.find((funcionario) => {
                return funcionario.funcionario_id === id
            })

            if (funcionarioDeletado !== undefined) {
                const funcionarioInterface: FuncionarioInterface = {
                    user_id: funcionarioDeletado.usuario.user_id,
                    cargo_id: null
                }

                this.funcionarioService.alterarFuncionario(funcionarioInterface, funcionarioDeletado.funcionario_id).subscribe()
            }
        })
    }

    vincularFuncionalidades(cargo: Cargo, funcionalidades: Funcionalidade[]) {
        var listaIdFuncionalidades: string[] = []
        cargo.funcionalidades.forEach((funcionalidade) => {
            listaIdFuncionalidades.push(funcionalidade.funcionalidade_id)
        })
        var listaIdFuncionalidadesNovos: string[] = []
        funcionalidades.forEach((funcionalidade) => {
            listaIdFuncionalidadesNovos.push(funcionalidade.funcionalidade_id)
        })

        const [idsNovos, idsDeletados, idsExistentes] = ListaUtil.retornarDiferencaListas(listaIdFuncionalidadesNovos, listaIdFuncionalidades)

        idsNovos.forEach((id: string) => {
            const associacao: AssociacaoFuncionalidadeCargo = {
                cargo_id: cargo.cargo_id,
                funcionalidade_id: id,
            }
            this.vincularFuncionalidade(associacao).subscribe()
        })

        idsDeletados.forEach((id: string) => {
            const associacao: AssociacaoFuncionalidadeCargo = {
                cargo_id: cargo.cargo_id,
                funcionalidade_id: id,
            }
            this.desvincularFuncionalidade(associacao).subscribe()
        })
    }

    vincularFuncionalidade(associacao: AssociacaoFuncionalidadeCargo): Observable<AssociacaoFuncionalidadeCargo> {
        return this.http
            .post<AssociacaoFuncionalidadeCargo>(`${environment.api.endpoint}/cargo-funcionalidade`, associacao);
    }

    desvincularFuncionalidade(associacao: AssociacaoFuncionalidadeCargo): Observable<AssociacaoFuncionalidadeCargo> {
        return this.http
            .delete<AssociacaoFuncionalidadeCargo>(`${environment.api.endpoint}/cargo-funcionalidade/${associacao.cargo_id}/${associacao.funcionalidade_id}`)
    }

    saveCargosInStorage(cargos: CargoInterface[]) {
        console.log('saveCargosInStorage')
        this.gerenciamentoRepository.update({ cargos: cargos });
    }

    saveCargoInStorage(cargo: CargoInterface): void {
        var cargos = this.gerenciamentoRepository.cargos()
        const indexCargo = cargos.findIndex((cargoStorage) => {
            return cargoStorage.cargo_id === cargo.cargo_id
        })

        if (indexCargo !== -1) {
            cargos[indexCargo] = cargo
        } else {
            cargos.push(cargo)
        }

        this.gerenciamentoRepository.update({ cargos: cargos });
    }

    removerCargoInStorage(idCargo: string) {
        var cargos = this.gerenciamentoRepository.cargos()
        const indexCargo = cargos.findIndex((cargoStorage) => {
            return cargoStorage.cargo_id === idCargo
        })

        if (indexCargo !== -1) {
            cargos.splice(indexCargo, 1)
        } 

        this.gerenciamentoRepository.update({ cargos: cargos });
    }
}