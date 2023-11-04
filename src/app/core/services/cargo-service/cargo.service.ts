import { Injectable } from '@angular/core';
import { CARGO_DATA, Cargo } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class CargoService {

    buscarTodosCargos(): Cargo[]{
        return CARGO_DATA
    }

    buscarCargo(idCargo: number): Cargo | undefined{
        return CARGO_DATA.find((c) => {
            return c.idCargo === idCargo
        })
    }

    incluirCargo(cargo: Cargo) {
        cargo.idCargo = CARGO_DATA[CARGO_DATA.length-1].idCargo + 1
        CARGO_DATA.push(cargo)
    }

    alterarCargo(cargo: Cargo) {
        var indexC = CARGO_DATA.findIndex((c) => {
            return c.idCargo === cargo.idCargo
        })
        if (indexC !== -1) {
            CARGO_DATA[indexC] = cargo
        } else {
            throw new Error('cargo nao encontrado')
        }
    }

    deletarCargo(idCargo: number) {
        var indexC = CARGO_DATA.findIndex((c) => {
            return c.idCargo === idCargo
        })
        if (indexC !== -1){
            CARGO_DATA.splice(indexC, 1)
        } else {
            throw new Error('cargo nao encontrado')
        }
    }

}