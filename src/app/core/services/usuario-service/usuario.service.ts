import { Injectable } from '@angular/core';
import { USUARIO_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Usuario, UsuarioInterface } from './usuario.entity';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
  ){

  }

  buscarTodosUsuarios(): Usuario[] {
    return USUARIO_DATA;
  }

  buscarUsuario(idUsuario: string): Usuario | undefined {
    return USUARIO_DATA.find((u) => {
      return u.user_id === idUsuario;
    });
  }

  incluirUsuario(usuario: UsuarioInterface): Observable<UsuarioInterface> {
    return this.http
      .post<UsuarioInterface>(`${environment.api.endpoint}/user`, usuario);
  }

  alterarUsuario(usuario: UsuarioInterface) {
    return this.http
      .put<UsuarioInterface>(`${environment.api.endpoint}/user/${usuario.user_id}`, usuario);
    // var indexR = USUARIO_DATA.findIndex((u) => {
    //   return u.user_id === usuario.user_id;
    // });
    // if (indexR !== -1) {
    //   USUARIO_DATA[indexR] = usuario;
    // } else {
    //   throw new Error('usuario nao encontrado');
    // }
  }

  deletarUsuario(idUsuario: string): Observable<UsuarioInterface[]>{
    return this.http
        .delete<UsuarioInterface[]>(`${environment.api.endpoint}/user/${idUsuario}`)
}
}
