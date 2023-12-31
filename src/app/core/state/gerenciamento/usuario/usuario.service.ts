import { Injectable } from '@angular/core';
import { UsuarioInterface } from './usuario.entity';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ResponseUser {
  msg: string,
  data: UsuarioInterface,
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
  ) {

  }

  incluirUsuario(usuario: UsuarioInterface): Observable<ResponseUser> {
    return this.http
      .post<ResponseUser>(`${environment.api.endpoint}/user`, usuario)
      .pipe(tap((response) => {
        usuario.user_id = response.data.user_id
        if ((response.data.responsavel_id !== undefined && response.data.responsavel_id !== null) ||
            (response.data.funcionario_id !== undefined && response.data.funcionario_id !== null)) {
          if (usuario.tipo === 'F'){
            usuario.funcionario_id = response.data.funcionario_id
          } else if(usuario.tipo === 'R') {
            usuario.responsavel_id = response.data.responsavel_id
          } else {
            usuario.funcionario_id = response.data.funcionario_id
            usuario.responsavel_id = response.data.responsavel_id
          }
        }
      }));
  }

  alterarUsuario(usuario: UsuarioInterface, usuarioId: string): Observable<UsuarioInterface> {
    return this.http
      .put<UsuarioInterface>(`${environment.api.endpoint}/user/${usuarioId}`, usuario);
  }

  deletarUsuario(idUsuario: string): Observable<UsuarioInterface[]> {
    return this.http
      .delete<UsuarioInterface[]>(`${environment.api.endpoint}/user/${idUsuario}`)
  }
}
