import { Injectable } from '@angular/core';
import { FUNCIONALIDADE_DATA, Funcionalidade } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class FuncionalidadeService {

    buscarTodosFuncionalidades(): Funcionalidade[]{
        return FUNCIONALIDADE_DATA
    }

    buscarFuncionalidade(idFuncionalidade: number): Funcionalidade | undefined{
        return FUNCIONALIDADE_DATA.find((f) => {
            return f.idFuncionalidade === idFuncionalidade
        })
    }
}