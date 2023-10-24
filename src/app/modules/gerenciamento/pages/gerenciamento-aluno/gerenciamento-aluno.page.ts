import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../../../../shared/utilities/entidade/entidade.utility';
import { AlunoService } from '../../../../core/services/aluno-service/aluno.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gerenciamento-aluno',
  templateUrl: './gerenciamento-aluno.page.html',
  styleUrls: ['./gerenciamento-aluno.page.scss'],
})
export class GerenciamentoAlunoPage extends Pagina implements OnInit {

  responsaveis: Aluno[] = []
  listaAlunos: Aluno[] = []


  constructor(
    private router: Router,
    private alunoService: AlunoService,
    public location: Location,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO
    super(router, ROTA_BASE, location)
    this.inicializarConteudo()
  }

  ngOnInit() {
  }

  protected inicializarConteudo(): void {
    this.responsaveis = this.alunoService.buscarTodosAlunos()
    this.listaAlunos = this.responsaveis.slice()
  }

  filtarAlunoNome(ev: any) {
    var val = ev.target.value;
    this.listaAlunos = this.responsaveis.slice()

    // se o valor for um valor valido
    this.listaAlunos = this.listaAlunos.filter((aluno) => {
      return (aluno.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }

  navegarTelaAluno(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO
    }
    this.navegarPara(rota)
  }

}
