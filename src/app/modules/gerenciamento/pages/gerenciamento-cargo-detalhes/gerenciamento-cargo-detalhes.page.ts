import { UsuarioService } from '../../../../core/state/gerenciamento/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CargoService } from '../../../../core/state/gerenciamento/cargo/cargo.service';
import { FuncionarioService } from '../../../../core/state/gerenciamento/funcionario/funcionario.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { Cargo, CargoInterface } from '../../../../core/state/gerenciamento/cargo/cargo.entity';
import { Funcionario } from '../../../../core/state/gerenciamento/funcionario/funcionario.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { UsuarioInterface } from '../../../../core/state/gerenciamento/usuario/usuario.entity';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { Funcionalidade } from '../../../../core/state/gerenciamento/funcionalidade/funcionalidade.entity';
import { FuncionalidadeService } from '../../../../core/state/gerenciamento/funcionalidade/funcionalidade.service';
import { FUNCIONALIDADE_DATA } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-gerenciamento-cargo-detalhes',
  templateUrl: './gerenciamento-cargo-detalhes.page.html',
  styleUrls: ['./gerenciamento-cargo-detalhes.page.scss'],
})
export class GerenciamentoCargoDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {
  cargo: Cargo = new Cargo();

  listaTodosFuncionarios: Funcionario[] = [];
  listaTodosFuncionalidades: Funcionalidade[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private usuarioService: UsuarioService,
    private cargoService: CargoService,
    private funcionarioService: FuncionarioService,
    private funcionalidadeService: FuncionalidadeService,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private toastService: ToastService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.definirModo();
    this.inicializarForms();
    this.preencherListaTodosFuncionarios()
    this.preencherListaTodosFuncionalidades()
    this.inicializarConteudo()
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  inicializarForms() {
    this.inicializarFormCargo();
    this.inicializarFormBuscaFuncionario();
    this.inicializarFormBuscaFuncionalidade();
  }

  inicializarFormCargo() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  recarregarPagina() {
    this.buscarFuncionarios()
    this.inicializarConteudo()
  }

  protected inicializarConteudo(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.isModoDetalhes() && id !== null) {
      this.cargo = this.resgatarCargo(id);
      console.log(this.cargo)
      this.form?.setValue({
        nome: this.cargo.nome,
      });
    }
    this.inicializarTabelaFuncionarios();
    this.inicializarTabelaFuncionalidades();

    if (this.isModoDetalhes()) {
      this.desabilitarForms()
    }
  }

  // ---- busca cargo ----//
  private resgatarCargo(id: string): Cargo {
    this.cargoService.buscarCargo(id).subscribe();
    const cargo = this.gerenciamentoRepository.cargo(id)
    console.log(cargo)
    if (cargo !== undefined) {
      return new Cargo(cargo);
    }
    return new Cargo();
  }
  // ---- busca cargo ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.cargoService.deletarCargo(this.cargo.cargo_id).subscribe({
      next: () => {
        this.usuarioService.deletarUsuario(this.cargo.cargo_id).subscribe({
          next: () => {
            this.atualizarCargo()
            this.toastService.success('Sucesso ao Remover ' + this.cargo.nome);
            this.retornarPagina();
          },
          error: (err) => {
            this.toastService.error('Erro ao Remover Cargo');
    
            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      },
      error: (err) => {
        this.toastService.error('Erro ao Remover Cargo');

        if (err?.original?.status === 422) {
          return;
        }
      },
    });
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaFuncionarios();
  }

  protected habilitarForms(): void {
    this.form?.enable();
    this.formBuscaFuncionario?.enable();
    this.formBuscaFuncionalidade?.enable();
  }

  protected desabilitarForms(): void {
    this.form?.disable();
    this.formBuscaFuncionario?.disable();
    this.formBuscaFuncionalidade?.disable();
  }

  //cancelar edicao
  cancelar() {
    if (this.isModoCadastrar()) {
      this.retornarPagina();
      return;
    }

    this.modo = 'detalhes';

    this.form?.setValue({
      nome: this.cargo.nome,
    });
    this.desabilitarForms();

    this.inicializarTabelaFuncionarios();
    this.inicializarTabelaFuncionalidades();
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {

      var cargo: CargoInterface = {
        nome: this.form.value.nome,
      }

      if (this.isModoCadastrar()) {
        this.cargoService.incluirCargo(cargo).subscribe({
          next: () => {
            if (cargo.cargo_id !== undefined && cargo.cargo_id !== null) {
              this.cargo.cargo_id = cargo.cargo_id
            }
            this.atualizarCargo()
            this.cargoService.vincularFuncionarios(this.cargo, this.listaFuncionariosTabela)
            this.atualizarFuncionarios()
            this.toastService.success('Sucesso ao cadastrar ' + this.cargo.nome);
            this.retornarModoDetalhes()
          },
          error: (err) => {
            this.toastService.error('Erro ao cadastrar Cargo');

            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      } else {
        this.cargoService.alterarCargo(cargo, this.cargo.cargo_id).subscribe({
          next: () => {
            this.atualizarCargo()
            this.cargoService.vincularFuncionarios(this.cargo, this.listaFuncionariosTabela)
            this.atualizarFuncionarios()
            this.toastService.success('Sucesso ao editar ' + this.cargo.nome);
            this.retornarModoDetalhes()
          },
          error: (err) => {
            this.toastService.error('Erro ao editar Cargo');

            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      }


    } else {
      this.form?.markAllAsTouched();
    }
  }

  atualizarCargo() {
    this.cargo.nome = this.form?.value.nome;
  }
  // ---- controle botoes ----//

  // ---- controle funcionarios ----//

  formBuscaFuncionario!: UntypedFormGroup;

  inicializarFormBuscaFuncionario() {
    this.formBuscaFuncionario = this.formBuilder.group({
      buscaFuncionario: '',
    });
  }

  listaFuncionariosBusca: Funcionario[] = [];
  nomeFuncionariosBusca: string[] = [];

  listaFuncionariosTabela!: Funcionario[];

  buscarFuncionarios() {
    this.funcionarioService.buscarTodosFuncionarios().subscribe({
      next: () => {
        this.preencherListaTodosFuncionarios()
        this.inicializarBuscaFuncionarios()
      }
    });
  }

  preencherListaTodosFuncionarios() {
    const funcionarios = this.gerenciamentoRepository.funcionarios()
    this.listaTodosFuncionarios = []
    funcionarios.forEach((funcionario) => {
      this.listaTodosFuncionarios.push(new Funcionario(funcionario))
    })
  }

  private inicializarTabelaFuncionarios() {
    this.listaFuncionariosTabela = this.cargo.funcionarios.slice();
    this.inicializarBuscaFuncionarios()
  }

  private inicializarBuscaFuncionarios() {
    this.listaFuncionariosBusca = [];
    if (this.listaTodosFuncionarios.length > 0) {
      this.listaTodosFuncionarios.forEach((a) => {
        const idFuncionario = a.funcionario_id;
        var isCargoPossuiFuncionario = false;

        for (let i = 0; i < this.listaFuncionariosTabela.length; i++) {
          const cargoFuncionario = this.listaFuncionariosTabela[i];
          if (cargoFuncionario.funcionario_id === idFuncionario) {
            isCargoPossuiFuncionario = true;
            break;
          }
        }

        if (!isCargoPossuiFuncionario) {
          this.listaFuncionariosBusca.push(a);
        }
      });
    }

    this.resgatarNomeFuncionariosBusca(this.listaFuncionariosBusca);
    this.limparCampoBuscaFuncionario();
  }

  private resgatarNomeFuncionariosBusca(lista: Funcionario[]) {
    // esvazia lista
    this.nomeFuncionariosBusca.splice(0, this.nomeFuncionariosBusca.length)
    lista.forEach((funcionario) => {
      this.nomeFuncionariosBusca.push(funcionario.usuario.nome);
    });
  }

  adicionarFuncionario(valor: number) {
    if (valor === -1) {
      this.navegarTelaFuncionario(valor);
      return;
    }

    const funcionario = this.listaFuncionariosBusca[valor];

    this.listaFuncionariosTabela.push(funcionario);

    this.removerFuncionarioDaListaBusca(valor);
    this.limparCampoBuscaFuncionario();
  }

  limparCampoBuscaFuncionario() {
    this.formBuscaFuncionario.setValue({
      buscaFuncionario: '',
    });
  }

  private removerFuncionarioDaListaBusca(index: number) {
    for (let i = 0; i < this.listaFuncionariosBusca.length; i++) {
      if (index === i) {
        // remove item da lista
        this.listaFuncionariosBusca.splice(index, 1);
        this.nomeFuncionariosBusca.splice(index, 1);
        break;
      }
    }
  }

  private atualizarFuncionarios() {
    this.cargo.funcionarios = this.listaFuncionariosTabela.sort((funcionario1, funcionario2) => {
      if (funcionario1.usuario.nome.toLowerCase() > funcionario2.usuario.nome.toLowerCase()) {
        return 1;
      } else if (funcionario2.usuario.nome.toLowerCase() > funcionario1.usuario.nome.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  navegarTelaFuncionario(id: number) {
    if (this.isModoDetalhes()) {
      var rota = ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO;
      if (id !== -1) {
        rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
      } else {
        rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
      }
      this.navegarPara(rota);
    }
  }

  deletarFuncionario(id: string) {
    const indexFuncionario = this.listaFuncionariosTabela.findIndex((funcionario) => {
      return funcionario.funcionario_id === id;
    });
    if (indexFuncionario !== -1) {
      const funcionario = this.listaFuncionariosTabela[indexFuncionario];
      this.listaFuncionariosTabela.splice(indexFuncionario, 1);

      this.listaFuncionariosBusca.push(funcionario);
      this.nomeFuncionariosBusca.push(funcionario.usuario.nome);
    }
  }

  // ---- controle funcionarios ----//

  // ---- controle funcionalidades ----//

  formBuscaFuncionalidade!: UntypedFormGroup;

  inicializarFormBuscaFuncionalidade() {
    this.formBuscaFuncionalidade = this.formBuilder.group({
      buscaFuncionalidade: '',
    });
  }

  listaFuncionalidadesBusca: Funcionalidade[] = [];
  nomeFuncionalidadesBusca: string[] = [];

  listaFuncionalidadesTabela!: Funcionalidade[];

  preencherListaTodosFuncionalidades() {
    this.listaTodosFuncionalidades = FUNCIONALIDADE_DATA
  }

  private inicializarTabelaFuncionalidades() {
    this.listaFuncionalidadesTabela = this.cargo.funcionalidades.slice();
    this.inicializarBuscaFuncionalidades()
  }

  private inicializarBuscaFuncionalidades() {
    this.listaFuncionalidadesBusca = [];
    if (this.listaTodosFuncionalidades.length > 0) {
      this.listaTodosFuncionalidades.forEach((a) => {
        const idFuncionalidade = a.funcionalidade_id;
        var isCargoPossuiFuncionalidade = false;

        for (let i = 0; i < this.listaFuncionalidadesTabela.length; i++) {
          const cargoFuncionalidade = this.listaFuncionalidadesTabela[i];
          if (cargoFuncionalidade.funcionalidade_id === idFuncionalidade) {
            isCargoPossuiFuncionalidade = true;
            break;
          }
        }

        if (!isCargoPossuiFuncionalidade) {
          this.listaFuncionalidadesBusca.push(a);
        }
      });
    }

    this.resgatarNomeFuncionalidadesBusca(this.listaFuncionalidadesBusca);
    this.limparCampoBuscaFuncionalidade();
  }

  private resgatarNomeFuncionalidadesBusca(lista: Funcionalidade[]) {
    // esvazia lista
    this.nomeFuncionalidadesBusca.splice(0, this.nomeFuncionalidadesBusca.length)
    lista.forEach((funcionalidade) => {
      this.nomeFuncionalidadesBusca.push(funcionalidade.nome);
    });
  }

  adicionarFuncionalidade(valor: number) {
    if (valor === -1) {
      this.navegarTelaFuncionalidade(valor);
      return;
    }

    const funcionalidade = this.listaFuncionalidadesBusca[valor];

    this.listaFuncionalidadesTabela.push(funcionalidade);

    this.removerFuncionalidadeDaListaBusca(valor);
    this.limparCampoBuscaFuncionalidade();
  }

  limparCampoBuscaFuncionalidade() {
    this.formBuscaFuncionalidade.setValue({
      buscaFuncionalidade: '',
    });
  }

  private removerFuncionalidadeDaListaBusca(index: number) {
    for (let i = 0; i < this.listaFuncionalidadesBusca.length; i++) {
      if (index === i) {
        // remove item da lista
        this.listaFuncionalidadesBusca.splice(index, 1);
        this.nomeFuncionalidadesBusca.splice(index, 1);
        break;
      }
    }
  }

  private atualizarFuncionalidades() {
    this.cargo.funcionalidades = this.listaFuncionalidadesTabela.sort((funcionalidade1, funcionalidade2) => {
      if (funcionalidade1.nome.toLowerCase() > funcionalidade2.nome.toLowerCase()) {
        return 1;
      } else if (funcionalidade2.nome.toLowerCase() > funcionalidade1.nome.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  navegarTelaFuncionalidade(id: number) {
    if (this.isModoDetalhes()) {
      var rota = ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO;
      if (id !== -1) {
        rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
      } else {
        rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
      }
      this.navegarPara(rota);
    }
  }

  deletarFuncionalidade(id: string) {
    const indexFuncionalidade = this.listaFuncionalidadesTabela.findIndex((funcionalidade) => {
      return funcionalidade.funcionalidade_id === id;
    });
    if (indexFuncionalidade !== -1) {
      const funcionalidade = this.listaFuncionalidadesTabela[indexFuncionalidade];
      this.listaFuncionalidadesTabela.splice(indexFuncionalidade, 1);

      this.listaFuncionalidadesBusca.push(funcionalidade);
      this.nomeFuncionalidadesBusca.push(funcionalidade.nome);
    }
  }

  // ---- controle funcionalidades ----//

}
