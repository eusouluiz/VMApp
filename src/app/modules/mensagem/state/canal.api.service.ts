import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanalRepository } from './canal.repository';
import { CanalInterface } from '../../../core/services/canal-service/canal.entity';
import { CANAL_DATA } from '../../../shared/utilities/entidade/entidade.utility';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CanalApiService {
  constructor(private http: HttpClient, private canalRepository: CanalRepository) {}

  getCanais(): Observable<CanalInterface[]> {
    // const params = {};
    // return this.http.get<CanalInterface[]>(`${environment.api.endpoint}/canais`, { params: params }).pipe(
    //   tap((res) => {
    //     this.mensagemRepository.setCanais(res);
    //   })
    // );
    let canais: CanalInterface[] = CANAL_DATA.map((canal) => {
      return {
        canal_id: canal.canal_id,
        nome: canal.nome,
        descricao: canal.descricao,
        updated_at: new Date(),
        created_at: new Date(),
      };
    });

    this.canalRepository.setCanais(canais);

    return new Observable((observer) => {
      observer.next(canais);
    });
  }
}
