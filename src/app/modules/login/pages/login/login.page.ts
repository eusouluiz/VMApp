import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../../../core/state/session/session.service';
import { LoginApiBody } from '../../../../core/state/session/session.interface';
import { finalize, tap } from 'rxjs';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { IonInput } from '@ionic/angular';
import { Usuario } from '../../../../core/services/usuario-service/usuario.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('password', { static: false }) password: IonInput | undefined;

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

  submit() {
    // const cpfForm = this.form.value.cpf;
    // const senhaForm = this.form.value.senha;

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

          if (err?.original?.status === 422) {
            return;
          }
        },
      });

    // try {
    //   this.usuario = autenticar(cpfForm, senhaForm);
    //   var responsavelLogado: Responsavel | undefined = undefined;
    //   var funcionarioLogado: Funcionario | undefined = undefined;

    //   if (this.usuario) {
    //     console.log('logado com sucesso');
    //     switch (this.usuario.tipoUsuario) {
    //       case 'F': {
    //         console.log('funcionario');
    //         const funcionario = buscarFuncionario(this.usuario.idUsuario);
    //         if (funcionario === undefined) {
    //           throw new Error('Funcionario nao encontrado');
    //         }
    //         funcionarioLogado = funcionario;
    //         break;
    //       }
    //       case 'R': {
    //         console.log('responsavel');
    //         const responsavel = buscarResponsavel(this.usuario.idUsuario);
    //         if (responsavel === undefined) {
    //           throw new Error('Responsavel nao encontrado');
    //         }
    //         responsavelLogado = responsavel;
    //         break;
    //       }
    //       case 'A': {
    //         console.log('ambos');
    //         break;
    //       }
    //       default: {
    //         throw new Error('Usuario nao definido o tipo');
    //       }
    //     }
    //     this.sessionService.login(responsavelLogado, funcionarioLogado).subscribe();
    //     this.navegaParaApp();
    //   }
    // } catch (e: any) {
    //   console.log(e.message);
    // }
  }

  focusin(ev: any) {
    ev.stopPropagation();
  }

  private navegaParaApp() {
    this.router.navigate(['/app']);
  }
}

// // autentica e retorna o usuario encontrado
// function autenticar(cpfForm: String, senhaForm: String): Usuario {
//   const usuario = buscarUsuarioPorCpf(cpfForm);
//   if (usuario === undefined) {
//     throw new Error('Usuario nao encontrado');
//   }
//   if (isSenhaCorreta(usuario, senhaForm)) {
//     return usuario;
//   } else {
//     throw new Error('Senha incorreta');
//   }
// }

// function buscarUsuarioPorCpf(cpfForm: String): Usuario | undefined {
//   const listaUsuarios = USUARIO_DATA;

//   return listaUsuarios.find((u) => {
//     return u.cpf === cpfForm;
//   });
// }

// function isSenhaCorreta(usuario: Usuario, senhaForm: String) {
//   return usuario.senha === senhaForm;
// }

// function buscarResponsavel(idUsuario: Number): Responsavel | undefined {
//   const listaResponsaveis = RESPONSAVEL_DATA;

//   return listaResponsaveis.find((r) => {
//     return r.usuario.idUsuario === idUsuario;
//   });
// }

// function buscarFuncionario(idUsuario: Number): Funcionario | undefined {
//   const listaFuncionarios = FUNCIONARIO_DATA;

//   return listaFuncionarios.find((f) => {
//     return f.usuario.idUsuario === idUsuario;
//   });
// }
