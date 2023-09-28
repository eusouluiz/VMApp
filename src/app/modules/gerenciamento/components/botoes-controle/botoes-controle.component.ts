import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-botoes-controle',
  templateUrl: './botoes-controle.component.html',
  styleUrls: ['./botoes-controle.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ]
})
export class BotoesControleComponent implements OnInit {

  @Input('header') header: String = ''

  @Output('onEditar') onEditar = new EventEmitter<boolean>()
  @Output('onActionSheet') onActionSheet = new EventEmitter<any>()
  
  //deletar
  actionDeletar = [
    {
      text: 'Deletar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Não',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ]

  constructor() { }

  ngOnInit() {}

  editar(){
    this.onEditar.emit(true)
  }

  actionSheet(ev:any){
    this.onActionSheet.emit(ev)
  }

}
