import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Responsavel } from '../../../../shared/utilities/entidade/entidade.utility';
import { ResponsavelService } from '../../../../core/services/responsavel-service/responsavel.service';

@Component({
  selector: 'app-gerenciamento-responsavel',
  templateUrl: './gerenciamento-responsavel.page.html',
  styleUrls: ['./gerenciamento-responsavel.page.scss'],
})
export class GerenciamentoResponsavelPage implements OnInit {

  responsaveis: any

  constructor(
    private router: Router,
    private responsavelService: ResponsavelService,
  ) { 
    this.responsaveis = responsavelService.buscarTodosResponsaveis()
  }

  ngOnInit() {
  }

  public navegarDetalheResponsavel(responsavel: Responsavel){
    const caminho: String = '/responsavel/' + responsavel.idResponsavel + '/detalhes'
    this.navegarPara(caminho)
  }
  
  public navegarCadastroResponsavel(){
    const caminho: String = '/responsavel/cadastro'
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
