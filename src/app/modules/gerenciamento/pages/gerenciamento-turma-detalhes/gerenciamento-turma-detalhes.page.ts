import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


export interface Aluno {
  idAluno: Number,
  nome: String,
}

export interface Turma {
  idTurma: Number,
  nome: String,
  alunos: Aluno[]
}

var ALUNO_DATA: Aluno[] = [
  {idAluno: 0, nome: 'Gabriel a1',},
  {idAluno: 1, nome: 'Rafael a2',},
  {idAluno: 2, nome: 'Augusto a3',},
  {idAluno: 3, nome: 'Luiz a4',},
  {idAluno: 4, nome: 'Giacomo a5',},
]

var TURMA_DATA: Turma[] = [
  {idTurma: 0, nome: 'Turma A', alunos: [ALUNO_DATA[0], ALUNO_DATA[1]]},
  {idTurma: 1, nome: 'Turma B', alunos: [ALUNO_DATA[2], ALUNO_DATA[1]]},
  {idTurma: 2, nome: 'Turma C', alunos: [ALUNO_DATA[4], ALUNO_DATA[0]]},
]

@Component({
  selector: 'app-gerenciamento-turma-detalhes',
  templateUrl: './gerenciamento-turma-detalhes.page.html',
  styleUrls: ['./gerenciamento-turma-detalhes.page.scss'],
})
export class GerenciamentoTurmaDetalhesPage implements OnInit {
  modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'

  turma: Turma

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
        this.turma = this.resgatarTurma(id)
        this.inicializarTabelaAlunos()
      } else {
        this.turma = this.turmaVazio()
        this.inicializarTabelaAlunos()
      }

      this.form = this.formBuilder.group({
        nome: [this.turma.nome, Validators.required],
      })
      this.inicializarFormBuscaAluno()
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

  // ---- busca turma ----//
  private resgatarTurma(id: Number): Turma{
    for (let i = 0; i < TURMA_DATA.length; i++) {
      const turma = TURMA_DATA[i];
      if (turma.idTurma === id) {
        return turma
      }
    }
    return this.turmaVazio()
  }

  private turmaVazio(): Turma{
    return {
      idTurma: 0,
      nome: '',
      alunos: []
    }
  }
  // ---- busca turma ----//

  
  // ---- controle botoes ----//

  eventoActions(ev:any){
    const action = ev.detail.data.action
    console.log(action)

    if(action === 'delete'){
      this.deletarTurma()
    }
  }

  private deletarTurma(){
    console.log('turma deletado')
    this.navegarPara('/turma')
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
      this.navegarPara('/turma')
      return
    }

    this.modo = 'detalhes'

    this.form?.setValue({
      nome: this.turma.nome,
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

    this.turma.nome = this.form?.value.nome

    this.atualizarAlunos()

    this.modo = 'detalhes'
    this.form?.disable()


  }
  // ---- controle botoes ----//

  // ---- controle alunos ----//

  formBuscaAluno!: UntypedFormGroup
  
  inicializarFormBuscaAluno() {
    this.formBuscaAluno = this.formBuilder.group({
      busca: ''
    })
  }

  //nome colunas
  colunasAluno: string[] = ['nome', 'acao']
  listaAlunosBusca: Aluno[] = ALUNO_DATA.slice()
  nomeAlunosBusca: String[] = this.getNomeAlunosBusca(this.listaAlunosBusca)

  listaAlunosTabela!: Aluno[]

  @ViewChild(MatTable)
  tabelaAlunos!: MatTable<Aluno>;

  private inicializarTabelaAlunos(){
    this.listaAlunosTabela = this.turma.alunos.slice()
    this.listaAlunosBusca = ALUNO_DATA.slice()
    this.nomeAlunosBusca = this.getNomeAlunosBusca(this.listaAlunosBusca)
  }

  private getNomeAlunosBusca(lista: Aluno[]): String[]{
    var nomes: String[] = []
    lista.forEach(turma => {
      nomes.push(turma.nome)
    });
    return nomes
  }

  adicionarAluno(valor: number){
    console.log('adicionando turma')
    console.log(valor)

    if (valor === -1){
      this.navegarTelaAluno(valor)
      return
    }
    
    const turma = this.listaAlunosBusca[valor]
    console.log(turma)

    this.listaAlunosTabela.push(turma)
    this.tabelaAlunos.renderRows()

    this.removeAlunoDaLista(valor)
  }

  limparCampoBusca() {
    this.formBuscaAluno.setValue({
      busca: ''
    })
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
    this.turma.alunos = this.listaAlunosTabela.sort((a1, a2) => {
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
    console.log('cadastro de turma')
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
