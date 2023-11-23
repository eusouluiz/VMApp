import { ResponsavelService } from './../../../../core/state/gerenciamento/responsavel/responsavel.service';
import { UsuarioLogado } from './../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { ConstantesRotas } from './../../../../shared/utilities/constantes/constantes.utility';
import { SessionRepository } from './../../../../core/state/session/session.repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantesFuncionalidades } from '../../../../shared/utilities/constantes/constantes.utility';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { CargoService } from '../../../../core/state/gerenciamento/cargo/cargo.service';
import { FuncionarioService } from '../../../../core/state/gerenciamento/funcionario/funcionario.service';
import { TurmaService } from '../../../../core/state/gerenciamento/turma/turma.service';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';

interface OpcoesGerenciamento {
  nomeOpcao: string;
  paginaRedirecionamento: string;
  idFuncionalidade: string;
}

@Component({
  selector: 'app-gerenciamento',
  templateUrl: './gerenciamento.page.html',
  styleUrls: ['./gerenciamento.page.scss'],
})
export class GerenciamentoPage extends Pagina implements OnInit {

  idFuncionalidadesAcesso: string[] = [];

  opcoesGerenciamento: OpcoesGerenciamento[] = [
    {
      nomeOpcao: 'Responsável',
      paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_RESPONSAVEL,
      idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_RESPONSAVEL,
    },
    {
      nomeOpcao: 'Aluno',
      paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO,
      idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_ALUNO,
    },
    {
      nomeOpcao: 'Turma',
      paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_TURMA,
      idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_TURMA,
    },
    {
      nomeOpcao: 'Funcionário',
      paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_FUNCIONARIO,
      idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_FUNCIONARIO,
    },
    {
      nomeOpcao: 'Cargo',
      paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_CARGO,
      idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_CARGO,
    },
    {
      nomeOpcao: 'Canal',
      paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_CANAL,
      idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_CANAL,
    },
  ];

  constructor(
    private router: Router,
    private sessionRepository: SessionRepository,
    private usuarioLogado: UsuarioLogado,
    private pageMenuService: PageMenuService,
    private responsavelService: ResponsavelService,
    private alunoService: AlunoService,
    private turmaService: TurmaService,
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
    private canalService: CanalService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE);
    var ids = usuarioLogado.getFuncionalidadesAcessoId();
    if (ids !== undefined) {
      this.idFuncionalidadesAcesso = ids;
    }
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(true);
  }

  public possuiAcessoFuncionalidade(id: string): boolean {
    return this.idFuncionalidadesAcesso.includes(id);
  }

  navegarParaGerenciamento(opcao: OpcoesGerenciamento) {
    switch (opcao.idFuncionalidade) {
      case ConstantesFuncionalidades.GERENCIAMENTO_RESPONSAVEL:
        this.responsavelService.buscarTodosResponsaveis().subscribe({
          complete: () => {
            this.navegarPara(opcao.paginaRedirecionamento)
          }
        })
        break
      case ConstantesFuncionalidades.GERENCIAMENTO_ALUNO:
        this.alunoService.buscarTodosAlunos().subscribe({
          complete: () => {
            this.navegarPara(opcao.paginaRedirecionamento)
          }
        })
        break
      case ConstantesFuncionalidades.GERENCIAMENTO_TURMA:
        this.turmaService.buscarTodosTurmas().subscribe({
          complete: () => {
            this.navegarPara(opcao.paginaRedirecionamento)
          }
        })
        break
      case ConstantesFuncionalidades.GERENCIAMENTO_FUNCIONARIO:
        this.funcionarioService.buscarTodosFuncionarios().subscribe({
          complete: () => {
            this.navegarPara(opcao.paginaRedirecionamento)
          }
        })
        break
      case ConstantesFuncionalidades.GERENCIAMENTO_CARGO:
        this.cargoService.buscarTodosCargos().subscribe({
          complete: () => {
            this.navegarPara(opcao.paginaRedirecionamento)
          }
        })
        break
      case ConstantesFuncionalidades.GERENCIAMENTO_CANAL:
        this.canalService.buscarTodosCanais().subscribe({
          complete: () => {
            this.navegarPara(opcao.paginaRedirecionamento)
          }
        })
        break
      default:
    }
  }
}
