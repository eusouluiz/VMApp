import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { NoAuthGuardService } from '../../core/guards/no-auth/no-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [NoAuthGuardService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
