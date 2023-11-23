import { Injectable } from '@angular/core';
import { MENSAGEM_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Mensagem, MensagemInterface } from './mensagem.entity';
import { CanaisMensagem, MensagemRepository } from '../mensagem.repository';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CanalResponsavelInterface } from '../../gerenciamento/canal/canal.entity';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {

  constructor(
    private mensagemRepository: MensagemRepository,
    private http: HttpClient,
  ) {

  }

  buscarTodosMensagems(): Mensagem[] {
    return MENSAGEM_DATA;
  }

  buscarMensagem(idMensagem: string): Mensagem | undefined {
    return MENSAGEM_DATA.find((m) => {
      return m.mensagem_id === idMensagem;
    });
  }

  incluirMensagem(mensagem: Mensagem) {
    MENSAGEM_DATA.unshift(mensagem);
  }

  alterarMensagem(mensagem: Mensagem) {
    var indexA = MENSAGEM_DATA.findIndex((m) => {
      return m.mensagem_id === mensagem.mensagem_id;
    });
    if (indexA !== -1) {
      MENSAGEM_DATA[indexA] = mensagem;
    } else {
      throw new Error('mensagem nao encontrado');
    }
  }

  deletarMensagem(idMensagem: string) {
    var indexA = MENSAGEM_DATA.findIndex((m) => {
      return m.mensagem_id === idMensagem;
    });
    if (indexA !== -1) {
      MENSAGEM_DATA.splice(indexA, 1);
    } else {
      throw new Error('mensagem nao encontrado');
    }
  }

  buscarMensagensCanalResponsavel(idCanalResponsavel: string): Observable<MensagemInterface[]> {
    return this.http
      .get<MensagemInterface[]>(`${environment.api.endpoint}/mensagem`)
      .pipe(tap((mensagens) => this.saveCanalMensagemInStorage(mensagens, idCanalResponsavel)));
    // var mensagens = MENSAGEM_DATA.slice();
    // return mensagens.filter((m) => {
    //   return m.canal_responsavel_id === idCanalResponsavel;
    // });
  }
  
  buscarUltimaMensagensCanalResponsavel(idCanalResponsavel: string): Mensagem | undefined {
    var mensagens = MENSAGEM_DATA.slice();
    mensagens = mensagens.filter((m) => {
      return m.canal_responsavel_id === idCanalResponsavel;
    }).sort((m1, m2) => {
      if (m1.data_envio > m2.data_envio) {
        return 1;
      } else if (m2.data_envio > m1.data_envio) {
        return -1;
      } else {
        return 0;
      }
    });
    if (mensagens.length > 0) {
      return mensagens[mensagens.length - 1];
    } else {
      return undefined;
    }
  }

  saveCanalMensagemInStorage(canalResponsavel: MensagemInterface[], idCanalResponsavel: string): void {
    const canais = this.mensagemRepository.canais()
    const indexCanal = canais.findIndex((canal) => {
      return canal.canal_responsavel_id = idCanalResponsavel
    })

    //TODO continuar a busca de mensagens

  }
}
