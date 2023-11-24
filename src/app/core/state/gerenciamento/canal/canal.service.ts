import { Injectable } from '@angular/core';
import { CANAL_RESPONSAVEL_DATA, RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Canal, CanalInterface, CanalResponsavel } from './canal.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Cargo } from '../cargo/cargo.entity';
import { ListaUtil } from '../../../../shared/utilities/lista/lista.utility';

interface AssociacaoCargoCanal {
    id?: string,
    cargo_id: string,
    canal_id: string,
}

interface ResponseCanal {
    msg: string,
    data: CanalInterface,
}

@Injectable({
    providedIn: 'root',
})
export class CanalService {

    constructor(
        private gerenciamentoRepository: GerenciamentoRepository,
        private http: HttpClient,
    ) {

    }

    buscarTodosCanais(): Observable<CanalInterface[]> {
        return this.http
            .get<CanalInterface[]>(`${environment.api.endpoint}/canal`)
            .pipe(tap((canais) => this.saveCanaisInStorage(canais)));
    }

    buscarCanal(idCanal: string): Observable<CanalInterface> {
        return this.http
            .get<CanalInterface>(`${environment.api.endpoint}/canal/${idCanal}`)
            .pipe(tap((canal) => this.saveCanalInStorage(canal)));
    }

    incluirCanal(canal: CanalInterface): Observable<ResponseCanal> {
        return this.http
            .post<ResponseCanal>(`${environment.api.endpoint}/canal`, canal)
            .pipe(tap((response) => {
                if ((response.data.canal_id !== undefined && response.data.canal_id !== null)) {
                    canal.canal_id = response.data.canal_id
                }
            }));
    }

    alterarCanal(canal: CanalInterface, canalId: string): Observable<CanalInterface> {
        return this.http
            .put<CanalInterface>(`${environment.api.endpoint}/canal/${canalId}`, canal);
    }

    deletarCanal(idCanal: string): Observable<CanalInterface[]> {
        return this.http
            .delete<CanalInterface[]>(`${environment.api.endpoint}/canal/${idCanal}`)
    }

    vincularCargos(canal: Canal, cargos: Cargo[]) {
        var listaIdCargos: string[] = []
        canal.cargos.forEach((cargo) => {
            listaIdCargos.push(cargo.cargo_id)
        })
        var listaIdCargosNovos: string[] = []
        cargos.forEach((cargo) => {
            listaIdCargosNovos.push(cargo.cargo_id)
        })

        const [idsNovos, idsDeletados, idsExistentes] = ListaUtil.retornarDiferencaListas(listaIdCargosNovos, listaIdCargos)
        console.log([idsNovos, idsDeletados, idsExistentes])

        idsNovos.forEach((id: string) => {
            const associacao: AssociacaoCargoCanal = {
                canal_id: canal.canal_id,
                cargo_id: id,
            }
            this.vincularCargo(associacao).subscribe()
        })

        idsDeletados.forEach((id: string) => {
            const associacao: AssociacaoCargoCanal = {
                canal_id: canal.canal_id,
                cargo_id: id,
            }
            this.desvincularCargo(associacao).subscribe()
        })
    }

    vincularCargo(associacao: AssociacaoCargoCanal): Observable<AssociacaoCargoCanal> {
        return this.http
            .post<AssociacaoCargoCanal>(`${environment.api.endpoint}/canal-cargo`, associacao);
    }

    desvincularCargo(associacao: AssociacaoCargoCanal): Observable<AssociacaoCargoCanal> {
        return this.http
            .delete<AssociacaoCargoCanal>(`${environment.api.endpoint}/canal-cargo/${associacao.canal_id}/${associacao.cargo_id}`)
    }

    saveCanaisInStorage(canais: CanalInterface[]) {
        console.log('saveCanaisInStorage')
        this.gerenciamentoRepository.update({ canais: canais });
    }

    saveCanalInStorage(canal: CanalInterface): void {
        console.log('saveCanalInStorage')
        var canais = this.gerenciamentoRepository.canais()
        const indexCanal = canais.findIndex((canal) => {
            return canal.canal_id === canal.canal_id
        })
        canais[indexCanal] = canal

        this.gerenciamentoRepository.update({ canais: canais });
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
        // this.responsavelService.buscarResponsavel(idResponsavel).subscribe();
        // const responsavel = new Responsavel()

        if (canal !== undefined) {
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
}