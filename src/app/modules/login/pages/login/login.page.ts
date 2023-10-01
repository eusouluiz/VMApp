import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppModule, Funcionario, Responsavel, Usuario } from '../../../../app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: UntypedFormGroup;

  constructor(
      private formBuilder: UntypedFormBuilder,
      private router: Router,
    ) {
    this.form = this.formBuilder.group({
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    });
    console.log(AppModule.usuarioLogado)
  }

  ngOnInit() {
  }

  submit() {
    const cpfForm = this.form.value.cpf
    const senhaForm = this.form.value.senha

    try {
      const usuario = autenticar(cpfForm, senhaForm)

      if(usuario){
        console.log('logado com sucesso')
        switch (usuario.tipoUsuario){
          case 'F': {
            console.log('funcionario')
            const funcionario = buscarFuncionario(usuario.idUsuario)
            if (funcionario === undefined) {
              throw new Error('Funcionario nao encontrado')
            }
            definirUsuarioLogado(funcionario)
            break
          }
          case 'R': {
            console.log('responsavel')
            const responsavel = buscarResponsavel(usuario.idUsuario)
            if (responsavel === undefined) {
              throw new Error('Responsavel nao encontrado')
            }
            definirUsuarioLogado(responsavel)
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
        console.log(AppModule.usuarioLogado)
        this.navegaParaApp()
      } 
    } catch (e: any) {
      console.log(e.message)
    }
  }

  private navegaParaApp(){
    this.router.navigate(['/app'])
  }

}


function autenticar(cpfForm: String, senhaForm: String): Usuario {
  const usuario = buscarUsuarioPorCpf(cpfForm)
  if (usuario === undefined){
    throw new Error("Usuario nao encontrado")
  }
  if(isSenhaCorreta(usuario, senhaForm)){
    return usuario
  } else {
    throw new Error("Senha incorreta")
  }
}

function buscarUsuarioPorCpf(cpfForm: String): Usuario | undefined {
  const listaUsuarios = AppModule.listaUsuarios

  return listaUsuarios.find((u) => {
    return u.cpf === cpfForm
  })
}

function isSenhaCorreta(usuario: Usuario, senhaForm: String) {
  return usuario.senha === senhaForm
}

function buscarResponsavel(idUsuario: Number): Responsavel | undefined {
  const listaResponsaveis = AppModule.listaResponsaveis

  return listaResponsaveis.find((r) => {
    return r.usuario.idUsuario === idUsuario
  })
}

function buscarFuncionario(idUsuario: Number): Funcionario | undefined {
  const listaFuncionarios = AppModule.listaFuncionarios

  return listaFuncionarios.find((f) => {
    return f.usuario.idUsuario === idUsuario
  })
}
function definirUsuarioLogado(usuarioLogado: Responsavel | Funcionario) {
  AppModule.usuarioLogado = usuarioLogado
}

