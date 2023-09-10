import { Component, OnInit } from '@angular/core';
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

const ALUNO_DATA: Aluno[] = [
  {nome: 'aluno1', turma: 'turma1'},
  {nome: 'aluno2', turma: 'turma2'},
]

@Component({
  selector: 'app-gerenciamento-responsavel',
  templateUrl: './gerenciamento-responsavel.page.html',
  styleUrls: ['./gerenciamento-responsavel.page.scss'],
})
export class GerenciamentoResponsavelPage implements OnInit {

  colunasAluno: string[] = ['nome', 'turma', 'acao']

  responsaveis: any

  constructor(
    private router: Router,
    ) { 
  }

  ngOnInit() {

    var a1: Aluno = {nome: 'aluno1', turma: 'turma1'}
    var a2: Aluno = {nome: 'aluno2', turma: 'turma2'}

    var r1: Responsavel = {
      idResponsavel: 0,
      idUsuario: 0,
      nome: 'Carlos r1',
      cpf: '123.456.789-00',
      telefone: '(41) 98822-2527',
      alunos: [a1, a2]
    }
    var r2: Responsavel = {
      idResponsavel: 1,
      idUsuario: 1,
      nome: 'Gabriel r2',
      cpf: '987.654.321-99',
      telefone: '(00) 12345-6789',
      alunos: [a1]
    }
    var r3: Responsavel = {
      idResponsavel: 2,
      idUsuario: 2,
      nome: 'Felipe r3',
      cpf: '333.666.999-369',
      telefone: '(12) 34567-8900',
      alunos: [a2]
    }

    this.responsaveis = [r1, r2, r3]
  }

  public navegaPara(rota: String){
    if (rota.substring(0, 1) !== '/') {
      rota = '/' + rota
    }
    const caminho: String = '/app/gerenciamento/responsavel' + rota
    this.router.navigate([caminho])
  }

}
