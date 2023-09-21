import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


export interface Aluno {
  idAluno: Number,
  cgm: String,
  nome: String,
  turma: Turma | null,
  responsaveis: Responsavel[]
}

export interface Turma {
  idTurma: Number,
  nome: String,
}

export interface Responsavel {
  idResponsavel: Number,
  nome: String,
  telefone: String,
}

var RESPONSAVEL_DATA: Responsavel[] = [
  {idResponsavel: 0, nome: 'Carlos r1', telefone: '(41) 98822-2527'},
  {idResponsavel: 1, nome: 'Gabriel r2', telefone: '(00) 12345-6789'},
  {idResponsavel: 2, nome: 'Felipe r3', telefone: '(12) 34567-8900'}
]

var TURMA_DATA: Turma[] = [
  {idTurma: 0, nome: 'Turma A'},
  {idTurma: 1, nome: 'Turma B'},
  {idTurma: 2, nome: 'Turma C'}
]

var ALUNO_DATA: Aluno[] = [
  {
    idAluno: 0,
    cgm: '123456789',
    nome: 'Gabriel a1',
    turma: TURMA_DATA[0],
    responsaveis: [RESPONSAVEL_DATA[0]]
  },
  {
    idAluno: 1,
    cgm: '987654321',
    nome: 'Caio a2',
    turma: TURMA_DATA[1],
    responsaveis: [RESPONSAVEL_DATA[1]]
  },
  {
    idAluno: 2,
    cgm: '000000000',
    nome: 'Luiz a3',
    turma: TURMA_DATA[2],
    responsaveis: [RESPONSAVEL_DATA[2]]
  },
]

@Component({
  selector: 'app-gerenciamento-aluno-detalhes',
  templateUrl: './gerenciamento-aluno-detalhes.page.html',
  styleUrls: ['./gerenciamento-aluno-detalhes.page.scss'],
})
export class GerenciamentoAlunoDetalhesPage implements OnInit {
  modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'

  aluno: Aluno

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
        this.aluno = this.resgatarAluno(id)
        this.inicializarTabelaResponsaveis()
      } else {
        this.aluno = this.alunoVazio()
        this.inicializarTabelaResponsaveis()
      }

      this.form = this.formBuilder.group({
        nome: [this.aluno.nome, Validators.required],
        cgm: [this.aluno.cgm, Validators.required],
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

  // ---- busca aluno ----//
  private resgatarAluno(id: Number): Aluno{
    for (let i = 0; i < ALUNO_DATA.length; i++) {
      const aluno = ALUNO_DATA[i];
      if (aluno.idAluno === id) {
        return aluno
      }
    }
    return this.alunoVazio()
  }

  private alunoVazio(): Aluno{
    return {
      idAluno: 0,
      cgm: '',
      nome: '',
      turma: null,
      responsaveis: []
    }
  }
  // ---- busca aluno ----//

  
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
      this.deletarAluno()
    }
  }

  private deletarAluno(){
    console.log('aluno deletado')
    this.navegarPara('/aluno')
  }

  //editar
  iniciarEdicao(){
    console.log('edicao iniciada')
    console.log(this.form)
    this.modo = 'editar'
    this.form?.enable()

    this.inicializarTabelaResponsaveis()
  }

  //cancelar edicao
  cancelar(){
    console.log('cancelado')

    if (this.isModoCadastrar()) {
      this.navegarPara('/aluno')
      return
    }

    this.modo = 'detalhes'

    this.form?.setValue({
      nome: this.aluno.nome,
      cgm: this.aluno.cgm,
    })
    this.form?.disable()

    this.inicializarTabelaResponsaveis()
    this.tabelaResponsaveis.renderRows()
  }

  //salvar edicao
  salvar(){
    console.log('salvado')
    
    console.log('nome: ' + this.form?.value.nome)
    console.log('telefone: ' + this.form?.value.telefone)
    console.log('cpf: ' + this.form?.value.cpf)
    console.log('cpf: ' + this.form?.value.senha)

    this.aluno.nome = this.form?.value.nome
    this.aluno.cgm = this.form?.value.cgm

    this.atualizarResponsaveis()

    this.modo = 'detalhes'
    this.form?.disable()


  }
  // ---- controle botoes ----//

  // ---- controle responsaveis ----//

  //nome colunas
  colunasResponsavel: string[] = ['nome', 'telefone', 'acao']
  listaResponsaveisBusca: Responsavel[] = RESPONSAVEL_DATA.slice()
  nomeResponsaveisBusca: String[] = this.getNomeResponsaveisBusca(this.listaResponsaveisBusca)

  listaResponsaveisTabela!: Responsavel[]

  @ViewChild(MatTable)
  tabelaResponsaveis!: MatTable<Responsavel>;

  private inicializarTabelaResponsaveis(){
    this.listaResponsaveisTabela = this.aluno.responsaveis.slice()
    this.listaResponsaveisBusca = RESPONSAVEL_DATA.slice()
    this.nomeResponsaveisBusca = this.getNomeResponsaveisBusca(this.listaResponsaveisBusca)
  }

  private getNomeResponsaveisBusca(lista: Responsavel[]): String[]{
    var nomes: String[] = []
    lista.forEach(aluno => {
      nomes.push(aluno.nome)
    });
    return nomes
  }

  adicionarResponsavel(valor: number){
    console.log('adicionando aluno')
    console.log(valor)

    if (valor === -1){
      this.navegarTelaResponsavel(valor)
      return
    }
    
    const aluno = this.listaResponsaveisBusca[valor]
    console.log(aluno)

    this.listaResponsaveisTabela.push(aluno)
    this.tabelaResponsaveis.renderRows()

    this.removeResponsavelDaLista(valor)
  }

  private removeResponsavelDaLista(index: number){
    for (let i = 0; i < this.listaResponsaveisBusca.length; i++) {
      if (index === i){
        this.listaResponsaveisBusca.splice(index, 1)
        this.nomeResponsaveisBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarResponsaveis(){
    this.aluno.responsaveis = this.listaResponsaveisTabela.sort((a1, a2) => {
      if (a1.nome > a2.nome){
        return 1
      } else if (a2.nome > a1.nome) {
        return -1
      } else {
        return 0
      }
    })
    this.tabelaResponsaveis.renderRows()
  }

  navegarTelaResponsavel(id: Number){
    console.log('cadastro de aluno')
  }
  // ---- controle responsaveis ----//

  
  private navegarPara(rota: String){
    if (rota.substring(0, 1) !== '/') {
      rota = '/' + rota
    }
    const caminho: String = '/app/gerenciamento' + rota
    this.router.navigate([caminho])
  }

}
