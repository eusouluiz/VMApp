import { UsuarioLogado } from './../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { Router } from '@angular/router';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Canal } from '../../../../shared/utilities/entidade/entidade.utility';
import { CanalService } from '../../../../core/services/canal-service/canal.service';
import { MensagemService } from '../../../../core/services/mensagem-service/mensagem.service';

@Component({
  selector: 'app-mensagem-selecao-canal',
  templateUrl: './mensagem-selecao-canal.page.html',
  styleUrls: ['./mensagem-selecao-canal.page.scss'],
})
export class MensagemSelecaoCanalPage extends Pagina implements OnInit {

  canais: Canal[] = []
  isResponsavel = this.usuarioLogado.isResponsavel()
  idCargo = this.usuarioLogado.getIdCargo()
  primeiroNome: string = ''

  constructor(
    private router: Router,
    private canalService: CanalService,
    public usuarioLogado: UsuarioLogado,
    private mensagemService: MensagemService,
  ) { 
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM
    super(router, ROTA_BASE)

    const nome = usuarioLogado.getNome()
    if (nome !== undefined){
      this.primeiroNome = nome.split(' ')[0]
    }
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
    return verificarListaCargo(canal, this.idCargo)
  }

  navegarParaCanal(idCanal: number) {
    var rota: string
    if (this.isResponsavel) {
      const idResponsavel = this.usuarioLogado.getIdResponsavel()
      if (idResponsavel !== undefined) {
        const idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(idCanal, idResponsavel)
        if (idCanalResponsavel !== undefined) {
          rota = idCanalResponsavel.toString() + ConstantesRotas.ROTA_MENSAGEM_CANAL
        } else {
          throw new Error('Canal Responsavel nao encontrado')
        }
      } else {
        throw new Error('id responsavel nao definido')
      }
    } else {
      rota = idCanal.toString() + ConstantesRotas.ROTA_MENSAGEM_SELECAO_ALUNO
    }
    this.navegarPara(rota)
  }

  resgatarUltimaMensagem(idCanal: number): string {
    if (this.isResponsavel) {
      const idResponsavel = this.usuarioLogado.getIdResponsavel()
  
      if (idResponsavel !== undefined) {
        const idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(idCanal, idResponsavel)
    
        if (idCanalResponsavel !== undefined) {
          const mensagem = this.mensagemService.buscarUltimaMensagensCanalResponsavel(idCanalResponsavel)
          if (mensagem !== undefined){
            return mensagem.texto
          } else {
            return ''
          }
        } else {
          return ''
        }
      } else {
        throw new Error('id Responsavel nao definido')
      }
    } else {
      return ''
    }
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
