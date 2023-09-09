import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  

  submit() {
    console.log(this.form.value)
    console.log(this.form)
    const loginForm = this.form.value.login
    const senhaForm = this.form.value.senha
    if(loginForm === 'login' && senhaForm === 'senha123'){
      console.log('logado com sucesso')
      this.router.navigate(['/app'])
    } else {
      console.log('login ou senha invalida')
    }
  }
}
