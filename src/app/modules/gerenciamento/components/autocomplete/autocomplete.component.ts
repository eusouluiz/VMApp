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
  items!: String[];

  inicializaItens(){
    this.items = this.listaItens;
  }

  getItems(ev: any) {

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
        this.items = this.items.filter((item) => {
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
    this.enviaBusca(item)

    this.inicializaItens()
    this.busca = ''
  }

  selecionaPrimeiro(){
    console.log('buscado: ' + this.busca)
    console.log('selecionado: ' + this.items[0])
    this.getItems(this.busca)
    this.enviaBusca(this.items[0])

    this.inicializaItens()
    this.busca = ''
  }

  enviaBusca(busca: String){
    console.log('envia: ' + busca)
    this.onBusca.emit(busca)
  }

}
