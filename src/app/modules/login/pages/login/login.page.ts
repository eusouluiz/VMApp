import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../../../core/state/session/session.service';
import { LoginApiBody } from '../../../../core/state/session/session.interface';
import { finalize, tap } from 'rxjs';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { IonInput } from '@ionic/angular';
import { Usuario } from '../../../../core/state/gerenciamento/usuario/usuario.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('password', { static: false }) password: IonInput | undefined;

  loading = false;

  usuario!: Usuario;
  // form: UntypedFormGroup;

  form: FormGroup<{ cpf: FormControl; password: FormControl }>;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private toastService: ToastService
  ) {
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.loading = false;
  }

  submit() {
    // const cpfForm = this.form.value.cpf;
    // const senhaForm = this.form.value.senha;

    this.loading = true;

    const body: LoginApiBody = {
      cpf: this.form.controls.cpf.value,
      password: this.form.controls.password.value,
    };

    this.sessionService
      .login(body)
      .pipe(
        tap(() => this.sessionService.getUserInfo().subscribe()),
        finalize(() => {
          // this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.form.reset();
          this.navegaParaApp();
        },
        error: (err) => {
          this.toastService.error(err?.message);
          this.loading = false;

          if (err?.original?.status === 422) {
            return;
          }
        },
      });
  }

  focusin(ev: any) {
    ev.stopPropagation();
  }

  private navegaParaApp() {
    this.router.navigate(['/app']);
  }
}