import { UsuarioLogado } from './../../utilities/usuario-logado/usuario-logado.utility';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    public usuarioLogado: UsuarioLogado
  ) { }

  ngOnInit() {}


}
