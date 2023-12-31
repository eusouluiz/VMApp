import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Directive } from '@angular/core';

@Directive()
export class Pagina {
  constructor(private routerPagina: Router, private basePagina: string, private locationPagina?: Location) {}

  // evento emitido toda vez que carrega conteudo ion
  ionViewWillEnter() {
    this.inicializarConteudo();
  }

  protected inicializarConteudo() {}

  protected retornarPagina() {
    this.navegarPara('')
  }

  protected navegarPara(rota: string) {
    rota = this.adequarPagina(rota);
    const caminho = this.basePagina + rota;
    this.routerPagina.navigate([caminho]);
  }

  protected adequarPagina(rota: string): string {
    if (rota.substring(0, 1) !== '/') {
      return '/' + rota;
    }
    return rota;
  }
}
