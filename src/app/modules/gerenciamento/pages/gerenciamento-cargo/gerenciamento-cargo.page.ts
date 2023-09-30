import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface Funcionalidade {
  idFuncionalidade: String,
  nome: String,
}

export interface Cargo {
  idCargo: Number,
  nome: String,
  funcionalidades: Funcionalidade[]
}

var a1: Funcionalidade = {idFuncionalidade: 'funcionalidade1', nome: 'nome1'}
var a2: Funcionalidade = {idFuncionalidade: 'funcionalidade2', nome: 'nome2'}

var RESPONSAVEL_DATA: Cargo[] = [
  {
    idCargo: 0,
    nome: 'Cargo1',
    funcionalidades: [a1, a2]
  },
  {
    idCargo: 1,
    nome: 'Cargo2',
    funcionalidades: [a1]
  },
  {
    idCargo: 2,
    nome: 'Cargo3',
    funcionalidades: [a2]
  }
]

@Component({
  selector: 'app-gerenciamento-cargo',
  templateUrl: './gerenciamento-cargo.page.html',
  styleUrls: ['./gerenciamento-cargo.page.scss'],
})
export class GerenciamentoCargoPage implements OnInit {

  cargos: any

  constructor(
    private router: Router,
    ) { 
  }

  ngOnInit() {

    this.cargos = RESPONSAVEL_DATA
  }

  public navegarDetalheCargo(cargo: Cargo){
    const caminho: String = '/cargo/' + cargo.idCargo + '/detalhes'
    this.navegarPara(caminho)
  }
  
  public navegarCadastroCargo(){
    const caminho: String = '/cargo/cadastro'
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
