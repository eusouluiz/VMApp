import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionRepository } from '../../state/session/session.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, public sessionRepository: SessionRepository) {}

  canActivate(): boolean {
    return this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    console.log('guard isLoggedIn');
    if (!this.sessionRepository.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
