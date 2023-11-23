import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { UsuarioLogado } from '../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { MensagemService } from '../../../../core/state/mensagem/mensagem-service/mensagem.service';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { CanalResponsavel } from '../../../../core/state/gerenciamento/canal/canal.entity';
import { Mensagem } from '../../../../core/state/mensagem/mensagem-service/mensagem.entity';

@Component({
  selector: 'app-mensagem-canal',
  templateUrl: './mensagem-canal.page.html',
  styleUrls: ['./mensagem-canal.page.scss'],
})
export class MensagemCanalPage extends Pagina implements OnInit {
  @ViewChild('mensagemList') mensagemList: ElementRef | undefined = undefined;

  canalResponsavel!: CanalResponsavel;

  idUsuario: string | undefined = this.usuarioLogado.getIdUsuario();

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

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  scrollToBottom() {
    const container = this.mensagemList?.nativeElement;
    container.scrollTop = 0;
  }

  resgatarCanalResponsavel(id: string): CanalResponsavel {
    const canalResponsavel = this.canalService.buscarCanalResponsavel(id);
    if (canalResponsavel !== undefined) {
      return canalResponsavel;
    }
    throw new Error('Canal nao encontrado');
  }

  resgatarMensagens(idCanalResponsavel: string) {
    this.mensagemService.buscarMensagensCanalResponsavel(idCanalResponsavel);
  }

  nomeCanal(): string {
    if (this.usuarioLogado.isResponsavel()) {
      return this.canalResponsavel.canal.nome;
    }
    return this.canalResponsavel.responsavel.usuario.nome;
  }

  enviarMensagem(mensagem: Mensagem) {
    if (this.idUsuario !== undefined) {
      mensagem.user_id = this.idUsuario;
      mensagem.canal_responsavel_id = this.canalResponsavel.canal_responsavel_id;
    } else {
      throw new Error('Usuario nao definido');
    }
    console.log(mensagem);
    this.mensagens.unshift(mensagem);
    this.mensagemService.incluirMensagem(mensagem);
    this.scrollToBottom();
  }

  protected inicializarConteudo(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('idCanalResponsavel');
    if (id !== null) {
      this.canalResponsavel = this.resgatarCanalResponsavel(id);
      this.resgatarMensagens(id);
    } else {
      throw new Error('idCanal nao especificado na url');
    }
  }
}
