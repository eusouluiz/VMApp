import { UsuarioLogado } from './../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { Router } from '@angular/router';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Canal } from '../../../../shared/utilities/entidade/entidade.utility';
import { CanalService } from '../../../../core/services/canal-service/canal.service';

@Component({
  selector: 'app-mensagem-selecao-canal',
  templateUrl: './mensagem-selecao-canal.page.html',
  styleUrls: ['./mensagem-selecao-canal.page.scss'],
})
export class MensagemSelecaoCanalPage extends Pagina implements OnInit {

  canais: Canal[] = []
  isResponsavel = this.usuarioLogado.isResponsavel()
  cargoId = this.usuarioLogado.getIdCargo()

  constructor(
    private router: Router,
    private canalService: CanalService,
    public usuarioLogado: UsuarioLogado
  ) { 
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM
    super(router, ROTA_BASE)

    this.inicializarConteudo()
  }

  ngOnInit() {
  }

  protected inicializarConteudo(): void {
      this.canais = this.canalService.buscarTodosCanais()
  }

  verificarAcesso(canal: Canal): boolean{
    if (this.isResponsavel) {
      return true
    } 
    return verificarListaCargo(canal, this.cargoId)
  }

}

function verificarListaCargo(canal: Canal, idCargo?: number): boolean{
  if (idCargo === undefined){
    return false
  }
  for (let i = 0; i < canal.cargos.length; i++) {
    const cargo = canal.cargos[i];
    if (cargo.idCargo === idCargo){
      return true
    }
  }
  return false
}
