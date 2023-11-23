import { Injectable } from '@angular/core';
import { CARGO_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Cargo, CargoInterface } from './cargo.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CargoService {
    
    constructor(
        private gerenciamentoRepository: GerenciamentoRepository,
        private http: HttpClient,
    ) {
        
    }

    buscarTodosCargos(): Observable<CargoInterface[]>{
        return this.http
            .get<CargoInterface[]>(`${environment.api.endpoint}/cargo`)
            .pipe(tap((cargos) => this.saveCargosInStorage(cargos)));
    }

    buscarCargo(idCargo: string): Cargo | undefined {
        return CARGO_DATA.find((c) => {
            return c.cargo_id === idCargo
        })
    }

    incluirCargo(cargo: Cargo) {
        CARGO_DATA.push(cargo)
    }

    alterarCargo(cargo: Cargo) {
        var indexC = CARGO_DATA.findIndex((c) => {
            return c.cargo_id === cargo.cargo_id
        })
        if (indexC !== -1) {
            CARGO_DATA[indexC] = cargo
        } else {
            throw new Error('cargo nao encontrado')
        }
    }

    deletarCargo(idCargo: string) {
        var indexC = CARGO_DATA.findIndex((c) => {
            return c.cargo_id === idCargo
        })
        if (indexC !== -1) {
            CARGO_DATA.splice(indexC, 1)
        } else {
            throw new Error('cargo nao encontrado')
        }
    }
    
    saveCargosInStorage(cargos: CargoInterface[]) {
        this.gerenciamentoRepository.update({ cargos: cargos });
    }

    saveCargoInStorage(cargo: CargoInterface): void {
        var cargos = this.gerenciamentoRepository.cargos()
        const indexCargo = cargos.findIndex((cargo) => {
            return cargo.cargo_id === cargo.cargo_id
        })
        cargos[indexCargo] = cargo

        this.gerenciamentoRepository.update({ cargos: cargos });
    }

}
