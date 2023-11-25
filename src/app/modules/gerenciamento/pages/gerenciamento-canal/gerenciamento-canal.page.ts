import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { Canal } from '../../../../core/state/gerenciamento/canal/canal.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { CargoService } from '../../../../core/state/gerenciamento/cargo/cargo.service';

@Component({
  selector: 'app-gerenciamento-canal',
  templateUrl: './gerenciamento-canal.page.html',
  styleUrls: ['./gerenciamento-canal.page.scss'],
})
export class GerenciamentoCanalPage extends Pagina implements OnInit {
  canais: Canal[] = [];

  listaCanais: Canal[] = [];

  constructor(
    private router: Router,
    private canalService: CanalService,
    private cargoService: CargoService,
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
    const canais = this.gerenciamentoRepository.canais()
    this.canais = []
    canais.forEach((canal) => {
      this.canais.push(new Canal(canal))
    })
    this.listaCanais = this.canais.slice()
  }

  buscarCanais(){
    this.canalService.buscarTodosCanais().subscribe({
      next: () => {
        this.inicializarConteudo()
      }
    });
  }

  recarregarPagina(){
    this.buscarCanais()
  }

  filtrarCanalNome(ev: any) {
    var val = ev.target.value;
    this.listaCanais = this.canais.slice();

    // se o valor for um valor valido
    this.listaCanais = this.listaCanais.filter((canal) => {
      return canal.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaCanal(canal?: Canal) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_CANAL;
    if (canal !== undefined) {
      this.canalService.buscarCanal(canal.canal_id).subscribe({
        next: () => {
          this.cargoService.buscarTodosCargos().subscribe({
            next: () => {
              rota = rota + ConstantesRotas.BARRA + canal.canal_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
              this.navegarPara(rota)
            },
            error: (err) => {
              this.toastService.error('Erro ao carregar informações ' + canal.nome);
              
              if (err?.original?.status === 422) {
                return;
              }
            },
          })
        },
        error: (err) => {
          this.toastService.error('Erro ao carregar informações ' + canal.nome);
          
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
