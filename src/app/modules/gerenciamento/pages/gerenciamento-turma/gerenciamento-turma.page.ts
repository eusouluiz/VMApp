import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurmaService } from '../../../../core/services/turma-service/turma.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { Turma } from '../../../../core/services/turma-service/turma.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';

@Component({
  selector: 'app-gerenciamento-turma',
  templateUrl: './gerenciamento-turma.page.html',
  styleUrls: ['./gerenciamento-turma.page.scss'],
})
export class GerenciamentoTurmaPage extends Pagina implements OnInit {
  turmas: Turma[] = [];

  listaTurmas: Turma[] = [];

  constructor(
    private router: Router,
    private turmaService: TurmaService,
    public location: Location,
    private pageMenuService: PageMenuService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  protected inicializarConteudo(): void {
    this.turmas = this.turmaService.buscarTodosTurmas();
    this.listaTurmas = this.turmas.slice();
  }

  filtarTurmaNome(ev: any) {
    var val = ev.target.value;
    this.listaTurmas = this.turmas.slice();

    // se o valor for um valor valido
    this.listaTurmas = this.listaTurmas.filter((turma) => {
      return turma.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaTurma(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_TURMA;
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
    }
    this.navegarPara(rota);
  }
}
