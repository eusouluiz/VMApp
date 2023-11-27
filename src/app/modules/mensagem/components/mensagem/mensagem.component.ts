import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../shared/shared.module';
import { Mensagem } from '../../../../core/state/mensagem/mensagem/mensagem.entity';
import { DataUtil } from '../../../../shared/utilities/data/data.utility';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SharedModule],
})
export class MensagemComponent implements OnInit {
  @Input('mensagem') mensagem!: Mensagem;

  @Input('idUsuario') idUsuario!: string;

  ngOnInit() { }

  ngAfterViewInit(): void {
    // console.log(this.mensagem)
    // console.log(this.idUsuario)
  }

  resgatarHorario() {
    const dia = this.formatarNumero(this.mensagem.data_envio.getDate())
    const mes = this.formatarNumero(this.mensagem.data_envio.getMonth())
    const hora = this.formatarNumero(this.mensagem.data_envio.getHours());
    const minuto = this.formatarNumero(this.mensagem.data_envio.getMinutes());

    const dataHoje = new Date()
    const diferencaDias = DataUtil.diferencaDias(dataHoje, this.mensagem.data_envio)

    var diaMes = ''
    if (diferencaDias > 1) {
      diaMes = `${dia}/${mes}`;
    } else {
      if (diferencaDias === 0){
        diaMes = 'Hoje'
      } else {
        diaMes = 'Ontem'
      }
    }
    return `${diaMes} - ${hora}:${minuto}`
  }

  private formatarNumero(num: number): string {
    return num.toString().padStart(2, '00');
  }
}
