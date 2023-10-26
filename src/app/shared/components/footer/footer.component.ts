import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsuarioLogado } from './../../utilities/usuario-logado/usuario-logado.utility';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  caminhoUrl: string = ''

  constructor(
    private router: Router,
    public usuarioLogado: UsuarioLogado
  ) { 
    router.events.subscribe((e) =>{
      if (e instanceof NavigationEnd){
        this.caminhoUrl = router.url
        // console.log(this.caminhoUrl)
      }
    })
  }

  ngOnInit() {}
  
  isCanalMensagem(){
    const separacaoCaminhoUrl = this.caminhoUrl.split('/')
    return separacaoCaminhoUrl.length === 5 && separacaoCaminhoUrl[separacaoCaminhoUrl.length-1] === 'canal'
  }


}
