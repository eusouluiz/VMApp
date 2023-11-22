import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
})
export class RefresherComponent implements OnInit {

  @Output() onRecarregar = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  recarregarPagina(ev:any){
    this.onRecarregar.emit(ev)
    setTimeout(() => {
      ev.target.complete();
    }, 1000);
  }

}
