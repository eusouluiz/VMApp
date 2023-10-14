import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { ALUNO_DATA, Aluno, RESPONSAVEL_DATA, Responsavel, responsavelVazio } from '../../../../shared/utilities/entidade/entidade.utility';

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
    private router: Router,
    private location: Location
    ) { 
      console.log(this.activatedRoute.snapshot.paramMap.get('id'))
      console.log(this.router.url.split('/').pop())

      this.definirModo()
      
      this.inicializarFormBuscaAluno()
      if (this.isModoDetalhes()) {
        var id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
        this.responsavel = this.resgatarResponsavel(id)
        this.inicializarTabelaAlunos()
      } else {
        this.responsavel = responsavelVazio()
        this.inicializarTabelaAlunos()
      }

      this.form = this.formBuilder.group({
        nome: [this.responsavel.nome, Validators.required],
        telefone: [this.responsavel.usuario.telefone, Validators.required],
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
    return responsavelVazio()
  }
  // ---- busca responsavel ----//

  
  // ---- controle botoes ----//

  eventoActions(ev:any){
    if (ev.detail.data === undefined) {
      return
    }
    const action = ev.detail.data.action
    console.log(action)

    if(action === 'delete'){
      this.deletarResponsavel()
    }
  }

  private deletarResponsavel(){
    console.log('responsavel deletado')
    this.retornaPagina()
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
      this.retornaPagina()
      return
    }

    this.modo = 'detalhes'

    this.form?.setValue({
      nome: this.responsavel.nome,
      telefone: this.responsavel.usuario.telefone,
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
    this.responsavel.usuario.telefone = this.form?.value.telefone
    this.responsavel.usuario.cpf = this.form?.value.cpf
    this.responsavel.usuario.senha = this.form?.value.senha

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
    this.limparCampoBusca()
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
    this.limparCampoBusca()
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
    this.responsavel.alunos = this.listaAlunosTabela.sort((a1, a2) => {
      if (a1.nome.toLowerCase().toLowerCase() > a2.nome.toLowerCase()){
        return 1
      } else if (a2.nome.toLowerCase() > a1.nome.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
    this.tabelaAlunos.renderRows()
  }

  navegarTelaAluno(id: Number){
    console.log('navegar tela aluno: ' + id)
    var rota
    if (id !== -1){
      rota = '/aluno/' + id + '/detalhes'
    } else {
      rota = '/aluno/cadastro'
    }
    this.navegarPara(rota) 
  }

  deletarAluno(id: Number){
    console.log('deletar: ' + id)
    const indexAluno = this.listaAlunosTabela.findIndex((a) => {
      return a.idAluno === id
    })
    if (indexAluno !== -1){
      this.listaAlunosTabela.splice(indexAluno, 1)
      this.tabelaAlunos.renderRows()
    }
  }

  // ---- controle alunos ----//

  private retornaPagina(){
    this.location.back()
  }
  
  private navegarPara(rota: String){
    if (rota.substring(0, 1) !== '/') {
      rota = '/' + rota
    }
    const caminho: String = '/app/gerenciamento' + rota
    this.router.navigate([caminho])
  }

}
