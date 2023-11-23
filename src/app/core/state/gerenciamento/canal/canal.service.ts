import { ResponsavelService } from '../responsavel/responsavel.service';
import { Injectable } from '@angular/core';
import { CANAL_DATA, CANAL_RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Canal, CanalResponsavel } from './canal.entity';
import { Responsavel } from '../responsavel/responsavel.entity';

@Injectable({
  providedIn: 'root',
})
export class CanalService {
  constructor(private responsavelService: ResponsavelService) { }

  buscarTodosCanais(): Canal[] {
    return CANAL_DATA;
  }

  buscarCanal(idCanal: string): Canal | undefined {
    return CANAL_DATA.find((c) => {
      return c.canal_id === idCanal;
    });
  }

  incluirCanal(canal: Canal) {
    CANAL_DATA.push(canal);
  }

  alterarCanal(canal: Canal) {
    var indexC = CANAL_DATA.findIndex((c) => {
      return c.canal_id === canal.canal_id;
    });
    if (indexC !== -1) {
      CANAL_DATA[indexC] = canal;
    } else {
      throw new Error('canal nao encontrado');
    }
  }

  deletarCanal(idCanal: string) {
    var indexC = CANAL_DATA.findIndex((c) => {
      return c.canal_id === idCanal;
    });
    if (indexC !== -1) {
      CANAL_DATA.splice(indexC, 1);
    } else {
      throw new Error('canal nao encontrado');
    }
  }

  buscarIdCanalResponsavel(idCanal: string, idResponsavel: string): string | undefined {
    var idCanalResponsavel = CANAL_RESPONSAVEL_DATA.find((cr) => {
      return cr.canal.canal_id === idCanal && cr.responsavel.responsavel_id === idResponsavel;
    })?.canal_responsavel_id;

    return idCanalResponsavel;
  }

  buscarCanalResponsavel(idCanalResponsavel: string): CanalResponsavel | undefined {
    return CANAL_RESPONSAVEL_DATA.find((cr) => {
      return cr.canal_responsavel_id === idCanalResponsavel;
    });
  }

  incluirCanalResponsavel(idCanal: string, idResponsavel: string): string {
    const canal = this.buscarCanal(idCanal);
    this.responsavelService.buscarResponsavel(idResponsavel);
    const responsavel = new Responsavel()

    if (canal !== undefined && responsavel !== undefined) {
      var canalResponsavel: CanalResponsavel = new CanalResponsavel({
        canal_responsavel_id: '',
        canal_id: canal.canal_id,
        responsavel_id: responsavel.responsavel_id,
        updated_at: new Date(),
        created_at: new Date(),
      });
    } else {
      throw new Error('nao encontrado canal ou responsavel');
    }

    CANAL_RESPONSAVEL_DATA.push(canalResponsavel);
    return canalResponsavel.canal_responsavel_id;
  }
}
