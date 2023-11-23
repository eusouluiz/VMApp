import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { ConstantesRotas, ConstantesSupabase } from '../../../../shared/utilities/constantes/constantes.utility';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { UsuarioLogado } from '../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { MensagemService } from '../../../../core/state/mensagem/mensagem-service/mensagem.service';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { CanalResponsavel } from '../../../../core/state/gerenciamento/canal/canal.entity';
import { Mensagem, MensagemInterface } from '../../../../core/state/mensagem/mensagem-service/mensagem.entity';
import { MensagemRepository } from '../../../../core/state/mensagem/mensagem.repository';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment';

const supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

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
    private pageMenuService: PageMenuService,
    private mensagemRepository: MensagemRepository,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM;
    super(router, ROTA_BASE);

    this.inicializarConteudo();
    this.inscreverMensagens();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  // nao precisaria remover os canais, pois esses canais persistem por toda aplicacao
  OnDestroy(){
    supabase.removeAllChannels()
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

  async resgatarMensagens(idCanalResponsavel: string) {
    let { data: mensagens, error } = await supabase
      .from('mensagens')
      .select("*")
      .eq('canal_responsavel_id', idCanalResponsavel)
      .order('data_envio', {ascending:false});

    this.mensagemService.armazenarMensagens(mensagens, idCanalResponsavel)

    const canal = this.mensagemRepository.canais().find((canal) => {
      return canal.canal_responsavel_id
    })
    if (canal !== undefined) {
      const mensagemCanal = canal.mensagens
      
      mensagemCanal.forEach((mensagem) => {
        this.mensagens.push(new Mensagem(mensagem))
      })
    }
  }

  nomeCanal(): string {
    if (this.usuarioLogado.isResponsavel()) {
      return this.canalResponsavel.canal.nome;
    }
    return this.canalResponsavel.responsavel.usuario.nome;
  }

  enviarMensagem(mensagem: Mensagem) {
    if (this.idUsuario === undefined) {
      throw new Error('Usuario nao definido');
    } else {
      
      const dataEnvio = new Date()
      const mensagemEnviada: MensagemInterface = {
        user_id: this.idUsuario,
        canal_responsavel_id: this.canalResponsavel.canal_responsavel_id,
        texto: mensagem.texto,
        arquivo: mensagem.arquivo,
        data_envio: dataEnvio.toLocaleString().replace(',', ''),
        lida: false
      }
      this.mensagemService.incluirMensagem(mensagemEnviada).subscribe({
        next: () => {
          mensagemEnviada.data_envio_date = dataEnvio
          this.mensagens.unshift(new Mensagem(mensagemEnviada));
      
          this.scrollToBottom();
        }
      });

    }
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
  
  // -------- integracao supabase -------- //

  inscreverMensagens() { 
    const mensagem = supabase.channel(ConstantesSupabase.CANAL_NOTIFICACAO_MENSAGEM)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensagens' },
        async (payload:any) => {
          console.log('Mensagem Change received!', payload)

          if (payload.new.canal_responsavel_id === this.canalResponsavel.canal_responsavel_id){
            this.mensagens.unshift(new Mensagem(payload.new));
        
            this.scrollToBottom();
          }
        }
      )
      .subscribe()
  }
}
