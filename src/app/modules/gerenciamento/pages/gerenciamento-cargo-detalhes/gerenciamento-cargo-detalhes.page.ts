import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { CargoService } from '../../../../core/services/cargo-service/cargo.service';
import { FuncionarioService } from '../../../../core/services/funcionario-service/funcionario.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { FuncionalidadeService } from '../../../../core/services/funcionalidade-service/funcionalidade.service';
import { Cargo } from '../../../../core/services/cargo-service/cargo.entity';
import { Funcionario } from '../../../../core/services/funcionario-service/funcionario.entity';
import { Funcionalidade } from '../../../../core/services/funcionalidade-service/funcionalidade.entity';

@Component({
  selector: 'app-gerenciamento-cargo-detalhes',
  templateUrl: './gerenciamento-cargo-detalhes.page.html',
  styleUrls: ['./gerenciamento-cargo-detalhes.page.scss'],
})
export class GerenciamentoCargoDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {

  cargo: Cargo = new Cargo
  listaTodosFuncionarios: Funcionario[] | null = null
  listaTodasFuncionalidades: Funcionalidade[] | null = null

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private cargoService: CargoService,
    private funcionarioService: FuncionarioService,
    private funcionalidadeService: FuncionalidadeService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO
    super(router, ROTA_BASE, location)

    this.inicializarForms()
    this.inicializarConteudo()
  }

  ngOnInit() {
  }
  
  inicializarForms() {
    this.inicializarFormCargo()
    this.inicializarFormBuscaFuncionario()
    this.inicializarFormBuscaFuncionalidade()
  }

  inicializarFormCargo() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    })
  }

  protected inicializarConteudo(): void {
    this.listaTodosFuncionarios = this.funcionarioService.buscarTodosFuncionarios().slice()
    this.listaTodasFuncionalidades = this.funcionalidadeService.buscarTodosFuncionalidades().slice()

    this.definirModo()

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.isModoDetalhes() && id !== null) {
      this.cargo = this.resgatarCargo(id)

      this.form?.setValue({
        nome: this.cargo.nome,
      })
    } 
    this.inicializarTabelaFuncionarios()
    this.inicializarTabelaFuncionalidades()

    if (this.isModoDetalhes()) {
      this.form?.disable()
    }
  }

  // ---- busca cargo ----//
  private resgatarCargo(id: string): Cargo {
    const cargo = this.cargoService.buscarCargo(id)
    if (cargo !== undefined) {
      return cargo
    }
    return new Cargo()
  }
  // ---- busca cargo ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.cargoService.deletarCargo(this.cargo.cargo_id)
    this.retornarPagina()
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaFuncionarios()
    this.inicializarTabelaFuncionalidades()
  }

  //cancelar edicao
  cancelar() {

    if (this.isModoCadastrar()) {
      this.retornarPagina()
      return
    }

    this.modo = 'detalhes'

    this.form?.setValue({
      nome: this.cargo.nome,
    })
    this.form?.disable()

    this.inicializarTabelaFuncionarios()
    this.inicializarTabelaFuncionalidades()
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {
      this.cargo.nome = this.form?.value.nome

      this.atualizarFuncionarios()
      this.atualizarFuncionalidades()

      if (this.isModoCadastrar()) {
        this.cargoService.incluirCargo(this.cargo)
      } else {
        this.cargoService.alterarCargo(this.cargo)
      }

      this.modo = 'detalhes'
      this.form?.disable()
    } else {
      this.form?.markAllAsTouched()
    }
  }
  // ---- controle botoes ----//

  // ---- controle funcionarios ----//

  formBuscaFuncionario!: UntypedFormGroup

  inicializarFormBuscaFuncionario() {
    this.formBuscaFuncionario = this.formBuilder.group({
      buscaFuncionario: ''
    })
  }

  listaFuncionariosBusca: Funcionario[] = []
  nomeFuncionariosBusca: string[] = []

  listaFuncionariosTabela!: Funcionario[]

  private inicializarTabelaFuncionarios() {
    this.listaFuncionariosTabela = this.cargo.funcionarios.slice()
    if (!this.isModoDetalhes()) {
      this.inicializarBuscaFuncionarios()
    }
  }

  private inicializarBuscaFuncionarios() {

    this.listaFuncionariosBusca = []
    if (this.listaTodosFuncionarios !== null) {
      this.listaTodosFuncionarios.forEach((f) => {
        const idFuncionario = f.funcionario_id
        var isCargoPossuiFuncionario = false
  
        for (let i = 0; i < this.listaFuncionariosTabela.length; i++) {
          const cargoFuncionario = this.listaFuncionariosTabela[i];
          if (cargoFuncionario.funcionario_id === idFuncionario) {
            isCargoPossuiFuncionario = true
            break
          }
        }
  
        if (!isCargoPossuiFuncionario) {
          this.listaFuncionariosBusca.push(f)
        }
      })
    }

    this.nomeFuncionariosBusca = this.resgatarNomeFuncionariosBusca(this.listaFuncionariosBusca)
    this.limparCampoBuscaFuncionario()
  }

  private resgatarNomeFuncionariosBusca(lista: Funcionario[]): string[] {
    var nomes: string[] = []
    lista.forEach(funcionario => {
      nomes.push(funcionario.usuario.nome)
    });
    return nomes
  }

  adicionarFuncionario(valor: number) {

    if (valor === -1) {
      this.navegarTelaFuncionario(valor)
      return
    }

    const funcionario = this.listaFuncionariosBusca[valor]

    this.listaFuncionariosTabela.push(funcionario)

    this.removerFuncionarioDaListaBusca(valor)
    this.limparCampoBuscaFuncionario()
  }

  limparCampoBuscaFuncionario() {
    this.formBuscaFuncionario.setValue({
      buscaFuncionario: ''
    })
  }

  private removerFuncionarioDaListaBusca(index: number) {
    for (let i = 0; i < this.listaFuncionariosBusca.length; i++) {
      if (index === i) {
        this.listaFuncionariosBusca.splice(index, 1)
        this.nomeFuncionariosBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarFuncionarios() {
    this.cargo.funcionarios = this.listaFuncionariosTabela.sort((f1, f2) => {
      if (f1.usuario.nome.toLowerCase() > f2.usuario.nome.toLowerCase()) {
        return 1
      } else if (f2.usuario.nome.toLowerCase() > f1.usuario.nome.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
  }

  navegarTelaFuncionario(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_FUNCIONARIO
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO
    }
    this.navegarPara(rota)
  }

  deletarFuncionario(id: string) {
    const indexFuncionario = this.listaFuncionariosTabela.findIndex((r) => {
      return r.funcionario_id === id
    })
    if (indexFuncionario !== -1) {
      const funcionario = this.listaFuncionariosTabela[indexFuncionario]
      this.listaFuncionariosTabela.splice(indexFuncionario, 1)


      this.listaFuncionariosBusca.push(funcionario)
      this.nomeFuncionariosBusca.push(funcionario.usuario.nome)
    }
  }

  // ---- controle funcionarios ----//

  // ---- controle funcionalidades ----//

  formBuscaFuncionalidade!: UntypedFormGroup

  inicializarFormBuscaFuncionalidade() {
    this.formBuscaFuncionalidade = this.formBuilder.group({
      buscaFuncionalidade: ''
    })
  }

  listaFuncionalidadesBusca: Funcionalidade[] = []
  nomeFuncionalidadesBusca: string[] = []

  listaFuncionalidadesTabela!: Funcionalidade[]

  private inicializarTabelaFuncionalidades() {
    this.listaFuncionalidadesTabela = this.cargo.funcionalidades.slice()
    if (!this.isModoDetalhes()) {
      this.inicializarBuscaFuncionalidades()
    }
  }

  private inicializarBuscaFuncionalidades() {

    this.listaFuncionalidadesBusca = []
    if (this.listaTodasFuncionalidades !== null) {
      this.listaTodasFuncionalidades.forEach((f) => {
        const idFuncionalidade = f.id
        var isCargoPossuiFuncionalidade = false
  
        for (let i = 0; i < this.listaFuncionalidadesTabela.length; i++) {
          const cargoFuncionalidade = this.listaFuncionalidadesTabela[i];
          if (cargoFuncionalidade.id === idFuncionalidade) {
            isCargoPossuiFuncionalidade = true
            break
          }
        }
  
        if (!isCargoPossuiFuncionalidade) {
          this.listaFuncionalidadesBusca.push(f)
        }
      })
    }

    this.nomeFuncionalidadesBusca = this.resgatarNomeFuncionalidadesBusca(this.listaFuncionalidadesBusca)
    this.limparCampoBuscaFuncionalidade()
  }

  private resgatarNomeFuncionalidadesBusca(lista: Funcionalidade[]): string[] {
    var nomes: string[] = []
    lista.forEach(funcionalidade => {
      nomes.push(funcionalidade.nome)
    });
    return nomes
  }

  adicionarFuncionalidade(valor: number) {
    const funcionalidade = this.listaFuncionalidadesBusca[valor]

    this.listaFuncionalidadesTabela.push(funcionalidade)

    this.removerFuncionalidadeDaListaBusca(valor)
    this.limparCampoBuscaFuncionalidade()
  }

  limparCampoBuscaFuncionalidade() {
    this.formBuscaFuncionalidade.setValue({
      buscaFuncionalidade: ''
    })
  }

  private removerFuncionalidadeDaListaBusca(index: number) {
    for (let i = 0; i < this.listaFuncionalidadesBusca.length; i++) {
      if (index === i) {
        this.listaFuncionalidadesBusca.splice(index, 1)
        this.nomeFuncionalidadesBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarFuncionalidades() {
    this.cargo.funcionalidades = this.listaFuncionalidadesTabela.sort((f1, f2) => {
      if (f1.nome.toLowerCase() > f2.nome.toLowerCase()) {
        return 1
      } else if (f2.nome.toLowerCase() > f1.nome.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
  }

  deletarFuncionalidade(id: string) {
    const indexFuncionalidade = this.listaFuncionalidadesTabela.findIndex((r) => {
      return r.id === id
    })
    if (indexFuncionalidade !== -1) {
      const funcionalidade = this.listaFuncionalidadesTabela[indexFuncionalidade]
      this.listaFuncionalidadesTabela.splice(indexFuncionalidade, 1)


      this.listaFuncionalidadesBusca.push(funcionalidade)
      this.nomeFuncionalidadesBusca.push(funcionalidade.nome)
    }
  }

  // ---- controle funcionalidades ----//

}
