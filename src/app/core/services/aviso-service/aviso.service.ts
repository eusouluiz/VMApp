import { Injectable } from '@angular/core';
import { AVISO_DATA, Aviso } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class AvisoService {

    buscarTodosAvisos(): Aviso[]{
        return AVISO_DATA
    }

    buscarAviso(idAviso: number): Aviso | undefined{
        return AVISO_DATA.find((m) => {
            return m.idAviso === idAviso
        })
    }

    incluirAviso(aviso: Aviso) {
        aviso.idAviso = AVISO_DATA[AVISO_DATA.length-1].idAviso + 1
        AVISO_DATA.push(aviso)
    }

    alterarAviso(aviso: Aviso) {
        var indexA = AVISO_DATA.findIndex((a) => {
            return a.idAviso === aviso.idAviso
        })
        if (indexA !== -1) {
            AVISO_DATA[indexA] = aviso
        } else {
            throw new Error('aviso nao encontrado')
        }
    }

    deletarAviso(idAviso: number) {
        var indexA = AVISO_DATA.findIndex((a) => {
            return a.idAviso === idAviso
        })
        if (indexA !== -1){
            AVISO_DATA.splice(indexA, 1)
        } else {
            throw new Error('aviso nao encontrado')
        }
    }

    // buscarMensagensCanalResponsavel(idCanalResponsavel: number): Aviso[]{
    //     var mensagens = AVISO_DATA.slice()
    //     return mensagens.filter((a) => {
    //         return a.idCanalResponsavel === idCanalResponsavel
    //     })
    // }

    // buscarUltimaMensagensCanalResponsavel(idCanalResponsavel: number): Aviso | undefined {
    //     var mensagens = AVISO_DATA.slice()
    //     mensagens = mensagens.filter((a) => {
    //         return a.idCanalResponsavel === idCanalResponsavel
    //     })
    //     if (mensagens.length > 0) {
    //         return mensagens[mensagens.length-1]
    //     } else {
    //         return undefined
    //     }
    // }

}