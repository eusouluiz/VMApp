import { SessionRepository } from './../../../../core/state/session/session.repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface OpcoesGerenciamento {
  nomeOpcao: String,
  paginaRedirecionamento: String,
  idFuncionalidade: Number
}

@Component({
  selector: 'app-gerenciamento',
  templateUrl: './gerenciamento.page.html',
  styleUrls: ['./gerenciamento.page.scss'],
})
export class GerenciamentoPage implements OnInit {

  idFuncionalidadesAcesso: Number[] = []
  opcoesGerenciamento: OpcoesGerenciamento[] = [
    {nomeOpcao: 'Responsavel', paginaRedirecionamento: 'responsavel', idFuncionalidade: 0},
    {nomeOpcao: 'Aluno', paginaRedirecionamento: 'aluno', idFuncionalidade: 0},
    {nomeOpcao: 'Turma', paginaRedirecionamento: 'turma', idFuncionalidade: 0},
    {nomeOpcao: 'Funcionario', paginaRedirecionamento: 'funcionario', idFuncionalidade: 1},
    {nomeOpcao: 'Cargo', paginaRedirecionamento: 'cargo', idFuncionalidade: 1},
  ]

  constructor(
    private router: Router,
    private sessionRepository: SessionRepository
  ) { 
    this.sessionRepository.session()?.funcionalidadesAcesso.forEach((f) => {
      this.idFuncionalidadesAcesso.push(f.idFuncionalidade)
    })
  }

  ngOnInit() {
  }

  public possuiAcessoFuncionalidade(id: Number): boolean{
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
