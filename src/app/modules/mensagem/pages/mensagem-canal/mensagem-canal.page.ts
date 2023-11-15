import { Component, OnInit } from '@angular/core';
import { CanalResponsavel, Mensagem } from '../../../../shared/utilities/entidade/entidade.utility';
import { ActivatedRoute, Router } from '@angular/router';
import { CanalService } from '../../../../core/services/canal-service/canal.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { UsuarioLogado } from '../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { MensagemService } from '../../../../core/services/mensagem-service/mensagem.service';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';

@Component({
  selector: 'app-mensagem-canal',
  templateUrl: './mensagem-canal.page.html',
  styleUrls: ['./mensagem-canal.page.scss'],
})
export class MensagemCanalPage extends Pagina implements OnInit {
  canalResponsavel!: CanalResponsavel;

  idUsuario: number | undefined = this.usuarioLogado.getIdUsuario();

  mensagens: Mensagem[] = [];

  constructor(
    private usuarioLogado: UsuarioLogado,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private canalService: CanalService,
    private mensagemService: MensagemService,
    private pageMenuService: PageMenuService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM;
    super(router, ROTA_BASE);

    this.inicializarConteudo();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(true);
  }

  resgatarCanalResponsavel(id: number): CanalResponsavel {
    const canalResponsavel = this.canalService.buscarCanalResponsavel(id);
    if (canalResponsavel !== undefined) {
      return canalResponsavel;
    }
    throw new Error('Canal nao encontrado');
  }

  resgatarMensagens(idCanalResponsavel: number): Mensagem[] {
    return this.mensagemService.buscarMensagensCanalResponsavel(idCanalResponsavel);
  }

  nomeCanal(): string {
    if (this.usuarioLogado.isResponsavel()) {
      return this.canalResponsavel.canal.nome;
    }
    return this.canalResponsavel.responsavel.nome;
  }

  enviarMensagem(mensagem: Mensagem) {
    if (this.idUsuario !== undefined) {
      mensagem.idUsuario = this.idUsuario;
      mensagem.idCanalResponsavel = this.canalResponsavel.idCanalResponsavel;
    } else {
      throw new Error('Usuario nao definido');
    }
    console.log(mensagem);
    this.mensagens.push(mensagem);
    this.mensagemService.incluirMensagem(mensagem);
  }

  protected inicializarConteudo(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('idCanalResponsavel');
    if (id !== null) {
      this.canalResponsavel = this.resgatarCanalResponsavel(Number.parseInt(id));
      this.mensagens = this.resgatarMensagens(Number.parseInt(id));
    } else {
      throw new Error('idCanal nao especificado na url');
    }
  }
}
