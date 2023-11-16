import { Injectable } from '@angular/core';
import { USUARIO_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Usuario } from './usuario.entity';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  buscarTodosUsuarios(): Usuario[] {
    return USUARIO_DATA;
  }

  buscarUsuario(idUsuario: string): Usuario | undefined {
    return USUARIO_DATA.find((u) => {
      return u.user_id === idUsuario;
    });
  }

  incluirUsuario(usuario: Usuario) {
    USUARIO_DATA.push(usuario);
  }

  alterarUsuario(usuario: Usuario) {
    var indexR = USUARIO_DATA.findIndex((u) => {
      return u.user_id === usuario.user_id;
    });
    if (indexR !== -1) {
      USUARIO_DATA[indexR] = usuario;
    } else {
      throw new Error('usuario nao encontrado');
    }
  }

  deletarUsuario(idUsuario: string) {
    var indexR = USUARIO_DATA.findIndex((u) => {
      return u.user_id === idUsuario;
    });
    if (indexR !== -1) {
      USUARIO_DATA.splice(indexR, 1);
    } else {
      throw new Error('usuario nao encontrado');
    }
  }
}
