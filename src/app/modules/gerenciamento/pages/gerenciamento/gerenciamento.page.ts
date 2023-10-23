import { ConstantesRotas } from './../../../../shared/utilities/constantes/constantes.utility';
import { SessionRepository } from './../../../../core/state/session/session.repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantesFuncionalidades } from '../../../../shared/utilities/constantes/constantes.utility';
import { Rota } from '../../../../shared/utilities/rota/rota.utility';

interface OpcoesGerenciamento {
  nomeOpcao: String,
  paginaRedirecionamento: String,
  idFuncionalidade: number
}

@Component({
  selector: 'app-gerenciamento',
  templateUrl: './gerenciamento.page.html',
  styleUrls: ['./gerenciamento.page.scss'],
})
export class GerenciamentoPage extends Rota implements OnInit {

  idFuncionalidadesAcesso: number[] = []
  opcoesGerenciamento: OpcoesGerenciamento[] = [
    {nomeOpcao: 'Responsavel', paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_RESPONSAVEL, idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_RESPONSAVEL},
    {nomeOpcao: 'Aluno', paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO, idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_ALUNO},
    {nomeOpcao: 'Turma', paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_TURMA, idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_TURMA},
    {nomeOpcao: 'Funcionario', paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_FUNCIONARIO, idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_FUNCIONARIO},
    {nomeOpcao: 'Cargo', paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_CARGO, idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_CARGO},
    {nomeOpcao: 'Canal', paginaRedirecionamento: ConstantesRotas.ROTA_GERENCIAMENTO_CANAL, idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_CANAL},
  ]

  constructor(
    private router: Router,
    private sessionRepository: SessionRepository
  ) { 
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO
    super(router, ROTA_BASE)
    var ids = this.sessionRepository.session()?.funcionalidadesAcesso
    if (ids !== undefined) {
      this.idFuncionalidadesAcesso = ids
    } 
  }

  ngOnInit() {
  }

  public possuiAcessoFuncionalidade(id: number): boolean{
    return this.idFuncionalidadesAcesso.includes(id)
  }

}
