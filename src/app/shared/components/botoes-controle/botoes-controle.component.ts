import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetButton, ActionSheetController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-botoes-controle',
  templateUrl: './botoes-controle.component.html',
  styleUrls: ['./botoes-controle.component.scss'],
})
export class BotoesControleComponent implements OnInit {

  @Input() modoBotoes: string = 'editar'

  @Input('header') header: string = ''

  @Output('onEditar') onEditar = new EventEmitter<boolean>()
  @Output('onDeletar') onDeletar = new EventEmitter<any>()
  
  @Output('onSalvar') onSalvar = new EventEmitter<boolean>()
  @Output('onCancelar') onCancelar = new EventEmitter<boolean>()

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

  ngOnInit() { }

  editar() {
    this.onEditar.emit(true)
  }

  async deletar() {
    const actionSheet = await this.actionSheetController.create({
      header: this.header,
      buttons: this.actionDeletar
    })

    actionSheet.present()
  }

  salvar() {
    this.onSalvar.emit(true)
  }

  cancelar() {
    this.onCancelar.emit(true)
  }
}
