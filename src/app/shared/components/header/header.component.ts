import { Component, Input, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/toasts/services/toast-service/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';

  @Input() botaoRetorno: boolean = false;

  supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

  constructor(
    private toastService: ToastService
  ) {
    this.inscreverNotificacao()
  }

  ngOnInit() { }

  inscreverNotificacao(){
    const mensagens = this.supabase.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensagens' },
        async (payload) => {
          console.log('Change received!', payload)

          var nome = await this.getUsuarioNome(payload.new.user_id)
          console.log(nome)
          this.toastService.message(nome + ': ' + payload.new.texto)
        }
      )
      .subscribe()
  }

  async getUsuarioNome(id: string): Promise<string>{

    let { data: users, error } = await this.supabase
      .from('users')
      .select("nome")
      // Filters
      .eq('id', id)

    if (users !== null) {
      console.log(users[0].nome)
      return users[0].nome
    }
    return ''

  }
}
