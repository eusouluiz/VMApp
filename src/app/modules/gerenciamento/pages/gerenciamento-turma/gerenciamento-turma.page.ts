import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurmaService } from '../../../../core/state/gerenciamento/turma/turma.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { Turma } from '../../../../core/state/gerenciamento/turma/turma.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { FuncionarioService } from '../../../../core/state/gerenciamento/funcionario/funcionario.service';

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
    private funcionarioService: FuncionarioService,
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
    const turmas = this.gerenciamentoRepository.turmas()
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
      }
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
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_TURMA;
    if (turma !== undefined) {
      this.turmaService.buscarTurma(turma.turma_id).subscribe({
        next: () => {
          this.funcionarioService.buscarTodosFuncionarios().subscribe({
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
