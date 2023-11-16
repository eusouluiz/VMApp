import { Injectable } from '@angular/core';
import { MENSAGEM_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Mensagem } from './mensagem.entity';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  buscarTodosMensagems(): Mensagem[] {
    return MENSAGEM_DATA;
  }

  buscarMensagem(idMensagem: string): Mensagem | undefined {
    return MENSAGEM_DATA.find((m) => {
      return m.mensagem_id === idMensagem;
    });
  }

  incluirMensagem(mensagem: Mensagem) {
    MENSAGEM_DATA.push(mensagem);
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

  buscarMensagensCanalResponsavel(idCanalResponsavel: string): Mensagem[] {
    var mensagens = MENSAGEM_DATA.slice();
    return mensagens.filter((m) => {
      return m.canal_responsavel_id === idCanalResponsavel;
    });
  }

  buscarUltimaMensagensCanalResponsavel(idCanalResponsavel: string): Mensagem | undefined {
    var mensagens = MENSAGEM_DATA.slice();
    mensagens = mensagens.filter((m) => {
      return m.canal_responsavel_id === idCanalResponsavel;
    });
    if (mensagens.length > 0) {
      return mensagens[mensagens.length - 1];
    } else {
      return undefined;
    }
  }
}
