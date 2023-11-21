import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsavelService } from '../../../../core/state/gerenciamento/responsavel/responsavel.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { Responsavel } from '../../../../core/state/gerenciamento/responsavel/responsavel.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';

@Component({
  selector: 'app-gerenciamento-responsavel',
  templateUrl: './gerenciamento-responsavel.page.html',
  styleUrls: ['./gerenciamento-responsavel.page.scss'],
})
export class GerenciamentoResponsavelPage extends Pagina implements OnInit {
  responsaveis: Responsavel[] = [];

  listaResponsaveis: Responsavel[] = [];

  constructor(
    private router: Router,
    private responsavelService: ResponsavelService,
    public location: Location,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private toastService: ToastService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.buscarResponsaveis()
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  protected inicializarConteudo(): void {
    const responsaveis = this.gerenciamentoRepository.responsaveis()
    console.log(responsaveis)
    this.responsaveis = []
    responsaveis.forEach((responsavel) => {
      this.responsaveis.push(new Responsavel(responsavel))
    })
    this.listaResponsaveis = this.responsaveis.slice()
  }

  buscarResponsaveis(ev?: any){
    this.responsavelService.buscarTodosResponsaveis().subscribe({
      next: () => {
        this.inicializarConteudo()
    
        //TODO so completar quando finalizar a chamada
        if (ev !== undefined) {
          ev.target.complete()
        }
      },
      error: (err) => {
        this.toastService.error('Falha ao buscar responsáveis, tente novamente mais tarde');

        if (ev !== undefined) {
          ev.target.complete()
        }
      },
    });
  }

  filtrarResponsavelNome(ev: any) {
    var val = ev.target.value;
    this.listaResponsaveis = this.responsaveis.slice();

    // se o valor for um valor valido
    this.listaResponsaveis = this.listaResponsaveis.filter((responsavel) => {
      return responsavel.usuario.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaResponsavel(id?: string) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_RESPONSAVEL;
    if (id !== undefined) {
      this.responsavelService.buscarResponsavel(id).subscribe()
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
    }
    this.navegarPara(rota)
  }
}
