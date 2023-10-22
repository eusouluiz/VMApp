import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string = ''
  @Input() botaoRetorno: boolean = false
  @Input() location!: Location

  constructor() { }

  ngOnInit() { }

  retornarPagina(){
    if (this.location !== undefined){
      this.location.back()
    }
  }

}
