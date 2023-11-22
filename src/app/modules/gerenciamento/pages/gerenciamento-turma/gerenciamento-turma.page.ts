import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';
import { Turma } from '../../../../core/services/turma-service/turma.entity';
import { TurmaService } from '../../../../core/services/turma-service/turma.service';

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
    private alunoService: AlunoService,
    public location: Location,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private toastService: ToastService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.buscarTurmas()
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  protected inicializarConteudo(): void {
    const turmas = this.gerenciamentoRepository.turmas()
    console.log(turmas)
    this.turmas = []
    turmas.forEach((turma) => {
      this.turmas.push(new Turma(turma))
    })
    this.listaTurmas = this.turmas.slice()
  }

  buscarTurmas(){
    this.turmaService.buscarTodosTurmas().subscribe({
      next: () => {
        this.inicializarConteudo()
      },
      error: (err) => {
        this.toastService.error('Falha ao buscar turmas, tente novamente mais tarde');
      },
    });
  }

  recarregarPagina(){
    this.buscarTurmas()
  }

  filtrarTurmaNome(ev: any) {
    var val = ev.target.value;
    this.listaTurmas = this.turmas.slice();

    // se o valor for um valor valido
    this.listaTurmas = this.listaTurmas.filter((turma) => {
      return turma.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaTurma(turma?: Turma) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_RESPONSAVEL;
    if (turma !== undefined) {
      this.turmaService.buscarTurma(turma.turma_id).subscribe({
        next: () => {
          this.alunoService.buscarTodosAlunos().subscribe({
            next: () => {
              rota = rota + ConstantesRotas.BARRA + turma.turma_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
              this.navegarPara(rota)
            },
            error: (err) => {
              this.toastService.error('Erro ao carregar informações ' + turma.nome);
              
              if (err?.original?.status === 422) {
                return;
              }
            },
          })
        },
        error: (err) => {
          this.toastService.error('Erro ao carregar informações ' + turma.nome);
          
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
