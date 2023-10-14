import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FUNCIONARIO_DATA, Funcionario } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-gerenciamento-funcionario',
  templateUrl: './gerenciamento-funcionario.page.html',
  styleUrls: ['./gerenciamento-funcionario.page.scss'],
})
export class GerenciamentoFuncionarioPage implements OnInit {

  funcionarios: any

  constructor(
    private router: Router,
    ) { 
  }

  ngOnInit() {

    this.funcionarios = FUNCIONARIO_DATA
  }

  public navegarDetalheFuncionario(funcionario: Funcionario){
    const caminho: String = '/funcionario/' + funcionario.idFuncionario + '/detalhes'
    this.navegarPara(caminho)
  }
  
  public navegarCadastroFuncionario(){
    const caminho: String = '/funcionario/cadastro'
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
