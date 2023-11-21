import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FuncionarioService } from '../../../../core/services/funcionario-service/funcionario.service';
import { CargoService } from '../../../../core/services/cargo-service/cargo.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { Funcionario } from '../../../../core/services/funcionario-service/funcionario.entity';
import { Cargo } from '../../../../core/services/cargo-service/cargo.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';

@Component({
  selector: 'app-gerenciamento-funcionario-detalhes',
  templateUrl: './gerenciamento-funcionario-detalhes.page.html',
  styleUrls: ['./gerenciamento-funcionario-detalhes.page.scss'],
})
export class GerenciamentoFuncionarioDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {
  funcionario: Funcionario = new Funcionario();

  listaTodosCargos: Cargo[] | null = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
    private pageMenuService: PageMenuService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.inicializarForms();
    this.inicializarConteudo();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  inicializarForms() {
    this.inicializarFormFuncionario();
    this.inicializarFormBuscaCargo();
  }

  inicializarFormFuncionario() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  protected inicializarConteudo(): void {
    this.listaTodosCargos = this.cargoService.buscarTodosCargos().slice();

    this.definirModo();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.isModoDetalhes() && id !== null) {
      this.funcionario = this.resgatarFuncionario(id);
      this.form?.setValue({
        nome: this.funcionario.usuario.nome,
        telefone: this.funcionario.usuario.telefone,
        cpf: this.funcionario.usuario.cpf,
        senha: this.funcionario.usuario.password,
      });
    }
    this.inicializarTabelaCargos();

    if (this.isModoDetalhes()) {
      this.form?.disable();
      this.formBuscaCargo.disable();
    }
  }

  // ---- busca funcionario ----//
  private resgatarFuncionario(id: string): Funcionario {
    const funcionario = this.funcionarioService.buscarFuncionario(id);
    if (funcionario !== undefined) {
      return funcionario;
    }
    return new Funcionario();
  }
  // ---- busca funcionario ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.funcionarioService.deletarFuncionario(this.funcionario.funcionario_id);
    this.retornarPagina();
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
      senha: this.funcionario.usuario.password,
    });
    this.desabilitarForms();

    this.inicializarTabelaCargos();
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {
      this.funcionario.usuario.nome = this.form?.value.nome;
      this.funcionario.usuario.telefone = this.form?.value.telefone;
      this.funcionario.usuario.cpf = this.form?.value.cpf;
      this.funcionario.usuario.password = this.form?.value.senha;

      this.atualizarCargos();

      if (this.isModoCadastrar()) {
        this.funcionarioService.incluirFuncionario(this.funcionario);
      } else {
        this.funcionarioService.alterarFuncionario(this.funcionario);
      }

      this.modo = 'detalhes';
      this.form?.disable();
    } else {
      this.form?.markAllAsTouched();
    }
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

  private inicializarTabelaCargos() {
    this.listaCargosTabela = [];
    if (this.funcionario.cargo.nome !== '') {
      this.listaCargosTabela.push(this.funcionario.cargo);
    }
    this.inicializarBuscaCargos();
  }

  private inicializarBuscaCargos() {
    this.listaCargosBusca = [];
    if (this.listaTodosCargos !== null) {
      this.listaTodosCargos.forEach((c) => {
        const idCargo = c.cargo_id;
        var isFuncionarioPossuiCargo = false;

        for (let i = 0; i < this.listaCargosTabela.length; i++) {
          const funcionarioCargo = this.listaCargosTabela[i];
          if (funcionarioCargo.cargo_id === idCargo) {
            isFuncionarioPossuiCargo = true;
            break;
          }
        }

        if (!isFuncionarioPossuiCargo) {
          this.listaCargosBusca.push(c);
        }
      });
    }

    this.nomeCargosBusca = this.resgatarNomeCargosBusca(this.listaCargosBusca);
    this.limparCampoBusca();
  }

  private resgatarNomeCargosBusca(lista: Cargo[]): string[] {
    var nomes: string[] = [];
    lista.forEach((cargo) => {
      nomes.push(cargo.nome);
    });
    return nomes;
  }

  adicionarCargo(valor: number) {
    if (valor === -1) {
      this.navegarTelaCargo(valor);
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

  navegarTelaCargo(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_CARGO;
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
    }
    this.navegarPara(rota);
  }

  deletarCargo() {
    const cargo = this.listaCargosTabela[0];
    this.listaCargosTabela.splice(0, 1);

    this.listaCargosBusca.push(cargo);
    this.nomeCargosBusca.push(cargo.nome);
  }

  // ---- controle cargos ----//
}
