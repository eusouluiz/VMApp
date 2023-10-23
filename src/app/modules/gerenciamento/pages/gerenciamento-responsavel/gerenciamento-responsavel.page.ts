import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Responsavel } from '../../../../shared/utilities/entidade/entidade.utility';
import { ResponsavelService } from '../../../../core/services/responsavel-service/responsavel.service';
import { Rota } from '../../../../shared/utilities/rota/rota.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gerenciamento-responsavel',
  templateUrl: './gerenciamento-responsavel.page.html',
  styleUrls: ['./gerenciamento-responsavel.page.scss'],
})
export class GerenciamentoResponsavelPage extends Rota implements OnInit {

  responsaveis: Responsavel[] = []
  listaResponsaveis: Responsavel[] = []


  constructor(
    private router: Router,
    private responsavelService: ResponsavelService,
    public location: Location,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO
    super(router, ROTA_BASE, location)
    this.inicializarConteudo()
  }

  ngOnInit() {
  }

  protected inicializarConteudo(): void {
    this.responsaveis = this.responsavelService.buscarTodosResponsaveis()
    this.listaResponsaveis = this.responsaveis.slice()
  }

  filtarResponsavelNome(ev: any) {
    var val = ev.target.value;
    this.listaResponsaveis = this.responsaveis.slice()

    // se o valor for um valor valido
    this.listaResponsaveis = this.listaResponsaveis.filter((responsavel) => {
      return (responsavel.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }

  navegarTelaResponsavel(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_RESPONSAVEL
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO
    }
    this.navegarPara(rota)
  }
}
