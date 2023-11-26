import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../../../core/state/session/session.service';
import { LoginApiBody } from '../../../../core/state/session/session.interface';
import { finalize, tap } from 'rxjs';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { IonInput } from '@ionic/angular';
import { Usuario } from '../../../../core/state/gerenciamento/usuario/usuario.entity';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { UsuarioLogado } from '../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { AvisoService } from '../../../../core/state/aviso/aviso-service/aviso.service';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';

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
    private canalService: CanalService,
    private avisoService: AvisoService,
    private toastService: ToastService,
    private pageMenuService: PageMenuService
  ) {
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
    this.loading = false;
  }

  focusPassword() {
    this.password?.setFocus();
  }

  submit() {
    this.loading = true;

    const body: LoginApiBody = {
      cpf: this.form.controls.cpf.value,
      password: this.form.controls.password.value,
    };

    this.sessionService.login(body).subscribe({
      next: () => {
        this.sessionService.getUserInfo().subscribe({
          next: (usuario) => {
            this.canalService.buscarTodosCanaisMensagem().subscribe({
              next: (canal) => {
                this.avisoService.buscarTodosAvisos().subscribe();
                if (usuario.responsavel === null) {
                  this.form.reset();
                  this.navegaParaApp();
                } else {
                  this.canalService
                    .buscarCanalResponsavelTodos({ idResponsavel: usuario.responsavel.responsavel_id })
                    .subscribe({
                      next: () => {
                        this.form.reset();
                        this.navegaParaApp();
                      },
                      error: (err) => {
                        this.toastService.error('Falha ao realizar o login');
                        this.loading = false;

                        if (err?.original?.status === 422) {
                          return;
                        }
                      },
                    });
                }
              },
              error: (err) => {
                this.toastService.error('Falha ao realizar o login');
                this.loading = false;

                if (err?.original?.status === 422) {
                  return;
                }
              },
            });
          },
          error: (err) => {
            this.toastService.error('Falha ao realizar o login');
            this.loading = false;

            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      },
      error: (err) => {
        this.toastService.error('Falha ao realizar o login');
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
