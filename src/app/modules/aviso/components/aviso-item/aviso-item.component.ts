import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../shared/shared.module';
import { Aviso } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-aviso-item',
  templateUrl: './aviso-item.component.html',
  styleUrls: ['./aviso-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SharedModule],
})
export class AvisoItemComponent implements OnInit {
  @Input('aviso') aviso!: Aviso;

  @Output() onSelecionado = new EventEmitter<Aviso>();

  ngOnInit() {}

  selecionar() {
    this.onSelecionado.emit(this.aviso);
  }
}
