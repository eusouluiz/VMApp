import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../shared/shared.module';
import { Mensagem } from '../../../../core/state/mensagem/mensagem-service/mensagem.entity';

@Component({
  selector: 'app-envio-mensagem',
  templateUrl: './envio-mensagem.component.html',
  styleUrls: ['./envio-mensagem.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SharedModule],
})
export class EnvioMensagemComponent implements OnInit {
  @Output() onEnvio = new EventEmitter<Mensagem>();

  @ViewChild('campoTexto') campoTexto!: HTMLIonTextareaElement;

  constructor() { }

  preventEnter(ev: any) {
    ev.preventDefault();
  }

  ngOnInit() { }

  enviarMensagem() {
    const val = this.campoTexto.value;
    if (val !== undefined && val !== null) {
      const mensagem: Mensagem = new Mensagem();
      mensagem.texto = val;
      this.onEnvio.emit(mensagem);
    }

    this.apagarCampoMensagem();
  }

  apagarCampoMensagem() {
    this.campoTexto.value = '';
  }
}
