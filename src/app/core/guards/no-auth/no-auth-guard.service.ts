import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionRepository } from '../../state/session/session.repository';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuardService {
  constructor(public router: Router, private sessionRepository: SessionRepository) {}

  canActivate() {
    return this.isNotLoggedIn();
  }

  isNotLoggedIn() {
    if (this.sessionRepository.isLoggedIn()) {
      this.router.navigate(['/app']);
      return false;
    }

    return true;
  }
}
