import { GerenciamentoRepository } from './../../../../core/state/gerenciamento/gerenciamento.repository';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { Aluno } from '../../../../core/state/gerenciamento/aluno/aluno.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { ALUNO_DATA } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-gerenciamento-aluno',
  templateUrl: './gerenciamento-aluno.page.html',
  styleUrls: ['./gerenciamento-aluno.page.scss'],
})
export class GerenciamentoAlunoPage extends Pagina implements OnInit {
  responsaveis: Aluno[] = [];

  listaAlunos: Aluno[] = [];

  constructor(
    private router: Router,
    private alunoService: AlunoService,
    public location: Location,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);
    
    alunoService.buscarTodosAlunos().subscribe();
    this.inicializarConteudo()
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  protected inicializarConteudo(): void {
    const alunos = this.gerenciamentoRepository.alunos()
    this.listaAlunos = []
    alunos.forEach((aluno) => {
      this.listaAlunos.push(new Aluno(aluno))
    })
  }

  buscarAlunos(ev: any){
    this.alunoService.buscarTodosAlunos().subscribe();
    this.inicializarConteudo()

    //TODO so completar quando finalizar a chamada
    ev.target.complete()
  }

  filtarAlunoNome(ev: any) {
    var val = ev.target.value;
    this.listaAlunos = this.responsaveis.slice();

    // se o valor for um valor valido
    this.listaAlunos = this.listaAlunos.filter((aluno) => {
      return aluno.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaAluno(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO;
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
    }
    this.navegarPara(rota);
  }
}
