import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface Cargo {
  nome: String,
  turma: String,
}

export interface Funcionario {
  idFuncionario: Number,
  idUsuario: Number,
  nome: String,
  cpf: String,
  telefone: String,
  cargos: Cargo[]
}

var a1: Cargo = {nome: 'cargo1', turma: 'turma1'}
var a2: Cargo = {nome: 'cargo2', turma: 'turma2'}

var FUNCIONARIO_DATA: Funcionario[] = [
  {
    idFuncionario: 0,
    idUsuario: 0,
    nome: 'Carlos r1',
    cpf: '123.456.789-00',
    telefone: '(41) 98822-2527',
    cargos: [a1, a2]
  },
  {
    idFuncionario: 1,
    idUsuario: 1,
    nome: 'Gabriel r2',
    cpf: '987.654.321-99',
    telefone: '(00) 12345-6789',
    cargos: [a1]
  },
  {
    idFuncionario: 2,
    idUsuario: 2,
    nome: 'Felipe r3',
    cpf: '333.666.999-369',
    telefone: '(12) 34567-8900',
    cargos: [a2]
  }
]

@Component({
  selector: 'app-gerenciamento-funcionario',
  templateUrl: './gerenciamento-funcionario.page.html',
  styleUrls: ['./gerenciamento-funcionario.page.scss'],
})
export class GerenciamentoFuncionarioPage implements OnInit {

  funcionarios: any

  constructor(
    private router: Router,
    ) { 
  }

  ngOnInit() {

    this.funcionarios = FUNCIONARIO_DATA
  }

  public navegarDetalheFuncionario(funcionario: Funcionario){
    const caminho: String = '/funcionario/' + funcionario.idFuncionario + '/detalhes'
    this.navegarPara(caminho)
  }
  
  public navegarCadastroFuncionario(){
    const caminho: String = '/funcionario/cadastro'
    this.navegarPara(caminho)
  }

  private navegarPara(rota: String){
    if (rota.substring(0, 1) !== '/') {
      rota = '/' + rota
    }
    const caminho: String = '/app/gerenciamento' + rota
    this.router.navigate([caminho])
  }

}
