import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CargoService } from '../../../../core/state/gerenciamento/cargo/cargo.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { Canal } from '../../../../core/state/gerenciamento/canal/canal.entity';
import { Cargo } from '../../../../core/state/gerenciamento/cargo/cargo.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { CanalInterface } from '../../../../core/state/gerenciamento/canal/canal.entity';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';

@Component({
  selector: 'app-gerenciamento-canal-detalhes',
  templateUrl: './gerenciamento-canal-detalhes.page.html',
  styleUrls: ['./gerenciamento-canal-detalhes.page.scss'],
})
export class GerenciamentoCanalDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {
  canal: Canal = new Canal();

  listaTodosCargos: Cargo[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private canalService: CanalService,
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
    this.inicializarConteudo()
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  inicializarForms() {
    this.inicializarFormCanal();
    this.inicializarFormBuscaCargo();
  }

  inicializarFormCanal() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  recarregarPagina() {
    this.buscarCargos()
    this.inicializarConteudo()
  }

  protected inicializarConteudo(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.isModoDetalhes() && id !== null) {
      this.canal = this.resgatarCanal(id);
      console.log(this.canal)
      this.form?.setValue({
        nome: this.canal.nome,
      });
    }
    this.inicializarTabelaCargos();

    if (this.isModoDetalhes()) {
      this.form?.disable();
      this.formBuscaCargo.disable();
    }
  }

  // ---- busca canal ----//
  private resgatarCanal(id: string): Canal {
    this.canalService.buscarCanal(id).subscribe();
    const canal = this.gerenciamentoRepository.canal(id)
    if (canal !== undefined) {
      return new Canal(canal);
    }
    return new Canal();
  }
  // ---- busca canal ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.canalService.deletarCanal(this.canal.canal_id).subscribe({
      next: () => {
        this.atualizarCanal()
        this.toastService.success('Sucesso ao Remover ' + this.canal.nome);
        this.retornarPagina();
      },
      error: (err) => {
        this.toastService.error('Erro ao Remover Canal');

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
      nome: this.canal.nome,
    });
    this.desabilitarForms();

    this.inicializarTabelaCargos();
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {

      var canal: CanalInterface = {
        nome: this.form.value.nome,
        descricao: 'descricao',
      }

      if (this.isModoCadastrar()) {
        this.canalService.incluirCanal(canal).subscribe({
          next: () => {
            if (canal.canal_id !== undefined && canal.canal_id !== null) {
              this.canal.canal_id = canal.canal_id
            }
            this.atualizarCanal()
            this.canalService.vincularCargos(this.canal, this.listaCargosTabela)
            this.atualizarCargos()
            this.toastService.success('Sucesso ao cadastrar ' + this.canal.nome);
            this.retornarModoDetalhes()
          },
          error: (err) => {
            this.toastService.error('Erro ao cadastrar Canal');

            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      } else {
        this.canalService.alterarCanal(canal, this.canal.canal_id).subscribe({
          next: () => {
            this.atualizarCanal()
            this.canalService.vincularCargos(this.canal, this.listaCargosTabela)
            this.atualizarCargos()
            this.toastService.success('Sucesso ao editar ' + this.canal.nome);
            this.retornarModoDetalhes()
          },
          error: (err) => {
            this.toastService.error('Erro ao editar Canal');

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

  atualizarCanal() {
    this.canal.nome = this.form?.value.nome;
  }
  // ---- controle botoes ----//

  // ---- controle cargos ----//

  formBuscaCargo!: UntypedFormGroup;

  inicializarFormBuscaCargo() {
    this.formBuscaCargo = this.formBuilder.group({
      buscaCargo: '',
    });
  }

  listaCargosBusca: Cargo[] = [];
  nomeCargosBusca: string[] = [];

  listaCargosTabela!: Cargo[];

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
    this.listaCargosTabela = this.canal.cargos.slice();
    this.inicializarBuscaCargos()
  }

  private inicializarBuscaCargos() {
    this.listaCargosBusca = [];
    if (this.listaTodosCargos.length > 0) {
      this.listaTodosCargos.forEach((a) => {
        const idCargo = a.cargo_id;
        var isCanalPossuiCargo = false;

        for (let i = 0; i < this.listaCargosTabela.length; i++) {
          const canalCargo = this.listaCargosTabela[i];
          if (canalCargo.cargo_id === idCargo) {
            isCanalPossuiCargo = true;
            break;
          }
        }

        if (!isCanalPossuiCargo) {
          this.listaCargosBusca.push(a);
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
      this.navegarTelaCargo(valor);
      return;
    }

    const cargo = this.listaCargosBusca[valor];

    this.listaCargosTabela.push(cargo);

    this.removerCargoDaListaBusca(valor);
    this.limparCampoBusca();
  }

  limparCampoBusca() {
    this.formBuscaCargo.setValue({
      buscaCargo: '',
    });
  }

  private removerCargoDaListaBusca(index: number) {
    for (let i = 0; i < this.listaCargosBusca.length; i++) {
      if (index === i) {
        // remove item da lista
        this.listaCargosBusca.splice(index, 1);
        this.nomeCargosBusca.splice(index, 1);
        break;
      }
    }
  }

  private atualizarCargos() {
    this.canal.cargos = this.listaCargosTabela.sort((cargo1, cargo2) => {
      if (cargo1.nome.toLowerCase() > cargo2.nome.toLowerCase()) {
        return 1;
      } else if (cargo2.nome.toLowerCase() > cargo1.nome.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  navegarTelaCargo(id: number) {
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

  deletarCargo(id: string) {
    const indexCargo = this.listaCargosTabela.findIndex((cargo) => {
      return cargo.cargo_id === id;
    });
    if (indexCargo !== -1) {
      const cargo = this.listaCargosTabela[indexCargo];
      this.listaCargosTabela.splice(indexCargo, 1);

      this.listaCargosBusca.push(cargo);
      this.nomeCargosBusca.push(cargo.nome);
    }
  }

  // ---- controle cargos ----//
}
