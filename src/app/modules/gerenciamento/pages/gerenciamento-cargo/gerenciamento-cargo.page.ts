import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargoService } from '../../../../core/state/gerenciamento/cargo/cargo.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { Cargo } from '../../../../core/state/gerenciamento/cargo/cargo.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { FuncionarioService } from '../../../../core/state/gerenciamento/funcionario/funcionario.service';

@Component({
  selector: 'app-gerenciamento-cargo',
  templateUrl: './gerenciamento-cargo.page.html',
  styleUrls: ['./gerenciamento-cargo.page.scss'],
})
export class GerenciamentoCargoPage extends Pagina implements OnInit {
  cargos: Cargo[] = [];

  listaCargos: Cargo[] = [];

  constructor(
    private router: Router,
    private cargoService: CargoService,
    private funcionarioService: FuncionarioService,
    public location: Location,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private toastService: ToastService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.inicializarConteudo()
  }
  
  ngOnInit() {}
  
  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
    this.inicializarConteudo()
  }

  protected inicializarConteudo(): void {
    const cargos = this.gerenciamentoRepository.cargos()
    this.cargos = []
    cargos.forEach((cargo) => {
      this.cargos.push(new Cargo(cargo))
    })
    this.listaCargos = this.cargos.slice()
  }

  buscarCargos(){
    this.cargoService.buscarTodosCargos().subscribe({
      next: () => {
        this.inicializarConteudo()
      }
    });
  }

  recarregarPagina(){
    this.buscarCargos()
  }

  filtrarCargoNome(ev: any) {
    var val = ev.target.value;
    this.listaCargos = this.cargos.slice();

    // se o valor for um valor valido
    this.listaCargos = this.listaCargos.filter((cargo) => {
      return cargo.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaCargo(cargo?: Cargo) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_CARGO;
    if (cargo !== undefined) {
      this.cargoService.buscarCargo(cargo.cargo_id).subscribe({
        next: () => {
          this.funcionarioService.buscarTodosFuncionarios().subscribe({
            next: () => {
              rota = rota + ConstantesRotas.BARRA + cargo.cargo_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
              this.navegarPara(rota)
            },
            error: (err) => {
              this.toastService.error('Erro ao carregar informações ' + cargo.nome);
              
              if (err?.original?.status === 422) {
                return;
              }
            },
          })
        },
        error: (err) => {
          this.toastService.error('Erro ao carregar informações ' + cargo.nome);
          
          if (err?.original?.status === 422) {
            return;
          }
        },
      });
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
      this.navegarPara(rota)
    }
  }
}
