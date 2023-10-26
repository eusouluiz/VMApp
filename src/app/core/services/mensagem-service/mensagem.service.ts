import { Injectable } from '@angular/core';
import { MENSAGEM_DATA, Mensagem } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {

    buscarTodosMensagems(): Mensagem[]{
        return MENSAGEM_DATA
    }

    buscarMensagem(idMensagem: number): Mensagem | undefined{
        return MENSAGEM_DATA.find((m) => {
            return m.idMensagem === idMensagem
        })
    }

    incluirMensagem(mensagem: Mensagem) {
        mensagem.idMensagem = MENSAGEM_DATA[MENSAGEM_DATA.length-1].idMensagem + 1
        MENSAGEM_DATA.push(mensagem)
    }

    alterarMensagem(mensagem: Mensagem) {
        var indexA = MENSAGEM_DATA.findIndex((m) => {
            return m.idMensagem === mensagem.idMensagem
        })
        if (indexA !== -1) {
            MENSAGEM_DATA[indexA] = mensagem
        } else {
            throw new Error('mensagem nao encontrado')
        }
    }

    deletarMensagem(idMensagem: number) {
        var indexA = MENSAGEM_DATA.findIndex((m) => {
            return m.idMensagem === idMensagem
        })
        if (indexA !== -1){
            MENSAGEM_DATA.splice(indexA, 1)
        } else {
            throw new Error('mensagem nao encontrado')
        }
    }

    buscarMensagensCanalResponsavel(idCanalResponsavel: number): Mensagem[]{
        var mensagens = MENSAGEM_DATA.slice()
        return mensagens.filter((m) => {
            return m.idCanalResponsavel === idCanalResponsavel
        })
    }

}