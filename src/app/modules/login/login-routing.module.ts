import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { NoAuthGuardService } from '../../core/guards/no-auth/no-auth-guard.service';

<<<<<<< HEAD
const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [NoAuthGuardService],
  },
];
=======
const routes: Routes = [{ path: '', component: LoginPage }];

>>>>>>> main
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
<<<<<<< HEAD
export class LoginRoutingModule {}
=======
export class LoginRoutingModule {
  static components = [LoginPage];
}
>>>>>>> main
