import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    SharedModule,
    CommonModule,
    FormsModule
  ]
})
export class AutocompleteComponent implements OnInit {

  @Input('listaItens') listaItens!: String[]
  @Input('textoSemResultado') textoSemResultado!: String
  
  @Output() onBusca = new EventEmitter<String>()

  @ViewChild('barraBusca') barraBusca: any;
  
  busca!: string
  primeiroItem!: string

  constructor() { }

  ngOnInit() { 
    console.log(this.listaItens)
    this.inicializaItens()
  }

  isItensVisiveis = false;
  itens!: String[];

  inicializaItens(){
    this.itens = this.listaItens;
  }

  getItens(ev: any) {

      // reseta busca
      this.inicializaItens();

      // seta o valor a o que esta vindo da busca
      var val = '';
      if (typeof ev !== 'undefined'){
        val = typeof ev !== typeof 'string' ? ev.target.value : ev;
      }

      // se o valor for um valor valido
      if (val) {
        this.isItensVisiveis = true;
        this.itens = this.itens.filter((item) => {
            return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
  }

  mudarVisualizacaoItens(){
    this.isItensVisiveis = !this.isItensVisiveis
  }

  selecionarItem(item: any){
    this.barraBusca.setFocus()
    console.log('selecionado: ' + item)
    
    const idBusca = item === -1 ? -1 : this.listaItens.indexOf(item) 
    this.enviaBusca(idBusca)

    this.inicializaItens()
    this.busca = ''
  }

  selecionaPrimeiro(){
    console.log('buscado: ' + this.busca)
    console.log('selecionado: ' + this.itens[0])
    this.getItens(this.busca)

    const idBusca = this.itens.length === 0 ? -1 : this.listaItens.indexOf(this.itens[0])
    this.enviaBusca(idBusca)

    this.inicializaItens()
    this.busca = ''
  }

  // envia id da lista
  // -1 quando busca nao encontrada
  enviaBusca(busca: Number){
    console.log('envia: ' + busca)
    this.onBusca.emit(String(busca))
  }

}
