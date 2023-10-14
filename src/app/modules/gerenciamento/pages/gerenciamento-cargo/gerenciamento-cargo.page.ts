import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CARGO_DATA, Cargo } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-gerenciamento-cargo',
  templateUrl: './gerenciamento-cargo.page.html',
  styleUrls: ['./gerenciamento-cargo.page.scss'],
})
export class GerenciamentoCargoPage implements OnInit {

  cargos: any

  constructor(
    private router: Router,
    ) { 
  }

  ngOnInit() {

    this.cargos = CARGO_DATA
  }

  public navegarDetalheCargo(cargo: Cargo){
    const caminho: String = '/cargo/' + cargo.idCargo + '/detalhes'
    this.navegarPara(caminho)
  }
  
  public navegarCadastroCargo(){
    const caminho: String = '/cargo/cadastro'
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
