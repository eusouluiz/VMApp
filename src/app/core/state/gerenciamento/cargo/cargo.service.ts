import { Injectable } from '@angular/core';
import { RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Cargo, CargoInterface } from './cargo.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Funcionario } from '../funcionario/funcionario.entity';
import { ListaUtil } from '../../../../shared/utilities/lista/lista.utility';

interface ResponseCargo {
    msg: string,
    data: CargoInterface,
}

interface AssociacaoFuncionarioCargo {
    id?: string,
    funcionario_id: string,
    cargo_id: string,
}

@Injectable({
    providedIn: 'root',
})
export class CargoService {

    constructor(
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
            .post<ResponseCargo>(`${environment.api.endpoint}/user`, cargo)
            .pipe(tap((response) => {
                if ((response.data.cargo_id !== undefined && response.data.cargo_id !== null)) {
                    cargo.cargo_id = response.data.cargo_id
                }
            }));
    }

    alterarCargo(cargo: CargoInterface, cargoId: string): Observable<CargoInterface> {
        return this.http
            .put<CargoInterface>(`${environment.api.endpoint}/user/${cargoId}`, cargo);
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

        // idsNovos.forEach((id: string) => {
        //     const associacao: AssociacaoFuncionarioCargo = {
        //         cargo_id: cargo.cargo_id,
        //         funcionario_id: id,
        //     }
        //     this.vincularFuncionario(associacao).subscribe()
        // })

        // idsDeletados.forEach((id: string) => {
        //     const associacao: AssociacaoFuncionarioCargo = {
        //         cargo_id: cargo.cargo_id,
        //         funcionario_id: id,
        //     }
        //     this.desvincularFuncionario(associacao).subscribe()
        // })
    }

    vincularFuncionario(associacao: AssociacaoFuncionarioCargo): Observable<AssociacaoFuncionarioCargo> {
        return this.http
            .post<AssociacaoFuncionarioCargo>(`${environment.api.endpoint}/funcionario-cargo`, associacao);
    }

    desvincularFuncionario(associacao: AssociacaoFuncionarioCargo): Observable<AssociacaoFuncionarioCargo> {
        return this.http
            .delete<AssociacaoFuncionarioCargo>(`${environment.api.endpoint}/funcionario-cargo/${associacao.funcionario_id}/${associacao.cargo_id}`)
    }

    saveCargosInStorage(cargos: CargoInterface[]) {
        console.log('saveCargosInStorage')
        this.gerenciamentoRepository.update({ cargos: cargos });
    }

    saveCargoInStorage(cargo: CargoInterface): void {
        console.log('saveCargoInStorage')
        var cargos = this.gerenciamentoRepository.cargos()
        const indexCargo = cargos.findIndex((cargo) => {
            return cargo.cargo_id === cargo.cargo_id
        })
        cargos[indexCargo] = cargo

        this.gerenciamentoRepository.update({ cargos: cargos });
    }
}