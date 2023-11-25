import { Injectable } from '@angular/core';
import { MENSAGEM_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Mensagem, MensagemInterface } from './mensagem.entity';
import { CanalMensagem, MensagemRepository } from '../mensagem.repository';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CanalResponsavelInterface } from '../../gerenciamento/canal/canal.entity';
import { DataUtil } from '../../../../shared/utilities/data/data.utility';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {

  constructor(
    private mensagemRepository: MensagemRepository,
    private http: HttpClient,
  ) {

  }

  incluirMensagem(mensagem: MensagemInterface): Observable<MensagemInterface> {
    return this.http
      .post<MensagemInterface>(`${environment.api.endpoint}/mensagem`, mensagem);
  }

  alterarMensagem(mensagem: MensagemInterface): Observable<MensagemInterface> {
    const msg: MensagemInterface = {
      texto: mensagem.texto,
      arquivo: mensagem.arquivo,
      data_envio: DataUtil.converterDataServico(mensagem.data_envio),
      lida: mensagem.lida,
      user_id: mensagem.user_id,
      canal_responsavel_id: mensagem.canal_responsavel_id,
    }
    
    return this.http
      .put<MensagemInterface>(`${environment.api.endpoint}/mensagem/${mensagem.id}`, msg);
  }
  
  armazenarMensagens(mensagens: MensagemInterface[] | null, idCanalResponsavel: string) {
    if (mensagens !== null) {
      const canais = this.mensagemRepository.canais()

      console.log(canais)
      console.log(idCanalResponsavel)
      
      const indexCanal = canais.findIndex((canal) => {
        return canal.canal_responsavel_id === idCanalResponsavel
      })
      console.log(indexCanal)

      if (indexCanal !== -1) {
        canais[indexCanal].mensagens = mensagens
      }
  
      this.mensagemRepository.update({canais:canais})
    }
  }

}
