import { Component, Input, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/toasts/services/toast-service/toast.service';
import { ConstantesSupabase } from '../../utilities/constantes/constantes.utility';
import { NavController } from '@ionic/angular';
import { UsuarioLogado } from '../../utilities/usuario-logado/usuario-logado.utility';
import { MensagemRepository } from '../../../core/state/mensagem/mensagem.repository';
import { MensagemService } from '../../../core/state/mensagem/mensagem-service/mensagem.service';
import { Router } from '@angular/router';
import { Session } from 'inspector';
import { SessionService } from '../../../core/state/session/session.service';
import { LocalNotificationsService } from '../../../core/services/local-notifications/local-notifications.service';
import { AvisoInterface } from '../../../core/state/aviso/aviso-service/aviso.entity';
import { Turma, TurmaInterface } from '../../../core/state/gerenciamento/turma/turma.entity';
import { AvisoService } from '../../../core/state/aviso/aviso-service/aviso.service';
import { AvisoRepository } from '../../../core/state/aviso/aviso.repository';

const supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';

  @Input() botaoRetorno: boolean = false;

  @Input() botaoLogout: boolean = false;

  constructor(
    private toastService: ToastService,
    private navController: NavController,
    private usuarioLogado: UsuarioLogado,
    private mensagemService: MensagemService,
    private avisoService: AvisoService,
    private avisoRepository: AvisoRepository,
    private localNotificationsService: LocalNotificationsService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.inscreverNotificacao();
  }

  ngOnInit() {}

  // nao precisaria remover os canais, pois esses canais persistem por toda aplicacao
  ngOnDestroy() {
    supabase.removeAllChannels();
  }

  onLogout(): void {
    this.sessionService.logout().subscribe();
    this.localNotificationsService.removeNotificacoes();
    setTimeout(() => {
      localStorage.clear();
      this.navController.navigateRoot('login');
    }, 500);
  }

  inscreverNotificacao() {
    const mensagem = supabase
      .channel(ConstantesSupabase.CANAL_NOTIFICACAO_MENSAGEM)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensagens' }, async (payload: any) => {
        console.log('Mensagem Change received!', payload);

        // verifica se a mensagem nao eh do proprio usuario
        if (payload.new.user_id !== this.usuarioLogado.getIdUsuario()) {
          const urlSeparada = this.router.url.split('/');
          const idCanalResponsavelUrl = urlSeparada[urlSeparada.length - 2];
          const idCanalResponsavel = payload.new.canal_responsavel_id;

          // verifica se a pessoa nao esta no proprio canal de mensagens
          if (idCanalResponsavelUrl !== idCanalResponsavel) {
            var nomeCanal = await this.resgatarCanalNome(idCanalResponsavel);
            if (this.usuarioLogado.isResponsavel()) {
              if (await this.isResponsavelPossuiAcessoCanalResponsavel(idCanalResponsavel)) {
                this.toastService.message(`${nomeCanal}: ${payload.new.texto}`);
                this.mensagemService.armazenarMensagem(payload.new);
              }
            } else {
              if (await this.isCargoPossuiAcessoCanalResponsavel(idCanalResponsavel)) {
                var nome = await this.getUsuarioNome(payload.new.user_id);
                this.toastService.message(`${nomeCanal} - ${nome}: ${payload.new.texto}`);
                this.mensagemService.armazenarMensagem(payload.new);
              }
            }
          }
        }
      })
      .subscribe();
    const aviso = supabase
      .channel(ConstantesSupabase.CANAL_NOTIFICACAO_AVISO)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'avisos' }, async (payload: any) => {
        console.log('Aviso Change received!', payload);

        if (this.usuarioLogado.isResponsavel()) {
          const listaTurmasAviso = await this.resgatarTurmasAviso(payload.new.id);

          if (this.isResponsavelRecebeAviso(listaTurmasAviso)) {
            // var novoAviso: AvisoInterface = {
            //   aviso_id: payload.new.id,
            //   arquivo: payload.new.arquivo,
            //   canal_id: payload.new.canal_id,
            //   data_publicacao: payload.new.data_publicacao,
            //   funcionario_id: payload.new.funcionario_id,
            //   prioridade: payload.new.prioridade,
            //   texto: payload.new.texto,
            //   titulo: payload.new.titulo,
            //   turmas: listaTurmasAviso,
            // };

            // this.avisoService.armazenarAviso(novoAviso);
            this.avisoService.buscarTodosAvisos().subscribe();
            this.toastService.message('Novo Aviso: ' + payload.new.titulo);
          }
        }
      })
      .subscribe();
  }

  async getUsuarioNome(id: string): Promise<string> {
    let { data: users, error } = await supabase

      .from('users')
      .select('nome')
      // Filters
      .eq('id', id)
      .single();

    if (users !== null) {
      console.log(users.nome);
      return users.nome;
    }
    return '';
  }

  async resgatarCanalNome(idCanalResponsavel: string): Promise<string> {
    let { data: canal, error } = await supabase
      .from('canal_responsavel')
      .select(
        `
        canais (
          nome
        )
      `
      )
      // Filters
      .eq('id', idCanalResponsavel)
      .single();

    const retorno: any = canal;
    if (canal !== null) {
      return retorno.canais.nome;
    }
    return '';
  }

  async isCargoPossuiAcessoCanalResponsavel(idCanalResponsavel: string): Promise<boolean> {
    let { data: canal, error } = await supabase
      .from('canal_responsavel')
      .select(
        `
        canais (
          canal_cargo (
            cargo_id
          )
        )
      `
      )
      // Filters
      .eq('id', idCanalResponsavel)
      .single();

    const retorno: any = canal;
    if (retorno !== null) {
      for (let i = 0; i < retorno.canais.canal_cargo.length; i++) {
        const idCargo = retorno.canais.canal_cargo[i].cargo_id;
        if (idCargo === this.usuarioLogado.getIdCargo()) {
          return true;
        }
      }
    }
    return false;
  }

  async isResponsavelPossuiAcessoCanalResponsavel(idCanalResponsavel: string): Promise<boolean> {
    let { data: canal, error } = await supabase
      .from('canal_responsavel')
      .select(
        `
        responsavel_id
      `
      )
      // Filters
      .eq('id', idCanalResponsavel)
      .single();

    return canal !== null && canal.responsavel_id === this.usuarioLogado.getIdResponsavel();
  }

  async resgatarTurmasAviso(idAviso: string): Promise<any[]> {
    let { data: aviso, error } = await supabase
      .from('avisos')
      .select(
        `
        aviso_turma (
          turmas (
            id, nome, descricao
          )
        )
      `
      )
      // Filters
      .eq('id', idAviso)
      .single();

    console.log(aviso);

    var listaTurmas: TurmaInterface[] = [];

    const retorno: any = aviso;
    if (retorno !== null) {
      retorno.aviso_turma.forEach((avisoTurma: any) => {
        listaTurmas.push({
          turma_id: avisoTurma.turmas.id,
          nome: avisoTurma.turmas.nome,
          descricao: avisoTurma.turmas.descricao,
        });
      });
    }
    return listaTurmas;
  }

  isResponsavelRecebeAviso(listaTurmasAviso: Turma[]): boolean {
    const idTurmasResponsavel = this.usuarioLogado.getListaIdTurmas();

    for (let i = 0; i < listaTurmasAviso.length; i++) {
      const idTurmaAviso = listaTurmasAviso[i].turma_id;
      if (idTurmasResponsavel.includes(idTurmaAviso)) {
        return true;
      }
    }

    return false;
  }
}
