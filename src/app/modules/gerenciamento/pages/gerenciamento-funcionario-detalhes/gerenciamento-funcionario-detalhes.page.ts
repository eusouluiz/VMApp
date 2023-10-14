import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { CARGO_DATA, Cargo, FUNCIONARIO_DATA, Funcionario, funcionarioVazio } from '../../../../shared/utilities/entidade/entidade.utility';

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
        this.funcionario = funcionarioVazio()
        this.inicializarTabelaCargos()
      }

      this.form = this.formBuilder.group({
        nome: [this.funcionario.nome, Validators.required],
        telefone: [this.funcionario.usuario.telefone, Validators.required],
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
    return funcionarioVazio()
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
      telefone: this.funcionario.usuario.telefone,
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
    this.funcionario.usuario.telefone = this.form?.value.telefone
    this.funcionario.usuario.cpf = this.form?.value.cpf
    this.funcionario.usuario.senha = this.form?.value.senha

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
    this.listaCargosTabela = [this.funcionario.cargo]
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
