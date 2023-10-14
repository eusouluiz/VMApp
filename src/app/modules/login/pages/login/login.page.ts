import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../../../core/state/session/session.service';
import { FUNCIONARIO_DATA, Funcionario, RESPONSAVEL_DATA, Responsavel, USUARIO_DATA, Usuario, logaData } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario!: Usuario
  form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sessionService: SessionService,
  ) {

    logaData()

    this.form = this.formBuilder.group({
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submit() {
    const cpfForm = this.form.value.cpf
    const senhaForm = this.form.value.senha

    try {
      this.usuario = autenticar(cpfForm, senhaForm)
      var responsavelLogado: Responsavel | undefined = undefined
      var funcionarioLogado: Funcionario | undefined = undefined

      if (this.usuario) {
        console.log('logado com sucesso')
        switch (this.usuario.tipoUsuario) {
          case 'F': {
            console.log('funcionario')
            const funcionario = buscarFuncionario(this.usuario.idUsuario)
            if (funcionario === undefined) {
              throw new Error('Funcionario nao encontrado')
            }
            funcionarioLogado = funcionario
            break
          }
          case 'R': {
            console.log('responsavel')
            const responsavel = buscarResponsavel(this.usuario.idUsuario)
            if (responsavel === undefined) {
              throw new Error('Responsavel nao encontrado')
            }
            responsavelLogado = responsavel
            break
          }
          case 'A': {
            console.log('ambos')
            break
          }
          default: {
            throw new Error('Usuario nao definido o tipo')
          }
        }
        console.log('responsavelLogado: ' + responsavelLogado)
        console.log('funcionarioLogado: ' + funcionarioLogado)
        this.sessionService.login(responsavelLogado, funcionarioLogado).subscribe()
        this.navegaParaApp()
      }
    } catch (e: any) {
      console.log(e.message)
    }
  }

  private navegaParaApp() {
    this.router.navigate(['/app'])
  }

}

// autentica e retorna o usuario encontrado
function autenticar(cpfForm: String, senhaForm: String): Usuario {
  const usuario = buscarUsuarioPorCpf(cpfForm)
  if (usuario === undefined) {
    throw new Error("Usuario nao encontrado")
  }
  if (isSenhaCorreta(usuario, senhaForm)) {
    return usuario
  } else {
    throw new Error("Senha incorreta")
  }
}

function buscarUsuarioPorCpf(cpfForm: String): Usuario | undefined {
  const listaUsuarios = USUARIO_DATA

  return listaUsuarios.find((u) => {
    return u.cpf === cpfForm
  })
}

function isSenhaCorreta(usuario: Usuario, senhaForm: String) {
  return usuario.senha === senhaForm
}

function buscarResponsavel(idUsuario: Number): Responsavel | undefined {
  const listaResponsaveis = RESPONSAVEL_DATA

  return listaResponsaveis.find((r) => {
    return r.usuario.idUsuario === idUsuario
  })
}

function buscarFuncionario(idUsuario: Number): Funcionario | undefined {
  const listaFuncionarios = FUNCIONARIO_DATA

  return listaFuncionarios.find((f) => {
    return f.usuario.idUsuario === idUsuario
  })
}

