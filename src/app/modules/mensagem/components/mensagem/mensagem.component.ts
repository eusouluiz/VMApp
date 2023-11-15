import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../shared/shared.module';
import { Mensagem } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SharedModule],
})
export class MensagemComponent implements OnInit {
  @Input('mensagem') mensagem!: Mensagem;

  @Input('idUsuario') idUsuario!: number;

  hora!: string;

  minuto!: string;

  ngOnInit() {}

  ngAfterViewInit(): void {
    // console.log(this.mensagem)
    // console.log(this.idUsuario)
  }

  resgatarHorario() {
    this.hora = this.formatarNumero(this.mensagem.dataHoraEnvio.getHours());
    this.minuto = this.formatarNumero(this.mensagem.dataHoraEnvio.getMinutes());

    return this.hora + ':' + this.minuto;
  }

  private formatarNumero(num: number): string {
    return num.toString().padStart(2, '00');
  }
}
