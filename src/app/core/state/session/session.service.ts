import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SessionApiService } from '../../api/session/session-api.service';
import { SessionRepository } from './session.repository';
import { Funcionario, Responsavel } from '../../../shared/utilities/entidade/entidade.utility';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private sessionRepository: SessionRepository, private sessionApiService: SessionApiService) {}

  login(responsavel: Responsavel | undefined, funcionario: Funcionario | undefined) {
    console.log('login')
    return this.sessionApiService.postLogin(responsavel, funcionario).pipe(
      tap((session) => {
        this.sessionRepository.update({ session: session });
      })
    );
  }

  logout() {
    return this.sessionApiService.postLogout().pipe(
      tap(() => {
        this.sessionRepository.update({ session: undefined });
      })
    );
  }
}
