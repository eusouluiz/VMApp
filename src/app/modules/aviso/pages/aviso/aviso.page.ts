import { AvisoService } from './../../../../core/services/aviso-service/aviso.service';
import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { Router } from '@angular/router';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Aviso } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.page.html',
  styleUrls: ['./aviso.page.scss'],
})
export class AvisoPage extends Pagina implements OnInit {

  avisos: Aviso[] = []

  constructor(
    private router: Router,
    private avisoService: AvisoService
  ) { 
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_AVISO
    super(router, ROTA_BASE)

    this.inicializarConteudo()
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.avisos)
  }

  protected inicializarConteudo(): void {
      this.avisos = this.resgatarAvisos()
  }

  resgatarAvisos(): Aviso[] {
    return this.avisoService.buscarTodosAvisos()
  }

}
