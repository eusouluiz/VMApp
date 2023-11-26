import { Injectable } from '@angular/core';
import { MENSAGEM_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Mensagem, MensagemInterface } from './mensagem.entity';
import { CanalMensagem, MensagemRepository } from '../mensagem.repository';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CanalResponsavelInterface } from '../../gerenciamento/canal/canal.entity';
import { DataUtil } from '../../../../shared/utilities/data/data.utility';

interface ResponseMensagem {
  msg: string;
  data: MensagemInterface;
}

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  constructor(private mensagemRepository: MensagemRepository, private http: HttpClient) {}

  incluirMensagem(mensagem: MensagemInterface): Observable<ResponseMensagem> {
    return this.http.post<ResponseMensagem>(`${environment.api.endpoint}/mensagem`, mensagem).pipe(
      tap((response) => {
        mensagem.mensagem_id = response.data.mensagem_id;
        this.armazenarMensagem(mensagem);
      })
    );
  }

  alterarMensagem(mensagem: MensagemInterface): Observable<MensagemInterface> {
    const msg: MensagemInterface = {
      texto: mensagem.texto,
      arquivo: mensagem.arquivo,
      data_envio: DataUtil.converterDataServico(mensagem.data_envio),
      lida: mensagem.lida,
      user_id: mensagem.user_id,
      canal_responsavel_id: mensagem.canal_responsavel_id,
    };

    return this.http.put<MensagemInterface>(`${environment.api.endpoint}/mensagem/${mensagem.id}`, msg);
  }

  armazenarMensagens(mensagens: MensagemInterface[] | null, idCanalResponsavel: string) {
    if (mensagens !== null) {
      const canais = this.mensagemRepository.canais();

      const indexCanal = canais.findIndex((canal) => {
        return canal.canal_responsavel_id === idCanalResponsavel;
      });

      if (indexCanal !== -1) {
        canais[indexCanal].mensagens = mensagens;
      }

      this.mensagemRepository.update({ canais: canais });
    }
  }

  armazenarMensagem(mensagem: MensagemInterface, idCanal?: string, idResponsavel?: string) {
    const canais = this.mensagemRepository.canais();

    console.log(canais);
    console.log(mensagem.canal_responsavel_id);

    const indexCanal = canais.findIndex((canal) => {
      return canal.canal_responsavel_id === mensagem.canal_responsavel_id;
    });
    console.log(indexCanal);

    if (indexCanal !== -1) {
      canais[indexCanal].mensagens?.unshift(mensagem);
    } else {
      var novoCanalMensagem: CanalMensagem = {
        canal_responsavel_id: mensagem.canal_responsavel_id,
        mensagens: [mensagem],
      };
      canais.push(novoCanalMensagem);
    }

    console.log(canais);

    this.mensagemRepository.update({ canais: canais });
  }
}
