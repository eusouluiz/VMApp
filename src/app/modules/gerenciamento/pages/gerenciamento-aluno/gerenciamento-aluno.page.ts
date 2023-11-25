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
import { ResponsavelService } from '../../../../core/state/gerenciamento/responsavel/responsavel.service';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';

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
    private toastService: ToastService,
    private alunoService: AlunoService,
    private responsavelService: ResponsavelService,
    public location: Location,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
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

  buscarAlunos(){
    this.alunoService.buscarTodosAlunos().subscribe({
      next: () => {
        this.inicializarConteudo()
      }
    });
  }

  recarregarPagina() {}

  protected inicializarConteudo(): void {
    const alunos = this.gerenciamentoRepository.alunos()
    this.listaAlunos = []
    alunos.forEach((aluno) => {
      this.listaAlunos.push(new Aluno(aluno))
    })
  }

  filtarAlunoNome(ev: any) {
    var val = ev.target.value;
    this.listaAlunos = this.responsaveis.slice();

    // se o valor for um valor valido
    this.listaAlunos = this.listaAlunos.filter((aluno) => {
      return aluno.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaAluno(aluno?: Aluno) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO;
    if (aluno !== undefined) {
      this.alunoService.buscarAluno(aluno.aluno_id).subscribe({
        next: () => {
          this.alunoService.buscarTodosAlunos().subscribe({
            next: () => {
              rota = rota + ConstantesRotas.BARRA + aluno.aluno_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
              this.navegarPara(rota)
            },
            error: (err) => {
              this.toastService.error('Erro ao carregar informações ' + aluno.nome);
              
              if (err?.original?.status === 422) {
                return;
              }
            },
          })
        },
        error: (err) => {
          this.toastService.error('Erro ao carregar informações ' + aluno.nome);
          
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
