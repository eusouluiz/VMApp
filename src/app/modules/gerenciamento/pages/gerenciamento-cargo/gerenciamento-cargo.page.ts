import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargoService } from '../../../../core/state/gerenciamento/cargo/cargo.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { Cargo } from '../../../../core/state/gerenciamento/cargo/cargo.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';

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
    public location: Location,
    private pageMenuService: PageMenuService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  protected inicializarConteudo(): void {
    this.cargoService.buscarTodosCargos();
    this.listaCargos = this.cargos.slice();
  }

  filtarCargoNome(ev: any) {
    var val = ev.target.value;
    this.listaCargos = this.cargos.slice();

    // se o valor for um valor valido
    this.listaCargos = this.listaCargos.filter((cargo) => {
      return cargo.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
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
}
