import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from './pages/login/login.page';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, IonicModule],
})
export class LoginModule {}
