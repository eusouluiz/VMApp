import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RealtimeChannel, Subscription, SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/toasts/services/toast-service/toast.service';
import { ConstantesSupabase } from '../../utilities/constantes/constantes.utility';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';

  @Input() botaoRetorno: boolean = false;

  private static supabase: any;

  constructor(
    private toastService: ToastService
  ) {
    if(HeaderComponent.supabase === undefined){
      HeaderComponent.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }
    this.inscreverNotificacao()
  }

  ngOnInit() { }

  // nao precisaria remover os canais, pois esses canais persistem por toda aplicacao
  OnDestroy(){
    HeaderComponent.supabase.removeAllChannels()
  }

  inscreverNotificacao(){
    const mensagem = HeaderComponent.supabase.channel(ConstantesSupabase.CANAL_MENSAGEM)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensagens' },
        async (payload:any) => {
          console.log('Mensagem Change received!', payload)

          var nome = await this.getUsuarioNome(payload.new.user_id)
          console.log(nome)
          this.toastService.message(nome + ': ' + payload.new.texto)
        }
      )
      .subscribe()
    const aviso = HeaderComponent.supabase.channel(ConstantesSupabase.CANAL_NOTIFICACAO_AVISO)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'avisos' },
        async (payload:any) => {
          console.log('Aviso Change received!', payload)
          this.toastService.message(payload.new.texto)
        }
      )
      .subscribe()
  }

  async getUsuarioNome(id: string): Promise<string>{

    let { data: users, error } = await HeaderComponent.supabase
      .from('users')
      .select("nome")
      // Filters
      .eq('id', id)
      .single()

    if (users !== null) {
      console.log(users.nome)
      return users.nome
    }
    return ''

  }
}
