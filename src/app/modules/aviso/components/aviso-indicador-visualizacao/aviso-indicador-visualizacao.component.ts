import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AvisoResponsavel } from '../../../../core/services/aviso-service/aviso.entity';

@Component({
  selector: 'app-aviso-indicador-visualizacao',
  templateUrl: './aviso-indicador-visualizacao.component.html',
  styleUrls: ['./aviso-indicador-visualizacao.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AvisoIndicadorVisualizacaoComponent implements OnInit {

  @Input() listaAvisoResponsavel: AvisoResponsavel[] = []

  constructor() { }

  ngOnInit() {}

  retornarListaAvisoResponsavelPorIndVisualizacao(indVisualizacao: boolean): AvisoResponsavel[]{
    return this.listaAvisoResponsavel.filter((ar) => {
      return ar.ind_visualizacao === indVisualizacao
    })
  }
}
