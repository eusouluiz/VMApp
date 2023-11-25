import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../../../core/state/gerenciamento/funcionario/funcionario.service';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Location } from '@angular/common';
import { Funcionario } from '../../../../core/state/gerenciamento/funcionario/funcionario.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { CargoService } from '../../../../core/state/gerenciamento/cargo/cargo.service';

@Component({
  selector: 'app-gerenciamento-funcionario',
  templateUrl: './gerenciamento-funcionario.page.html',
  styleUrls: ['./gerenciamento-funcionario.page.scss'],
})
export class GerenciamentoFuncionarioPage extends Pagina implements OnInit {
  funcionarios: Funcionario[] = [];

  listaFuncionarios: Funcionario[] = [];

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
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
    const funcionarios = this.gerenciamentoRepository.funcionarios()
    this.funcionarios = []
    funcionarios.forEach((funcionario) => {
      this.funcionarios.push(new Funcionario(funcionario))
    })
    this.listaFuncionarios = this.funcionarios.slice()
  }

  buscarFuncionarios(){
    this.funcionarioService.buscarTodosFuncionarios().subscribe({
      next: () => {
        this.inicializarConteudo()
      },
      error: (err) => {
        this.toastService.error('Falha ao buscar funcionários, tente novamente mais tarde');
      },
    });
  }

  recarregarPagina(){
    this.buscarFuncionarios()
  }

  filtrarFuncionarioNome(ev: any) {
    var val = ev.target.value;
    this.listaFuncionarios = this.funcionarios.slice();

    // se o valor for um valor valido
    this.listaFuncionarios = this.listaFuncionarios.filter((funcionario) => {
      return funcionario.usuario.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  navegarTelaFuncionario(funcionario?: Funcionario) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_FUNCIONARIO;
    if (funcionario !== undefined) {
      this.funcionarioService.buscarFuncionario(funcionario.funcionario_id).subscribe({
        next: () => {
          this.cargoService.buscarTodosCargos().subscribe({
            next: () => {
              rota = rota + ConstantesRotas.BARRA + funcionario.funcionario_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
              this.navegarPara(rota)
            },
            error: (err) => {
              this.toastService.error('Erro ao carregar informações ' + funcionario.usuario.nome);
              
              if (err?.original?.status === 422) {
                return;
              }
            },
          })
        },
        error: (err) => {
          this.toastService.error('Erro ao carregar informações ' + funcionario.usuario.nome);
          
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
