import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


export interface Funcionario {
  idFuncionario: Number,
  nome: String,
}

export interface Cargo {
  idCargo: Number,
  nome: String,
  funcionarios: Funcionario[]
}

var FUNCIONARIO_DATA: Funcionario[] = [
  {idFuncionario: 0, nome: 'Gabriel f1',},
  {idFuncionario: 1, nome: 'Edir f2',},
  {idFuncionario: 2, nome: 'Matheus f3',},
  {idFuncionario: 3, nome: 'Augusto f4',},
  {idFuncionario: 4, nome: 'Gustavo f5',},
]

var CARGO_DATA: Cargo[] = [
  {idCargo: 0, nome: 'Cargo A', funcionarios: [FUNCIONARIO_DATA[0], FUNCIONARIO_DATA[1]]},
  {idCargo: 1, nome: 'Cargo B', funcionarios: [FUNCIONARIO_DATA[2], FUNCIONARIO_DATA[1]]},
  {idCargo: 2, nome: 'Cargo C', funcionarios: [FUNCIONARIO_DATA[4], FUNCIONARIO_DATA[0]]},
]

@Component({
  selector: 'app-gerenciamento-cargo-detalhes',
  templateUrl: './gerenciamento-cargo-detalhes.page.html',
  styleUrls: ['./gerenciamento-cargo-detalhes.page.scss'],
})
export class GerenciamentoCargoDetalhesPage implements OnInit {
  modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'

  cargo: Cargo

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
      
      this.inicializarFormBuscaFuncionario()
      if (this.isModoDetalhes()) {
        var id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
        this.cargo = this.resgatarCargo(id)
        this.inicializarTabelaFuncionarios()
      } else {
        this.cargo = this.cargoVazio()
        this.inicializarTabelaFuncionarios()
      }

      this.form = this.formBuilder.group({
        nome: [this.cargo.nome, Validators.required],
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

  // ---- busca cargo ----//
  private resgatarCargo(id: Number): Cargo{
    for (let i = 0; i < CARGO_DATA.length; i++) {
      const cargo = CARGO_DATA[i];
      if (cargo.idCargo === id) {
        return cargo
      }
    }
    return this.cargoVazio()
  }

  private cargoVazio(): Cargo{
    return {
      idCargo: 0,
      nome: '',
      funcionarios: []
    }
  }
  // ---- busca cargo ----//

  
  // ---- controle botoes ----//

  eventoActions(ev:any){
    if (ev.detail.data === undefined) {
      return
    }
    const action = ev.detail.data.action
    console.log(action)

    if(action === 'delete'){
      this.deletarCargo()
    }
  }

  private deletarCargo(){
    console.log('cargo deletado')
    this.retornaPagina()
  }

  //editar
  iniciarEdicao(){
    console.log('edicao iniciada')
    console.log(this.form)
    this.modo = 'editar'
    this.form?.enable()

    this.inicializarTabelaFuncionarios()
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
      nome: this.cargo.nome,
    })
    this.form?.disable()

    this.inicializarTabelaFuncionarios()
    this.tabelaFuncionarios.renderRows()
  }

  //salvar edicao
  salvar(){
    console.log('salvado')
    
    console.log('nome: ' + this.form?.value.nome)
    console.log('telefone: ' + this.form?.value.telefone)
    console.log('cpf: ' + this.form?.value.cpf)
    console.log('cpf: ' + this.form?.value.senha)

    this.cargo.nome = this.form?.value.nome

    this.atualizarFuncionarios()

    this.modo = 'detalhes'
    this.form?.disable()


  }
  // ---- controle botoes ----//

  // ---- controle funcionarios ----//

  formBuscaFuncionario!: UntypedFormGroup
  
  inicializarFormBuscaFuncionario() {
    this.formBuscaFuncionario = this.formBuilder.group({
      busca: ''
    })
  }

  //nome colunas
  colunasFuncionario: string[] = ['nome', 'acao']
  listaFuncionariosBusca: Funcionario[] = FUNCIONARIO_DATA.slice()
  nomeFuncionariosBusca: String[] = this.getNomeFuncionariosBusca(this.listaFuncionariosBusca)

  listaFuncionariosTabela!: Funcionario[]

  @ViewChild(MatTable)
  tabelaFuncionarios!: MatTable<Funcionario>;

  private inicializarTabelaFuncionarios(){
    this.listaFuncionariosTabela = this.cargo.funcionarios.slice()
    this.listaFuncionariosBusca = FUNCIONARIO_DATA.slice()
    this.nomeFuncionariosBusca = this.getNomeFuncionariosBusca(this.listaFuncionariosBusca)
    this.limparCampoBusca()
  }

  private getNomeFuncionariosBusca(lista: Funcionario[]): String[]{
    var nomes: String[] = []
    lista.forEach(cargo => {
      nomes.push(cargo.nome)
    });
    return nomes
  }

  adicionarFuncionario(valor: number){
    console.log('adicionando cargo')
    console.log(valor)

    if (valor === -1){
      this.navegarTelaFuncionario(valor)
      return
    }
    
    const cargo = this.listaFuncionariosBusca[valor]
    console.log(cargo)

    this.listaFuncionariosTabela.push(cargo)
    this.tabelaFuncionarios.renderRows()

    this.removeFuncionarioDaLista(valor)
  }

  limparCampoBusca() {
    this.formBuscaFuncionario.setValue({
      busca: ''
    })
  }

  private removeFuncionarioDaLista(index: number){
    for (let i = 0; i < this.listaFuncionariosBusca.length; i++) {
      if (index === i){
        this.listaFuncionariosBusca.splice(index, 1)
        this.nomeFuncionariosBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarFuncionarios(){
    this.cargo.funcionarios = this.listaFuncionariosTabela.sort((f1, f2) => {
      if (f1.nome.toLowerCase() > f2.nome.toLowerCase()){
        return 1
      } else if (f2.nome.toLowerCase() > f1.nome.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
    this.tabelaFuncionarios.renderRows()
  }

  navegarTelaFuncionario(id: Number){
    console.log('navegar tela funcionario: ' + id)
    var rota
    if (id !== -1){
      rota = '/funcionario/' + id + '/detalhes'
    } else {
      rota = '/funcionario/cadastro'
    }
    this.navegarPara(rota) 
  }

  deletarFuncionario(id: Number){
    console.log('deletar: ' + id)
    const indexFuncionario = this.listaFuncionariosTabela.findIndex((f) => {
      return f.idFuncionario === id
    })
    if (indexFuncionario !== -1){
      this.listaFuncionariosTabela.splice(indexFuncionario, 1)
      this.tabelaFuncionarios.renderRows()
    }
  }
  // ---- controle funcionarios ----//

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

