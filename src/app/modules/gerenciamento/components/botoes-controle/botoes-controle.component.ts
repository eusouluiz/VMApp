import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ActionSheetButton, ActionSheetController, IonicModule } from '@ionic/angular';

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

  @Input('header') header: string = ''

  @Output('onEditar') onEditar = new EventEmitter<boolean>()
  @Output('onDeletar') onDeletar = new EventEmitter<any>()
  
  //deletar
  actionDeletar: (string | ActionSheetButton<any>)[] = [
    {
      text: 'Deletar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
      handler: () => {
        this.onDeletar.emit(true)
      }
    },
    {
      text: 'Não',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ]

  constructor(
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {}

  editar(){
    this.onEditar.emit(true)
  }

  async deletar() {
    const actionSheet = await this.actionSheetController.create({
      header: this.header,
      buttons: this.actionDeletar
    })

    actionSheet.present()
  }

}
