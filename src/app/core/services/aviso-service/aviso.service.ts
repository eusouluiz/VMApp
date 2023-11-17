import { Injectable } from '@angular/core';
import { AVISO_DATA, AVISO_RESPONSAVEL_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Aviso, AvisoResponsavel } from './aviso.entity';
import { ResponsavelService } from '../responsavel-service/responsavel.service';

@Injectable({
  providedIn: 'root',
})
export class AvisoService {

  constructor(private responsavelService: ResponsavelService) { }

  buscarTodosAvisos(): Aviso[] {
    return AVISO_DATA
  }

  buscarAviso(idAviso: string): Aviso | undefined {
    return AVISO_DATA.find((m) => {
      return m.aviso_id === idAviso
    })
  }

  incluirAviso(aviso: Aviso) {
    AVISO_DATA.push(aviso)
  }

  alterarAviso(aviso: Aviso) {
    var indexA = AVISO_DATA.findIndex((a) => {
      return a.aviso_id === aviso.aviso_id
    })
    if (indexA !== -1) {
      AVISO_DATA[indexA] = aviso
    } else {
      throw new Error('aviso nao encontrado')
    }
  }

  deletarAviso(idAviso: string) {
    var indexA = AVISO_DATA.findIndex((a) => {
      return a.aviso_id === idAviso
    })
    if (indexA !== -1) {
      AVISO_DATA.splice(indexA, 1)
    } else {
      throw new Error('aviso nao encontrado')
    }
  }

  buscarIdAvisoResponsavel(idAviso: string, idResponsavel: string): string | undefined {
    var idAvisoResponsavel = AVISO_RESPONSAVEL_DATA.find((cr) => {
      return cr.aviso.aviso_id === idAviso && cr.responsavel.responsavel_id === idResponsavel;
    })?.aviso_responsavel_id;

    return idAvisoResponsavel;
  }

  buscarAvisoResponsavel(busca: {idAvisoResponsavel?: string, idAviso?: string, idResponsavel?: string, }): AvisoResponsavel[] | undefined {
    if (busca.idAvisoResponsavel !== undefined) {
      return AVISO_RESPONSAVEL_DATA.filter((cr) => {
        return cr.aviso_responsavel_id === busca.idAvisoResponsavel;
      });
    } else if (busca.idAviso !== undefined && busca.idResponsavel !== undefined) {
      return AVISO_RESPONSAVEL_DATA.filter((cr) => {
        return cr.aviso.aviso_id === busca.idAviso && cr.responsavel.responsavel_id === busca.idResponsavel;
      });
    } else if (busca.idAviso !== undefined) {
      return AVISO_RESPONSAVEL_DATA.filter((cr) => {
        return cr.aviso.aviso_id === busca.idAviso;
      });
    } else if (busca.idResponsavel !== undefined) {
      return AVISO_RESPONSAVEL_DATA.filter((cr) => {
        return cr.responsavel.responsavel_id === busca.idResponsavel;
      });
    } 
    return undefined
  }

  incluirAvisoResponsavel(idAviso: string, idResponsavel: string): string {
    const aviso = this.buscarAviso(idAviso);
    const responsavel = this.responsavelService.buscarResponsavel(idResponsavel);

    if (aviso !== undefined && responsavel !== undefined) {
      var avisoResponsavel: AvisoResponsavel = new AvisoResponsavel({
        aviso_responsavel_id: '',
        aviso_id: aviso.aviso_id,
        responsavel_id: responsavel.responsavel_id,
        ind_visualizacao: false
      });
    } else {
      throw new Error('nao encontrado aviso ou responsavel');
    }

    AVISO_RESPONSAVEL_DATA.push(avisoResponsavel);
    return avisoResponsavel.aviso_responsavel_id;
  }

  alterarAvisoResponsavel(avisoResponsavel: AvisoResponsavel){
    var indexA = AVISO_RESPONSAVEL_DATA.findIndex((ar) => {
      return ar.aviso_responsavel_id === avisoResponsavel.aviso_responsavel_id
    })
    if (indexA !== -1) {
      AVISO_RESPONSAVEL_DATA[indexA] = avisoResponsavel
    } else {
      throw new Error('aviso nao encontrado')
    }
  }

}