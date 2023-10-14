import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ALUNO_DATA, Aluno } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-gerenciamento-aluno',
  templateUrl: './gerenciamento-aluno.page.html',
  styleUrls: ['./gerenciamento-aluno.page.scss'],
})
export class GerenciamentoAlunoPage implements OnInit {

  alunos!: Aluno[]

  constructor(
    private router: Router,
    ) { 
      this.alunos = ALUNO_DATA
  }

  ngOnInit() {
  }

  public navegarDetalheAluno(aluno: Aluno){
    const caminho: String = '/aluno/' + aluno.idAluno + '/detalhes'
    this.navegarPara(caminho)
  }
  
  public navegarCadastroAluno(){
    const caminho: String = '/aluno/cadastro'
    this.navegarPara(caminho)
  }

  private navegarPara(rota: String){
    if (rota.substring(0, 1) !== '/') {
      rota = '/' + rota
    }
    const caminho: String = '/app/gerenciamento' + rota
    this.router.navigate([caminho])
  }

}
