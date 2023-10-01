import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'


export interface Cargo {
  idCargo: Number,
  nome: String,
  turma: String,
}

export interface Funcionario {
  idFuncionario: Number,
  idUsuario: Number,
  nome: String,
  usuario: Usuario,
  telefone: String,
  cargos: Cargo[]
}

export interface Usuario {
  cpf: String,
  senha: String,
}

var a1: Cargo = {idCargo: 0, nome: 'cargo1', turma: 'turma1'}
var a2: Cargo = {idCargo: 1, nome: 'cargo2', turma: 'turma2'}

var FUNCIONARIO_DATA: Funcionario[] = [
  {
    idFuncionario: 0,
    idUsuario: 0,
    nome: 'Carlos r1',
    usuario: {cpf: '123.456.789-00', senha: '12345678',},
    telefone: '(41) 98822-2527',
    cargos: [a1, a2]
  },
  {
    idFuncionario: 1,
    idUsuario: 1,
    nome: 'Gabriel r2',
    usuario: {cpf: '987.654.321-99', senha: '12345678',},
    telefone: '(00) 12345-6789',
    cargos: [a1]
  },
  {
    idFuncionario: 2,
    idUsuario: 2,
    nome: 'Felipe r3',
    usuario: {cpf: '333.666.999-369', senha: '12345678',},
    telefone: '(12) 34567-8900',
    cargos: [a2]
  }
]

var CARGO_DATA = [
  {idCargo: 3, nome: 'Gabriel', turma: 'turma3'},
  {idCargo: 4, nome: 'Caio', turma: 'turma4'},
  {idCargo: 5, nome: 'Afonso', turma: 'turma5'},
  {idCargo: 6, nome: 'Luiz', turma: 'turma7'},
  {idCargo: 7, nome: 'Giacomo', turma: 'turma8'},
]

@Component({
  selector: 'app-gerenciamento-funcionario-detalhes',
  templateUrl: './gerenciamento-funcionario-detalhes.page.html',
  styleUrls: ['./gerenciamento-funcionario-detalhes.page.scss'],
})
export class GerenciamentoFuncionarioDetalhesPage implements OnInit {

  modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'

  funcionario: Funcionario

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
      
      this.inicializarFormBuscaCargo()
      if (this.isModoDetalhes()) {
        var id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
        this.funcionario = this.resgatarFuncionario(id)
        this.inicializarTabelaCargos()
      } else {
        this.funcionario = this.funcionarioVazio()
        this.inicializarTabelaCargos()
      }

      this.form = this.formBuilder.group({
        nome: [this.funcionario.nome, Validators.required],
        telefone: [this.funcionario.telefone, Validators.required],
        cpf: [this.funcionario.usuario.cpf, Validators.required],
        senha: [this.funcionario.usuario.senha, Validators.required],
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

  // ---- busca funcionario ----//
  private resgatarFuncionario(id: Number): Funcionario{
    for (let i = 0; i < FUNCIONARIO_DATA.length; i++) {
      const funcionario = FUNCIONARIO_DATA[i];
      if (funcionario.idFuncionario === id) {
        return funcionario
      }
    }
    return this.funcionarioVazio()
  }

  private funcionarioVazio(): Funcionario{
    return {
      idFuncionario: 0,
      idUsuario: 0,
      nome: '',
      usuario: {cpf: '', senha: '',},
      telefone: '',
      cargos: []
    }
  }
  // ---- busca funcionario ----//

  
  // ---- controle botoes ----//

  eventoActions(ev:any){
    if (ev.detail.data === undefined) {
      return
    }
    const action = ev.detail.data.action
    console.log(action)

    if(action === 'delete'){
      this.deletarFuncionario()
    }
  }

  private deletarFuncionario(){
    console.log('funcionario deletado')
    this.retornaPagina()
  }

  //editar
  iniciarEdicao(){
    console.log('edicao iniciada')
    console.log(this.form)
    this.modo = 'editar'
    this.form?.enable()

    this.inicializarTabelaCargos()
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
      nome: this.funcionario.nome,
      telefone: this.funcionario.telefone,
      cpf: this.funcionario.usuario.cpf,
      senha: this.funcionario.usuario.senha,
    })
    this.form?.disable()

    this.inicializarTabelaCargos()
    this.tabelaCargos.renderRows()
  }

  //salvar edicao
  salvar(){
    console.log('salvado')
    
    console.log('nome: ' + this.form?.value.nome)
    console.log('telefone: ' + this.form?.value.telefone)
    console.log('cpf: ' + this.form?.value.cpf)
    console.log('cpf: ' + this.form?.value.senha)

    this.funcionario.nome = this.form?.value.nome
    this.funcionario.telefone = this.form?.value.telefone
    this.funcionario.usuario.cpf = this.form?.value.cpf
    this.funcionario.usuario.senha = this.form?.value.senha

    this.atualizarCargos()

    this.modo = 'detalhes'
    this.form?.disable()


  }
  // ---- controle botoes ----//

  // ---- controle cargos ----//

  formBuscaCargo!: UntypedFormGroup
  
  inicializarFormBuscaCargo() {
    this.formBuscaCargo = this.formBuilder.group({
      busca: ''
    })
  }

  //nome colunas
  colunasCargo: string[] = ['nome', 'acao']
  listaCargosBusca: Cargo[] = CARGO_DATA.slice()
  nomeCargosBusca: String[] = this.getNomeCargosBusca(this.listaCargosBusca)

  listaCargosTabela!: Cargo[]

  @ViewChild(MatTable)
  tabelaCargos!: MatTable<Cargo>;

  private inicializarTabelaCargos(){
    this.listaCargosTabela = this.funcionario.cargos.slice()
    this.listaCargosBusca = CARGO_DATA.slice()
    this.nomeCargosBusca = this.getNomeCargosBusca(this.listaCargosBusca)
    this.limparCampoBusca()
  }

  private getNomeCargosBusca(lista: Cargo[]): String[]{
    var nomes: String[] = []
    lista.forEach(cargo => {
      nomes.push(cargo.nome)
    });
    return nomes
  }

  adicionarCargo(valor: number){
    console.log('adicionando cargo')
    console.log(valor)

    if (valor === -1){
      this.navegarTelaCargo(valor)
      return
    }
    
    const cargo = this.listaCargosBusca[valor]
    console.log(cargo)

    this.listaCargosTabela.push(cargo)
    this.tabelaCargos.renderRows()

    this.removeCargoDaLista(valor)
    this.limparCampoBusca()
  }

  limparCampoBusca() {
    this.formBuscaCargo.setValue({
      busca: ''
    })
  }

  private removeCargoDaLista(index: number){
    for (let i = 0; i < this.listaCargosBusca.length; i++) {
      if (index === i){
        this.listaCargosBusca.splice(index, 1)
        this.nomeCargosBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarCargos(){
    this.funcionario.cargos = this.listaCargosTabela.sort((a1, a2) => {
      if (a1.nome.toLowerCase().toLowerCase() > a2.nome.toLowerCase()){
        return 1
      } else if (a2.nome.toLowerCase() > a1.nome.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
    this.tabelaCargos.renderRows()
  }

  navegarTelaCargo(id: Number){
    console.log('navegar tela cargo: ' + id)
    var rota
    if (id !== -1){
      rota = '/cargo/' + id + '/detalhes'
    } else {
      rota = '/cargo/cadastro'
    }
    this.navegarPara(rota) 
  }

  deletarCargo(id: Number){
    console.log('deletar: ' + id)
    const indexCargo = this.listaCargosTabela.findIndex((a) => {
      return a.idCargo === id
    })
    if (indexCargo !== -1){
      this.listaCargosTabela.splice(indexCargo, 1)
      this.tabelaCargos.renderRows()
    }
  }

  // ---- controle cargos ----//

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
