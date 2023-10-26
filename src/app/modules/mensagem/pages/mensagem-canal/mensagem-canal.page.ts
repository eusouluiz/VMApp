import { Component, OnInit } from '@angular/core';
import { CanalResponsavel, Mensagem } from '../../../../shared/utilities/entidade/entidade.utility';
import { ActivatedRoute, Router } from '@angular/router';
import { CanalService } from '../../../../core/services/canal-service/canal.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { UsuarioLogado } from '../../../../shared/utilities/usuario-logado/usuario-logado.utility';

@Component({
  selector: 'app-mensagem-canal',
  templateUrl: './mensagem-canal.page.html',
  styleUrls: ['./mensagem-canal.page.scss'],
})
export class MensagemCanalPage extends Pagina implements OnInit {

  canalResponsavel!: CanalResponsavel
  mensagem: Mensagem = {
    idMensagem: 0,
    idUsuario: 0,
    idCanalResponsavel: 0,
    texto: 'teste teste teste teste teste teste teste',
    arquivo: '',
    dataHoraEnvio: new Date(),
    indVisualizacao: true
  }
  idUsuario: number | undefined = this.usuarioLogado.getId()

  constructor(
    private usuarioLogado: UsuarioLogado,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private canalService: CanalService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM
    super(router, ROTA_BASE)

    this.inicializarConteudo()

  }

  ngOnInit() {
  }

  protected inicializarConteudo(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('idCanalResponsavel')
    if (id !== null) {
      this.canalResponsavel = this.resgatarCanalResponsavel(Number.parseInt(id))
    } else {
      throw new Error('idCanal nao especificado na url')
    }
  }

  resgatarCanalResponsavel(id: number): CanalResponsavel {
    const canalResponsavel = this.canalService.buscarCanalResponsavel(id)
    if (canalResponsavel !== undefined) {
      return canalResponsavel
    }
    throw new Error('Canal nao encontrado')
  }

  nomeCanal(): string {
    if (this.usuarioLogado.isResponsavel()) {
      return this.canalResponsavel.canal.nome
    }
    return this.canalResponsavel.responsavel.nome
  }

  enviarMensagem(mensagem: Mensagem){
    console.log(mensagem)
  }

}
