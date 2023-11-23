import { Injectable } from '@angular/core';
import { FUNCIONARIO_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Funcionario } from './funcionario.entity';

@Injectable({
    providedIn: 'root',
})
export class FuncionarioService {

    buscarTodosFuncionarios(): Funcionario[] {
        return FUNCIONARIO_DATA
    }

    buscarFuncionario(idFuncionario: string): Funcionario | undefined {
        return FUNCIONARIO_DATA.find((f) => {
            return f.funcionario_id === idFuncionario
        })
    }

    incluirFuncionario(funcionario: Funcionario) {
        FUNCIONARIO_DATA.push(funcionario)
    }

    alterarFuncionario(funcionario: Funcionario) {
        var indexF = FUNCIONARIO_DATA.findIndex((f) => {
            return f.funcionario_id === funcionario.funcionario_id
        })
        if (indexF !== -1) {
            FUNCIONARIO_DATA[indexF] = funcionario
        } else {
            throw new Error('funcionario nao encontrado')
        }
    }

    deletarFuncionario(idFuncionario: string) {
        var indexF = FUNCIONARIO_DATA.findIndex((f) => {
            return f.funcionario_id === idFuncionario
        })
        if (indexF !== -1) {
            FUNCIONARIO_DATA.splice(indexF, 1)
        } else {
            throw new Error('funcionario nao encontrado')
        }
    }

}