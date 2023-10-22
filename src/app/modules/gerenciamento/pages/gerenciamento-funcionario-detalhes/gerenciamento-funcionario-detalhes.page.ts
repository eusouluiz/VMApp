import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { Cargo, Funcionario, funcionarioVazio } from '../../../../shared/utilities/entidade/entidade.utility';
import { PaginaGerenciamento } from '../../../../shared/utilities/pagina-gerenciamento/pagina-gerenciamento.utility';
import { FuncionarioService } from '../../../../core/services/funcionario-service/funcionario.service';
import { CargoService } from '../../../../core/services/cargo-service/cargo.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';

@Component({
  selector: 'app-gerenciamento-funcionario-detalhes',
  templateUrl: './gerenciamento-funcionario-detalhes.page.html',
  styleUrls: ['./gerenciamento-funcionario-detalhes.page.scss'],
})
export class GerenciamentoFuncionarioDetalhesPage extends PaginaGerenciamento implements OnInit {

  funcionario: Funcionario
  listaTodosCargos: Cargo[] | null = null

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO
    super(router, ROTA_BASE, location)

    this.definirModo()

    this.inicializarFormBuscaCargo()
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.isModoDetalhes() && id !== null) {
      this.funcionario = this.resgatarFuncionario(Number.parseInt(id))
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

  // ---- busca funcionario ----//
  private resgatarFuncionario(id: number): Funcionario {
    const funcionario = this.funcionarioService.buscarFuncionario(id)
    if (funcionario !== undefined) {
      return funcionario
    }
    return funcionarioVazio()
  }
  // ---- busca funcionario ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.funcionarioService.deletarFuncionario(this.funcionario.idFuncionario)
    this.retornarPagina()
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaCargos()
  }

  //cancelar edicao
  cancelar() {

    if (this.isModoCadastrar()) {
      this.retornarPagina()
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
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {
      this.funcionario.nome = this.form?.value.nome
      this.funcionario.usuario.telefone = this.form?.value.telefone
      this.funcionario.usuario.cpf = this.form?.value.cpf
      this.funcionario.usuario.senha = this.form?.value.senha

      this.atualizarCargos()

      if (this.isModoCadastrar()) {
        this.funcionarioService.incluirFuncionario(this.funcionario)
      } else {
        this.funcionarioService.alterarFuncionario(this.funcionario)
      }

      this.modo = 'detalhes'
      this.form?.disable()
    } else {
      this.form?.markAllAsTouched()
    }
  }
  // ---- controle botoes ----//

  // ---- controle cargos ----//

  formBuscaCargo!: UntypedFormGroup

  inicializarFormBuscaCargo() {
    this.formBuscaCargo = this.formBuilder.group({
      busca: ''
    })
  }

  listaCargosBusca: Cargo[] = []
  nomeCargosBusca: string[] = []

  listaCargosTabela: Cargo[] = []

  private inicializarTabelaCargos() {
    this.listaCargosTabela = []
    if (this.funcionario.cargo.nome !== '') {
      this.listaCargosTabela.push(this.funcionario.cargo)
    }
    if (!this.isModoDetalhes()) {
      this.inicializarBuscaCargos()
    }
  }

  private inicializarBuscaCargos() {
    // evitar com que lista de todos os cargos seja buscada toda hora
    if (this.listaTodosCargos === null) {
      this.listaTodosCargos = this.cargoService.buscarTodosCargos().slice()
    }

    this.listaCargosBusca = []
    this.listaTodosCargos.forEach((c) => {
      const idCargo = c.idCargo
      var isFuncionarioPossuiCargo = false

      for (let i = 0; i < this.listaCargosTabela.length; i++) {
        const funcionarioCargo = this.listaCargosTabela[i];
        if (funcionarioCargo.idCargo === idCargo) {
          isFuncionarioPossuiCargo = true
          break
        }
      }

      if (!isFuncionarioPossuiCargo) {
        this.listaCargosBusca.push(c)
      }
    })

    this.nomeCargosBusca = this.resgatarNomeCargosBusca(this.listaCargosBusca)
    this.limparCampoBusca()
  }

  private resgatarNomeCargosBusca(lista: Cargo[]): string[] {
    var nomes: string[] = []
    lista.forEach(cargo => {
      nomes.push(cargo.nome)
    });
    return nomes
  }

  adicionarCargo(valor: number) {

    if (valor === -1) {
      this.navegarTelaCargo(valor)
      return
    }

    const cargo = this.listaCargosBusca[valor]

    // remove 1 para colocar outro
    if (this.listaCargosTabela.length > 0){
      this.deletarCargo()
    }
    this.listaCargosTabela.push(cargo)

    this.removerCargoDaListaBusca(valor)
    this.limparCampoBusca()
  }

  limparCampoBusca() {
    this.formBuscaCargo.setValue({
      busca: ''
    })
  }

  private removerCargoDaListaBusca(index: number) {
    for (let i = 0; i < this.listaCargosBusca.length; i++) {
      if (index === i) {
        this.listaCargosBusca.splice(index, 1)
        this.nomeCargosBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarCargos() {
    this.funcionario.cargo = this.listaCargosTabela[0]
  }

  navegarTelaCargo(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_CARGO
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO
    }
    this.navegarPara(rota)
  }

  deletarCargo() {
    const cargo = this.listaCargosTabela[0]
    this.listaCargosTabela.splice(0, 1)

    this.listaCargosBusca.push(cargo)
    this.nomeCargosBusca.push(cargo.nome)
  }

  // ---- controle cargos ----//

}
