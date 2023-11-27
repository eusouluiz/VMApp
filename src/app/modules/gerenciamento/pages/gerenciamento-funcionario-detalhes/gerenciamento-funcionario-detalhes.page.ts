import { UsuarioService } from '../../../../core/state/gerenciamento/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FuncionarioService } from '../../../../core/state/gerenciamento/funcionario/funcionario.service';
import { CargoService } from '../../../../core/state/gerenciamento/cargo/cargo.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { Funcionario } from '../../../../core/state/gerenciamento/funcionario/funcionario.entity';
import { Cargo } from '../../../../core/state/gerenciamento/cargo/cargo.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { UsuarioInterface } from '../../../../core/state/gerenciamento/usuario/usuario.entity';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';

@Component({
  selector: 'app-gerenciamento-funcionario-detalhes',
  templateUrl: './gerenciamento-funcionario-detalhes.page.html',
  styleUrls: ['./gerenciamento-funcionario-detalhes.page.scss'],
})
export class GerenciamentoFuncionarioDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {
  idFuncionario = this.activatedRoute.snapshot.paramMap.get('id');
  funcionario: Funcionario = new Funcionario();

  listaTodosCargos: Cargo[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private usuarioService: UsuarioService,
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private toastService: ToastService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.definirModo();
    this.inicializarForms();
    this.preencherListaTodosCargos()
    this.preencherFuncionario()
    this.inicializarConteudo()
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  inicializarForms() {
    this.inicializarFormFuncionario();
    this.inicializarFormBuscaCargo();
  }

  inicializarFormFuncionario() {
    const senhaForm = this.isModoCadastrar() ? ['', Validators.required] : ['']

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: senhaForm,
    });
  }

  recarregarPagina() {
    this.buscarCargos()
    this.buscarFuncionario()
  }

  protected inicializarConteudo(): void {

    if (this.isModoDetalhes() && this.idFuncionario !== null) {
      this.form?.setValue({
        nome: this.funcionario.usuario.nome,
        telefone: this.funcionario.usuario.telefone,
        cpf: this.funcionario.usuario.cpf,
        senha: '',
      });
    }
    this.inicializarTabelaCargos();

    if (this.isModoDetalhes()) {
      this.form?.disable();
      this.formBuscaCargo.disable();
    }
  }

  // ---- busca funcionario ----//
  buscarFuncionario(){
    if (this.idFuncionario !== null) {
      this.funcionarioService.buscarFuncionario(this.idFuncionario).subscribe({
        next: () => {
          this.preencherFuncionario()
          this.inicializarConteudo()
        }
      });
    }
  }

  private preencherFuncionario() {
    if (this.idFuncionario !== null) {
      const funcionario = this.gerenciamentoRepository.funcionario(this.idFuncionario)
      if (funcionario !== undefined) {
        this.funcionario = new Funcionario(funcionario);
      } else {
        this.funcionario = new Funcionario();
      }
    }
  }
  // ---- busca funcionario ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.funcionarioService.deletarFuncionario(this.funcionario.funcionario_id).subscribe({
      next: () => {
        this.usuarioService.deletarUsuario(this.funcionario.usuario.user_id).subscribe({
          next: () => {
            this.funcionarioService.removerFuncionarioInStorage(this.funcionario.funcionario_id)
            this.toastService.success('Sucesso ao Remover ' + this.funcionario.usuario.nome);
            this.retornarPagina();
          },
          error: (err) => {
            this.toastService.error('Erro ao Remover Funcionário');

            if (err?.original?.status === 422) {
              return;
            }
          },
        });

      },
      error: (err) => {
        this.toastService.error('Erro ao Remover Funcionário');

        if (err?.original?.status === 422) {
          return;
        }
      },
    });
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaCargos();
  }

  protected habilitarForms(): void {
    this.form?.enable();
    this.formBuscaCargo?.enable();
  }

  protected desabilitarForms(): void {
    this.form?.disable();
    this.formBuscaCargo?.disable();
  }

  //cancelar edicao
  cancelar() {
    if (this.isModoCadastrar()) {
      this.retornarPagina();
      return;
    }

    this.modo = 'detalhes';

    this.form?.setValue({
      nome: this.funcionario.usuario.nome,
      telefone: this.funcionario.usuario.telefone,
      cpf: this.funcionario.usuario.cpf,
      senha: '',
    });
    this.desabilitarForms();

    this.inicializarTabelaCargos();
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {

      var usuario: UsuarioInterface = {
        nome: this.form.value.nome,
        cpf: this.form.value.cpf,
        telefone: this.form.value.telefone,
        tipo: 'F',
      }

      if (this.isModoCadastrar()) {
        usuario.password = this.form?.value.senha
        this.usuarioService.incluirUsuario(usuario).subscribe({
          next: () => {
            this.atualizarFuncionario()
            this.funcionarioService.saveFuncionarioInStorage(this.funcionario.converterFuncionarioInterface())
            this.funcionarioService.vincularCargo(this.funcionario, this.listaCargosTabela).subscribe({
              next: () => {
                this.atualizarCargos()
                this.toastService.success('Sucesso ao cadastrar ' + this.funcionario.usuario.nome);
                this.retornarModoDetalhes()
              },
              error: (err) => {
                this.toastService.error('Erro ao vincular Cargo');
                
                if (err?.original?.status === 422) {
                  return;
                }
              },
            })
          },
          error: (err) => {
            this.toastService.error('Erro ao cadastrar Funcionário');
            
            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      } else {
        if (this.form.value.senha !== '') {
          usuario.password = this.form?.value.senha
        }
        usuario.email = null
        this.usuarioService.alterarUsuario(usuario, this.funcionario.usuario.user_id).subscribe({
          next: () => {
            this.atualizarFuncionario()
            this.funcionarioService.saveFuncionarioInStorage(this.funcionario.converterFuncionarioInterface())
            this.funcionarioService.vincularCargo(this.funcionario, this.listaCargosTabela).subscribe({
              next: () => {
                this.atualizarCargos()
                this.toastService.success('Sucesso ao editar ' + this.funcionario.usuario.nome);
                this.retornarModoDetalhes()
              },
              error: (err) => {
                this.toastService.error('Erro ao vincular Cargo');
    
                if (err?.original?.status === 422) {
                  return;
                }
              },
            })
          },
          error: (err) => {
            this.toastService.error('Erro ao editar Funcionário');

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

  atualizarFuncionario() {
    this.funcionario.usuario.nome = this.form?.value.nome;
    this.funcionario.usuario.telefone = this.form?.value.telefone;
    this.funcionario.usuario.cpf = this.form?.value.cpf;
    this.funcionario.usuario.password = this.form?.value.senha;
  }
  // ---- controle botoes ----//

  // ---- controle cargos ----//

  formBuscaCargo!: UntypedFormGroup;

  inicializarFormBuscaCargo() {
    this.formBuscaCargo = this.formBuilder.group({
      busca: '',
    });
  }

  listaCargosBusca: Cargo[] = [];
  nomeCargosBusca: string[] = [];

  listaCargosTabela: Cargo[] = [];

  buscarCargos() {
    this.cargoService.buscarTodosCargos().subscribe({
      next: () => {
        this.preencherListaTodosCargos()
        this.inicializarBuscaCargos()
      }
    });
  }

  preencherListaTodosCargos() {
    const cargos = this.gerenciamentoRepository.cargos()
    this.listaTodosCargos = []
    cargos.forEach((cargo) => {
      this.listaTodosCargos.push(new Cargo(cargo))
    })
  }

  private inicializarTabelaCargos() {
    this.listaCargosTabela = [];
    if (this.funcionario.cargo !== null && this.funcionario.cargo.nome !== '') {
      this.listaCargosTabela.push(this.funcionario.cargo);
    }
    this.inicializarBuscaCargos();
  }

  private inicializarBuscaCargos() {
    this.listaCargosBusca = [];
    if (this.listaTodosCargos !== null) {
      this.listaTodosCargos.forEach((cargo) => {
        const idCargo = cargo.cargo_id;
        var isFuncionarioPossuiCargo = false;

        for (let i = 0; i < this.listaCargosTabela.length; i++) {
          const funcionarioCargo = this.listaCargosTabela[i];
          if (funcionarioCargo.cargo_id === idCargo) {
            isFuncionarioPossuiCargo = true;
            break;
          }
        }

        if (!isFuncionarioPossuiCargo) {
          this.listaCargosBusca.push(cargo);
        }
      });
    }

    this.resgatarNomeCargosBusca(this.listaCargosBusca);
    this.limparCampoBusca();
  }

  private resgatarNomeCargosBusca(lista: Cargo[]) {
    // esvazia lista
    this.nomeCargosBusca.splice(0, this.nomeCargosBusca.length)
    lista.forEach((cargo) => {
      this.nomeCargosBusca.push(cargo.nome);
    });
  }

  adicionarCargo(valor: number) {
    if (valor === -1) {
      this.navegarTelaCargo();
      return;
    }

    const cargo = this.listaCargosBusca[valor];

    // remove 1 para colocar outro
    if (this.listaCargosTabela.length > 0) {
      this.deletarCargo();
    }
    this.listaCargosTabela.push(cargo);

    this.removerCargoDaListaBusca(valor);
    this.limparCampoBusca();
  }

  limparCampoBusca() {
    this.formBuscaCargo.setValue({
      busca: '',
    });
  }

  private removerCargoDaListaBusca(index: number) {
    for (let i = 0; i < this.listaCargosBusca.length; i++) {
      if (index === i) {
        this.listaCargosBusca.splice(index, 1);
        this.nomeCargosBusca.splice(index, 1);
        break;
      }
    }
  }

  private atualizarCargos() {
    this.funcionario.cargo = this.listaCargosTabela[0];
  }

  navegarTelaCargo(cargo?: Cargo) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_CARGO;
    if (this.isModoDetalhes()) {
      if (cargo !== undefined) {
        this.cargoService.buscarCargo(cargo.cargo_id).subscribe({
          next: () => {
            rota = rota + ConstantesRotas.BARRA + cargo.cargo_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
            this.navegarPara(rota);
          },
          error: (err) => {
            this.toastService.error('Erro ao carregar informações ' + cargo.nome);
            
            if (err?.original?.status === 422) {
              return;
            }
          },
        })
      }
    } else if (cargo === undefined) {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
      this.navegarPara(rota);
    }
  }

  deletarCargo() {
    const cargo = this.listaCargosTabela[0];
    this.listaCargosTabela.splice(0, 1);

    this.listaCargosBusca.push(cargo);
    this.nomeCargosBusca.push(cargo.nome);
  }

  // ---- controle cargos ----//

}
