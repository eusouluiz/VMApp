import { Injectable } from '@angular/core';
import { AVISO_RESPONSAVEL_DATA, RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Aviso, AvisoInterface, AvisoResponsavel } from './aviso.entity';
import { AvisoRepository } from '../aviso.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { ListaUtil } from '../../../../shared/utilities/lista/lista.utility';
import { Turma } from '../../gerenciamento/turma/turma.entity';
import { ResponsavelService } from '../../gerenciamento/responsavel/responsavel.service';
import { Responsavel } from '../../gerenciamento/responsavel/responsavel.entity';

interface ResponseGetAviso {
  data: AvisoInterface[]
}

interface ResponseAviso {
  msg: string,
  data: AvisoInterface,
}

interface AssociacaoTurmaAviso {
  id?: string,
  turma_id: string,
  aviso_id: string,
}

@Injectable({
  providedIn: 'root',
})
export class AvisoService {

  constructor(
    private responsavelService: ResponsavelService,
    private avisoRepository: AvisoRepository,
    private http: HttpClient,
  ) {

  }

  buscarTodosAvisos(): Observable<ResponseGetAviso> {
    return this.http
      .get<ResponseGetAviso>(`${environment.api.endpoint}/aviso`)
      .pipe(tap((response) => this.saveAvisosInStorage(response.data)));
  }

  buscarAviso(idAviso: string): Observable<AvisoInterface> {
    return this.http
      .get<AvisoInterface>(`${environment.api.endpoint}/aviso/${idAviso}`)
      .pipe(tap((aviso) => this.saveAvisoInStorage(aviso)));
  }

  incluirAviso(aviso: AvisoInterface): Observable<ResponseAviso> {
    return this.http
      .post<ResponseAviso>(`${environment.api.endpoint}/aviso`, aviso)
      .pipe(tap((response) => {
        if ((response.data.aviso_id !== undefined && response.data.aviso_id !== null)) {
          aviso.aviso_id = response.data.aviso_id
          aviso.data_publicacao = response.data.data_publicacao
        }
      }));
  }

  alterarAviso(aviso: AvisoInterface, avisoId: string): Observable<AvisoInterface> {
    return this.http
      .put<AvisoInterface>(`${environment.api.endpoint}/aviso/${avisoId}`, aviso);
  }

  deletarAviso(idAviso: string): Observable<AvisoInterface[]> {
    return this.http
      .delete<AvisoInterface[]>(`${environment.api.endpoint}/aviso/${idAviso}`)
  }

  vincularTurmas(aviso: Aviso, turmas: Turma[]) {
    var listaIdTurmasNovos: string[] = []
    turmas.forEach((turma) => {
      listaIdTurmasNovos.push(turma.turma_id)
    })

    listaIdTurmasNovos.forEach((id: string) => {
        const associacao: AssociacaoTurmaAviso = {
            aviso_id: aviso.aviso_id,
            turma_id: id,
        }
        this.vincularTurma(associacao).subscribe()
    })
  }

  vincularTurma(associacao: AssociacaoTurmaAviso): Observable<AssociacaoTurmaAviso> {
    return this.http
      .post<AssociacaoTurmaAviso>(`${environment.api.endpoint}/aviso-turma`, associacao);
  }

  desvincularTurma(associacao: AssociacaoTurmaAviso): Observable<AssociacaoTurmaAviso> {
    return this.http
      .delete<AssociacaoTurmaAviso>(`${environment.api.endpoint}/aviso-turma/${associacao.aviso_id}/${associacao.turma_id}`)
  }

  saveAvisosInStorage(avisos: AvisoInterface[]) {
    this.avisoRepository.update({ avisos: avisos });
  }

  saveAvisoInStorage(aviso: AvisoInterface): void {
    var avisos = this.avisoRepository.avisos()
    const indexAviso = avisos.findIndex((avisoStorage) => {
      return avisoStorage.aviso_id === aviso.aviso_id
    })

    if (indexAviso !== -1) {
      avisos[indexAviso] = aviso
    } else {
      avisos.push(aviso)
    }

    this.avisoRepository.update({ avisos: avisos });
  }

  removerAvisoInStorage(idAviso: string) {
      var avisos = this.avisoRepository.avisos()
      const indexAviso = avisos.findIndex((avisoStorage) => {
          return avisoStorage.aviso_id === idAviso
      })

      if (indexAviso !== -1) {
          avisos.splice(indexAviso, 1)
      } 

      this.avisoRepository.update({ avisos: avisos });
  }

  buscarIdAvisoResponsavel(idAviso: string, idResponsavel: string): string | undefined {
    var idAvisoResponsavel = AVISO_RESPONSAVEL_DATA.find((cr) => {
      return cr.aviso.aviso_id === idAviso && cr.responsavel.responsavel_id === idResponsavel;
    })?.aviso_responsavel_id;

    return idAvisoResponsavel;
  }

  buscarAvisoResponsavel(busca: { idAvisoResponsavel?: string, idAviso?: string, idResponsavel?: string, }): AvisoResponsavel[] | undefined {
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
    this.responsavelService.buscarResponsavel(idResponsavel);
    const responsavel = new Responsavel()

    if (aviso !== undefined && responsavel !== undefined) {
      var avisoResponsavel: AvisoResponsavel = new AvisoResponsavel({
        aviso_responsavel_id: '',
        aviso_id: '',
        responsavel_id: responsavel.responsavel_id,
        ind_visualizacao: false
      });
    } else {
      throw new Error('nao encontrado aviso ou responsavel');
    }

    AVISO_RESPONSAVEL_DATA.push(avisoResponsavel);
    return avisoResponsavel.aviso_responsavel_id;
  }

  alterarAvisoResponsavel(avisoResponsavel: AvisoResponsavel) {
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