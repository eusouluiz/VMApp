import { Injectable } from '@angular/core';
import { CARGO_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Cargo } from './cargo.entity';

@Injectable({
  providedIn: 'root',
})
export class CargoService {

    buscarTodosCargos(): Cargo[]{
        return CARGO_DATA
    }

    buscarCargo(idCargo: string): Cargo | undefined{
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
        if (indexC !== -1){
            CARGO_DATA.splice(indexC, 1)
        } else {
            throw new Error('cargo nao encontrado')
        }
    }

}