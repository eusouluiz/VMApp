import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from './pages/login/login.page';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFieldInputComponent } from './components/field-input/field-input.component';
import { LoginFieldPasswordComponent } from './components/field-password/field-password.component';

@NgModule({
  declarations: [LoginPage, LoginFieldInputComponent, LoginFieldPasswordComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, IonicModule],
})
export class LoginModule {}
