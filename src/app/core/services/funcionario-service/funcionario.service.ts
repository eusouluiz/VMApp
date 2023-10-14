import { Injectable } from '@angular/core';
import { FUNCIONARIO_DATA, Funcionario } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {

    buscarTodosFuncionarios(): Funcionario[]{
        return FUNCIONARIO_DATA
    }

    buscarFuncionario(idFuncionario: number): Funcionario | undefined{
        return FUNCIONARIO_DATA.find((f) => {
            return f.idFuncionario === idFuncionario
        })
    } 

    incluirFuncionario(funcionario: Funcionario) {
        funcionario.idFuncionario = FUNCIONARIO_DATA[FUNCIONARIO_DATA.length-1].idFuncionario + 1
        FUNCIONARIO_DATA.push(funcionario)
    }

    alterarFuncionario(funcionario: Funcionario) {
        var indexF = FUNCIONARIO_DATA.findIndex((f) => {
            return f.idFuncionario === funcionario.idFuncionario
        })
        if (indexF !== -1) {
            FUNCIONARIO_DATA[indexF] = funcionario
        } else {
            throw new Error('funcionario nao encontrado')
        }
    }

    deletarFuncionario(idFuncionario: number) {
        var indexF = FUNCIONARIO_DATA.findIndex((f) => {
            return f.idFuncionario === idFuncionario
        })
        if (indexF !== -1){
            FUNCIONARIO_DATA.splice(indexF, 1)
        } else {
            throw new Error('funcionario nao encontrado')
        }
    }

}