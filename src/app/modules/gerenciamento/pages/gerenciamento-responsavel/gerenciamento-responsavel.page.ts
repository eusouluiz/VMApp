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
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';

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
    private alunoService: AlunoService,
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

  buscarResponsaveis(){
    this.responsavelService.buscarTodosResponsaveis().subscribe({
      next: () => {
        this.inicializarConteudo()
      },
      error: (err) => {
        this.toastService.error('Falha ao buscar responsáveis, tente novamente mais tarde');
      },
    });
  }

  recarregarPagina(){
    this.buscarResponsaveis()
  }

  filtrarResponsavelNome(ev: any) {
    var val = ev.target.value;
    this.listaResponsaveis = this.responsaveis.slice();

    // se o valor for um valor valido
    this.listaResponsaveis = this.listaResponsaveis.filter((responsavel) => {
      return responsavel.usuario.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaResponsavel(responsavel?: Responsavel) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_RESPONSAVEL;
    if (responsavel !== undefined) {
      this.responsavelService.buscarResponsavel(responsavel.responsavel_id).subscribe({
        next: () => {
          this.alunoService.buscarTodosAlunos().subscribe({
            next: () => {
              rota = rota + ConstantesRotas.BARRA + responsavel.responsavel_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
              this.navegarPara(rota)
            },
            error: (err) => {
              this.toastService.error('Erro ao carregar informações ' + responsavel.usuario.nome);
              
              if (err?.original?.status === 422) {
                return;
              }
            },
          })
        },
        error: (err) => {
          this.toastService.error('Erro ao carregar informações ' + responsavel.usuario.nome);
          
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
