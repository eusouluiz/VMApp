import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


export interface Aluno {
  nome: String,
  turma: String,
}

export interface Responsavel {
  idResponsavel: Number,
  idUsuario: Number,
  nome: String,
  cpf: String,
  telefone: String,
  alunos: Aluno[]
}

var a1: Aluno = {nome: 'aluno1', turma: 'turma1'}
var a2: Aluno = {nome: 'aluno2', turma: 'turma2'}

var RESPONSAVEL_DATA: Responsavel[] = [
  {
    idResponsavel: 0,
    idUsuario: 0,
    nome: 'Carlos r1',
    cpf: '123.456.789-00',
    telefone: '(41) 98822-2527',
    alunos: [a1, a2]
  },
  {
    idResponsavel: 1,
    idUsuario: 1,
    nome: 'Gabriel r2',
    cpf: '987.654.321-99',
    telefone: '(00) 12345-6789',
    alunos: [a1]
  },
  {
    idResponsavel: 2,
    idUsuario: 2,
    nome: 'Felipe r3',
    cpf: '333.666.999-369',
    telefone: '(12) 34567-8900',
    alunos: [a2]
  }
]

const r = [{nome:'a', telefone:'1'}, {nome:'b', telefone:'2'}]


@Component({
  selector: 'app-gerenciamento-responsavel',
  templateUrl: './gerenciamento-responsavel.page.html',
  styleUrls: ['./gerenciamento-responsavel.page.scss'],
})
export class GerenciamentoResponsavelPage implements OnInit {

  colunasResponsavel: string[] = ['nome', 'telefone']
  dataSource = new MatTableDataSource(RESPONSAVEL_DATA)
  responsaveis: any

  constructor(
    private router: Router,
    ) { 
  }

  ngOnInit() {

    this.responsaveis = RESPONSAVEL_DATA
  }

  filtro(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public navegarDetalheResponsavel(responsavel: Responsavel){
    const caminho: String = '/responsavel/' + responsavel.idResponsavel + '/detalhes'
    this.navegarPara(caminho)
  }
  
  public navegarCadastroResponsavel(){
    const caminho: String = '/responsavel/cadastro'
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
