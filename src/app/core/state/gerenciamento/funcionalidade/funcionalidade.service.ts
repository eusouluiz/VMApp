import { Injectable } from '@angular/core';
import { CARGO_DATA, FUNCIONALIDADE_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Funcionalidade } from './funcionalidade.entity';

@Injectable({
    providedIn: 'root',
})
export class FuncionalidadeService {

    buscarTodosFuncionalidades(): Funcionalidade[] {
        return FUNCIONALIDADE_DATA
    }

    buscarFuncionalidade(idFuncionalidade: string): Funcionalidade | undefined {
        return FUNCIONALIDADE_DATA.find((f) => {
            return f.id === idFuncionalidade
        })
    }

    buscarFuncionalidadesCargo(idCargo: string): Funcionalidade[] | undefined {
        return FUNCIONALIDADE_DATA
    }
}