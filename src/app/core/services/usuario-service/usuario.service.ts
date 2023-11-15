import { Injectable } from '@angular/core';
import { USUARIO_DATA, Usuario } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

    buscarTodosUsuarios(): Usuario[]{
        return USUARIO_DATA
    }

    buscarUsuario(idUsuario: number): Usuario | undefined{
        return USUARIO_DATA.find((u) => {
            return u.idUsuario === idUsuario
        })
    }

    incluirUsuario(usuario: Usuario) {
        usuario.idUsuario = USUARIO_DATA[USUARIO_DATA.length-1].idUsuario + 1
        USUARIO_DATA.push(usuario)
    }

    alterarUsuario(usuario: Usuario) {
        var indexR = USUARIO_DATA.findIndex((u) => {
            return u.idUsuario === usuario.idUsuario
        })
        if (indexR !== -1) {
            USUARIO_DATA[indexR] = usuario
        } else {
            throw new Error('usuario nao encontrado')
        }
    }

    deletarUsuario(idUsuario: number) {
        var indexR = USUARIO_DATA.findIndex((u) => {
            return u.idUsuario === idUsuario
        })
        if (indexR !== -1){
            USUARIO_DATA.splice(indexR, 1)
        } else {
            throw new Error('usuario nao encontrado')
        }
    }

}