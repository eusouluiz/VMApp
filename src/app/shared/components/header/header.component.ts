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
import { AvisoService } from '../../../core/state/aviso/aviso-service/aviso.service';
import { AvisoRepository } from '../../../core/state/aviso/aviso.repository';
import { Session } from 'inspector';
import { SessionService } from '../../../core/state/session/session.service';
import { LocalNotificationsService } from '../../../core/services/local-notifications/local-notifications.service';

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
  OnDestroy() {
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

        var nome = await this.getUsuarioNome(payload.new.user_id);
        console.log(nome);
        this.toastService.message(nome + ': ' + payload.new.texto);
      })
      .subscribe();
    const aviso = supabase
      .channel(ConstantesSupabase.CANAL_NOTIFICACAO_AVISO)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'avisos' }, async (payload: any) => {
        console.log('Aviso Change received!', payload);
        this.toastService.message('Novo Aviso: ' + payload.new.titulo);
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
}
