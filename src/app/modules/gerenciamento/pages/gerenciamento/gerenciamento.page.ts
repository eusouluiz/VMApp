import { SessionRepository } from './../../../../core/state/session/session.repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantesFuncionalidades } from '../../../../shared/utilities/constantes/constantes.utility';

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
export class GerenciamentoPage implements OnInit {

  idFuncionalidadesAcesso: number[] = []
  opcoesGerenciamento: OpcoesGerenciamento[] = [
    {nomeOpcao: 'Responsavel', paginaRedirecionamento: 'responsavel', idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_RESPONSAVEL},
    {nomeOpcao: 'Aluno', paginaRedirecionamento: 'aluno', idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_ALUNO},
    {nomeOpcao: 'Turma', paginaRedirecionamento: 'turma', idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_TURMA},
    {nomeOpcao: 'Funcionario', paginaRedirecionamento: 'funcionario', idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_FUNCIONARIO},
    {nomeOpcao: 'Cargo', paginaRedirecionamento: 'cargo', idFuncionalidade: ConstantesFuncionalidades.GERENCIAMENTO_CARGO},
  ]

  constructor(
    private router: Router,
    private sessionRepository: SessionRepository
  ) { 
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

  public navegarPara(rota: String){
    if (rota.substring(0, 1) !== '/') {
      rota = '/' + rota
    }
    const caminho: String = '/app/gerenciamento' + rota
    this.router.navigate([caminho])
  }

}
