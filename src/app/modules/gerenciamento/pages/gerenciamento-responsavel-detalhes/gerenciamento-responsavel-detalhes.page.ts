import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


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

  responsavel: Responsavel

  form: UntypedFormGroup | undefined;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { 
      console.log(this.activatedRoute.snapshot.paramMap.get('id'))
      console.log(this.router.url.split('/').pop())

      this.definirModo()
      
      if (this.isModoDetalhes()) {
        var id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
        this.responsavel = this.resgatarResponsavel(id)
        this.inicializarTabelaAlunos()
      } else {
        this.responsavel = this.responsavelVazio()
        this.inicializarTabelaAlunos()
      }

      this.form = this.formBuilder.group({
        nome: [this.responsavel.nome, Validators.required],
        telefone: [this.responsavel.telefone, Validators.required],
        cpf: [this.responsavel.usuario.cpf, Validators.required],
        senha: [this.responsavel.usuario.senha, Validators.required],
      })
      if (this.isModoDetalhes()) {
        this.form.disable()
      }
  }

  ngOnInit() {
  }

  // ---- controle modo pagina ----//

  private definirModo(){
    // pega ultimo termo do endpoint
    const rota = this.router.url.split('/').pop()

    if (rota === 'cadastro') {
      this.modo = 'cadastrar'
    }
  }

  isModoDetalhes(){
    return this.modo === 'detalhes'
  }

  isModoEditar(){
    return this.modo === 'editar'
  }

  isModoCadastrar(){
    return this.modo === 'cadastrar'
  }

  // ---- define modo pagina ----//

  // ---- busca responsavel ----//
  private resgatarResponsavel(id: Number): Responsavel{
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
  // ---- busca responsavel ----//

  
  // ---- controle botoes ----//
  

  //deletar
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

  eventoActions(ev:any){
    const action = ev.detail.data.action
    console.log(action)

    if(action === 'delete'){
      this.deletarResponsavel()
    }
  }

  private deletarResponsavel(){
    console.log('responsavel deletado')
    this.navegarPara('/responsavel')
  }

  //editar
  iniciarEdicao(){
    console.log('edicao iniciada')
    console.log(this.form)
    this.modo = 'editar'
    this.form?.enable()

    this.inicializarTabelaAlunos()
  }

  //cancelar edicao
  cancelar(){
    console.log('cancelado')

    if (this.isModoCadastrar()) {
      this.navegarPara('/responsavel')
      return
    }

    this.modo = 'detalhes'

    this.form?.setValue({
      nome: this.responsavel.nome,
      telefone: this.responsavel.telefone,
      cpf: this.responsavel.usuario.cpf,
      senha: this.responsavel.usuario.senha,
    })
    this.form?.disable()

    this.inicializarTabelaAlunos()
    this.tabelaAlunos.renderRows()
  }

  //salvar edicao
  salvar(){
    console.log('salvado')
    
    console.log('nome: ' + this.form?.value.nome)
    console.log('telefone: ' + this.form?.value.telefone)
    console.log('cpf: ' + this.form?.value.cpf)
    console.log('cpf: ' + this.form?.value.senha)

    this.responsavel.nome = this.form?.value.nome
    this.responsavel.telefone = this.form?.value.telefone
    this.responsavel.usuario.cpf = this.form?.value.cpf
    this.responsavel.usuario.senha = this.form?.value.senha

    this.atualizarAlunos()

    this.modo = 'detalhes'
    this.form?.disable()


  }
  // ---- controle botoes ----//

  // ---- controle alunos ----//

  //nome colunas
  colunasAluno: string[] = ['nome', 'turma', 'acao']
  listaAlunosBusca: Aluno[] = ALUNO_DATA.slice()
  nomeAlunosBusca: String[] = this.getNomeAlunosBusca(this.listaAlunosBusca)

  listaAlunosTabela!: Aluno[]

  @ViewChild(MatTable)
  tabelaAlunos!: MatTable<Aluno>;

  private inicializarTabelaAlunos(){
    this.listaAlunosTabela = this.responsavel.alunos.slice()
    this.listaAlunosBusca = ALUNO_DATA.slice()
    this.nomeAlunosBusca = this.getNomeAlunosBusca(this.listaAlunosBusca)
  }

  private getNomeAlunosBusca(lista: Aluno[]): String[]{
    var nomes: String[] = []
    lista.forEach(aluno => {
      nomes.push(aluno.nome)
    });
    return nomes
  }

  adicionarAluno(valor: number){
    console.log('adicionando aluno')
    console.log(valor)

    if (valor === -1){
      this.navegarTelaAluno(valor)
      return
    }
    
    const aluno = this.listaAlunosBusca[valor]
    console.log(aluno)

    this.listaAlunosTabela.push(aluno)
    this.tabelaAlunos.renderRows()

    this.removeAlunoDaLista(valor)
  }

  private removeAlunoDaLista(index: number){
    for (let i = 0; i < this.listaAlunosBusca.length; i++) {
      if (index === i){
        this.listaAlunosBusca.splice(index, 1)
        this.nomeAlunosBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarAlunos(){
    this.responsavel.alunos = this.listaAlunosTabela.sort((a1, a2) => {
      if (a1.nome > a2.nome){
        return 1
      } else if (a2.nome > a1.nome) {
        return -1
      } else {
        return 0
      }
    })
    this.tabelaAlunos.renderRows()
  }

  navegarTelaAluno(id: Number){
    console.log('cadastro de aluno')
  }
  // ---- controle alunos ----//

  
  private navegarPara(rota: String){
    if (rota.substring(0, 1) !== '/') {
      rota = '/' + rota
    }
    const caminho: String = '/app/gerenciamento' + rota
    this.router.navigate([caminho])
  }

}
