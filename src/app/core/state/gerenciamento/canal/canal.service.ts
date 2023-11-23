import { ResponsavelService } from '../responsavel/responsavel.service';
import { Injectable } from '@angular/core';
import { CANAL_DATA, CANAL_RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Canal, CanalInterface, CanalResponsavel } from './canal.entity';
import { Responsavel } from '../responsavel/responsavel.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanalService {

  constructor(
    private responsavelService: ResponsavelService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private http: HttpClient,
  ) {

  }

  buscarTodosCanais(): Observable<CanalInterface[]> {
    return this.http
      .get<CanalInterface[]>(`${environment.api.endpoint}/canal`)
      .pipe(tap((canais) => this.saveCanaisInStorage(canais)));
  }

  buscarCanal(idCanal: string): Observable<CanalInterface>{
    return this.http
        .get<CanalInterface>(`${environment.api.endpoint}/canal/${idCanal}`)
        .pipe(tap((canal) => this.saveCanalInStorage(canal)));
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
    this.responsavelService.buscarResponsavel(idResponsavel).subscribe();
    const responsavel = new Responsavel()

    if (canal !== undefined && responsavel !== undefined) {
      var canalResponsavel: CanalResponsavel = new CanalResponsavel({
        canal_responsavel_id: '',
        canal_id: idCanal,
        responsavel_id: idResponsavel,
        updated_at: new Date(),
        created_at: new Date(),
      });
    } else {
      throw new Error('nao encontrado canal ou responsavel');
    }

    CANAL_RESPONSAVEL_DATA.push(canalResponsavel);
    return canalResponsavel.canal_responsavel_id;
  }

  saveCanaisInStorage(canais: CanalInterface[]) {
    this.gerenciamentoRepository.update({ canais: canais });
  }

  saveCanalInStorage(canal: CanalInterface): void {
      var canais = this.gerenciamentoRepository.canais()
      const indexCanal = canais.findIndex((canal) => {
          return canal.canal_id === canal.canal_id
      })
      canais[indexCanal] = canal

      this.gerenciamentoRepository.update({ canais: canais });
  }


}
