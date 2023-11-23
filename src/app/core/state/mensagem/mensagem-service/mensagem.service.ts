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

  buscarTodosMensagems(): Mensagem[] {
    return MENSAGEM_DATA;
  }

  buscarMensagem(idMensagem: string): Mensagem | undefined {
    return MENSAGEM_DATA.find((m) => {
      return m.mensagem_id === idMensagem;
    });
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
  
  armazenarMensagens(mensagens: MensagemInterface[] | null, idCanalResponsavel: string) {
    if (mensagens !== null) {
      const canais = this.mensagemRepository.canais()
      
      const indexCanal = canais.findIndex((canal) => {
        return canal.canal_responsavel_id = idCanalResponsavel
      })
  
      const canal: CanalMensagem = {
        canal_responsavel_id: idCanalResponsavel,
        mensagens: mensagens
      }
  
      if (indexCanal !== -1){
        canais[indexCanal] = canal
      } else {
        canais.push(canal)
      }
  
      this.mensagemRepository.update({canais:canais})
    }
  }

  saveCanalMensagemInStorage(mensagens: MensagemInterface[], idCanalResponsavel: string): void {
  }
}
