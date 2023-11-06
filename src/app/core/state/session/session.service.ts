import { Injectable } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { SessionApiService } from '../../api/session/session-api.service';
import { SessionRepository } from './session.repository';
import { LoginApiBody, LoginApiResponse, UserInfoApiResponse } from './session.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private sessionRepository: SessionRepository,
    private sessionApiService: SessionApiService,
    private http: HttpClient
  ) {}

  // login(responsavel: Responsavel | undefined, funcionario: Funcionario | undefined) {
  //   console.log('login')
  //   return this.sessionApiService.postLogin(responsavel, funcionario).pipe(
  //     tap((session) => {
  //       this.sessionRepository.update({ session: session });
  //     })
  //   );
  // }

  login(body: LoginApiBody): Observable<LoginApiResponse> {
    return this.http
      .post<LoginApiResponse>(`${environment.api.endpoint}/auth/login`, body)
      .pipe(tap((session) => this.saveSessionInStorage(session)));
  }

  /* Gets user info and send it to the storage */
  getUserInfo(): Observable<UserInfoApiResponse> {
    return this.http.get<UserInfoApiResponse>(`${environment.api.endpoint}/auth/user`).pipe(
      // only passes if res has value
      filter((res) => !!res),
      tap((usuarioLogado) => this.saveUserInfoInStorage(usuarioLogado))
    );
  }

  logout() {
    return this.sessionApiService.postLogout().pipe(
      tap(() => {
        this.sessionRepository.update({ session: undefined });
      })
    );
  }

  private saveUserInfoInStorage(userData: UserInfoApiResponse) {
    this.sessionRepository.update({ userInfo: userData });
  }

  private saveSessionInStorage(session: LoginApiResponse | undefined) {
    const sessionData = session ? { accessToken: session.token, expiresAt: session.expires_at } : undefined;
    this.sessionRepository.update({ session: sessionData });
  }
}
