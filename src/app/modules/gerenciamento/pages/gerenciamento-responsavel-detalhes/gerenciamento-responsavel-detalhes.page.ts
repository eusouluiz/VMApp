import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';


export interface Aluno {
  nome: String,
  turma: String,
}

export interface Responsavel {
  idResponsavel: Number,
  idUsuario: Number,
  nome: String,
  usuario: Usuario,
  telefone: String,
  alunos: Aluno[]
}

export interface Usuario {
  cpf: String,
  senha: String,
}

var a1: Aluno = {nome: 'aluno1', turma: 'turma1'}
var a2: Aluno = {nome: 'aluno2', turma: 'turma2'}

var RESPONSAVEL_DATA: Responsavel[] = [
  {
    idResponsavel: 0,
    idUsuario: 0,
    nome: 'Carlos r1',
    usuario: {cpf: '123.456.789-00', senha: '12345678',},
    telefone: '(41) 98822-2527',
    alunos: [a1, a2]
  },
  {
    idResponsavel: 1,
    idUsuario: 1,
    nome: 'Gabriel r2',
    usuario: {cpf: '987.654.321-99', senha: '12345678',},
    telefone: '(00) 12345-6789',
    alunos: [a1]
  },
  {
    idResponsavel: 2,
    idUsuario: 2,
    nome: 'Felipe r3',
    usuario: {cpf: '333.666.999-369', senha: '12345678',},
    telefone: '(12) 34567-8900',
    alunos: [a2]
  }
]

var ALUNO_DATA = [
  {nome: 'aluno3', turma: 'turma3'},
  {nome: 'aluno4', turma: 'turma4'},
  {nome: 'aluno5', turma: 'turma5'},
  {nome: 'aluno6', turma: 'turma6'},
  {nome: 'aluno7', turma: 'turma7'},
  {nome: 'aluno8', turma: 'turma8'},
]

@Component({
  selector: 'app-gerenciamento-responsavel-detalhes',
  templateUrl: './gerenciamento-responsavel-detalhes.page.html',
  styleUrls: ['./gerenciamento-responsavel-detalhes.page.scss'],
})
export class GerenciamentoResponsavelDetalhesPage implements OnInit {

  modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'

  colunasAluno: string[] = ['nome', 'turma', 'acao']
  responsavel: Responsavel = this.responsavelVazio()

  form: UntypedFormGroup | undefined;

  @ViewChild(MatTable)
  table!: MatTable<Aluno>;

  actionDeletar = [
    {
      text: 'Deletar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Não',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ]

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute
    ) { 
      console.log(this.activatedRoute.snapshot.paramMap.get('id'))
      
      var id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
      this.responsavel = this.resgatarResponsavel(id)

      this.form = this.formBuilder.group({
        nome: [this.responsavel.nome, Validators.required],
        telefone: [this.responsavel.telefone, Validators.required],
        cpf: [this.responsavel.usuario.cpf, Validators.required],
        senha: [this.responsavel.usuario.senha, Validators.required],
      })
      this.form.disable()
  }

  ngOnInit() {
  }

  iniciarEdicao(){
    console.log('edicao iniciada')
    console.log(this.form)
    this.modo = 'editar'
    this.form?.enable()
  }

  cancelar(){
    console.log('cancelado')
    this.modo = 'detalhes'
    this.form?.setValue({
      nome: this.responsavel.nome,
      telefone: this.responsavel.telefone,
      cpf: this.responsavel.usuario.cpf,
      senha: this.responsavel.usuario.senha,
    })
    this.form?.disable()
  }

  salvar(){
    console.log('salvado')
    console.log(this.form)
    console.log('nome: ' + this.form?.value.nome)
    console.log('telefone: ' + this.form?.value.telefone)
    console.log('cpf: ' + this.form?.value.cpf)
    console.log('cpf: ' + this.form?.value.senha)
    this.modo = 'detalhes'
    this.form?.disable()
  }

  adicionarAluno(){
    console.log('adicionando aluno')
    const a: Aluno = {nome: 'teste', turma: 'teste'}

    this.responsavel.alunos.push(a)
    this.table.renderRows()
  }

  resgatarResponsavel(id: Number): Responsavel{
    for (let i = 0; i < RESPONSAVEL_DATA.length; i++) {
      const responsavel = RESPONSAVEL_DATA[i];
      if (responsavel.idResponsavel === id) {
        return responsavel
      }
    }
    return this.responsavelVazio()
  }

  private responsavelVazio(): Responsavel{
    return {
      idResponsavel: 0,
      idUsuario: 0,
      nome: '',
      usuario: {cpf: '', senha: '',},
      telefone: '',
      alunos: []
    }
  }

}
