import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../shared/shared.module';
import { Mensagem } from '../../../../core/services/mensagem-service/mensagem.entity';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ]
})
export class MensagemComponent implements OnInit {

  @Input('mensagem') mensagem!: Mensagem
  @Input('idUsuario') idUsuario!: string

  hora!: string
  minuto!: string

  constructor() { 
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    // console.log(this.mensagem)
    // console.log(this.idUsuario)

  }

  resgatarHorario(){
    this.hora = formatarNumero(this.mensagem.data_envio.getHours())
    this.minuto = formatarNumero(this.mensagem.data_envio.getMinutes())

    return this.hora + ':' + this.minuto
  }

}

function formatarNumero(num: number): string{
  return num.toString().padStart(2, '00')
}
