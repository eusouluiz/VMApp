import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CANAL_RESPONSAVEL_DATA, RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { Canal, CanalInterface, CanalResponsavel, CanalResponsavelInterface } from './canal.entity';
import { GerenciamentoRepository } from '../gerenciamento.repository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Cargo } from '../cargo/cargo.entity';
import { ListaUtil } from '../../../../shared/utilities/lista/lista.utility';
import { CanalMensagem, MensagemRepository } from '../../mensagem/mensagem.repository';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

interface AssociacaoCargoCanal {
    id?: string,
    cargo_id: string,
    canal_id: string,
}

interface ResponseCanal {
    msg: string,
    data: CanalInterface,
}

interface ResponseCanalResponsavel {
    msg: string,
    data: CanalResponsavelInterface,
}

@Injectable({
    providedIn: 'root',
})
export class CanalService {

    constructor(
        private gerenciamentoRepository: GerenciamentoRepository,
        private mensagemRepository: MensagemRepository,
        private http: HttpClient,
    ) {

    }

    buscarTodosCanais(): Observable<CanalInterface[]> {
        return this.http
            .get<CanalInterface[]>(`${environment.api.endpoint}/canal`)
            .pipe(tap((canais) => this.saveCanaisInStorage(canais)));
    }

    buscarTodosCanaisMensagem(): Observable<CanalInterface[]> {
        return this.http
            .get<CanalInterface[]>(`${environment.api.endpoint}/canal`)
            .pipe(tap((canais) => this.saveCanaisInStorageMensagem(canais)));
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
        this.gerenciamentoRepository.update({ canais: canais });
    }

    saveCanalInStorage(canal: CanalInterface): void {
        var canais = this.gerenciamentoRepository.canais()
        const indexCanal = canais.findIndex((canalStorage) => {
            return canalStorage.canal_id === canal.canal_id
        })
        if (indexCanal !== -1) {
            canais[indexCanal] = canal
        } else {
            canais.push(canal)
        }

        this.gerenciamentoRepository.update({ canais: canais });
    }

    removerCanalInStorage(idCanal: string) {
        var canais = this.gerenciamentoRepository.canais()
        const indexCanal = canais.findIndex((canalStorage) => {
            return canalStorage.canal_id === idCanal
        })

        if (indexCanal !== -1) {
            canais.splice(indexCanal, 1)
        } 

        this.gerenciamentoRepository.update({ canais: canais });
    }

    saveCanaisInStorageMensagem(canais: CanalInterface[]) {
        this.mensagemRepository.update({ listaCanais: canais });
    }

    buscarIdCanalResponsavel(idCanal: string, idResponsavel: string): string | undefined {
        var idCanalResponsavel = CANAL_RESPONSAVEL_DATA.find((cr) => {
            return cr.canal.canal_id === idCanal && cr.responsavel.responsavel_id === idResponsavel;
        })?.canal_responsavel_id;

        return idCanalResponsavel;
    }

    buscarCanalResponsavelTodos(filtro?: { idResponsavel?: string, idCanal?: string }): Observable<CanalResponsavelInterface[]> {
        return this.http
            .get<CanalResponsavelInterface[]>(`${environment.api.endpoint}/canal-responsavel`)
            .pipe(tap((canaisResponsavel) => this.saveCanaisResponsavelInStorage(canaisResponsavel.filter((canal) => {
                if (filtro !== undefined) {
                    if (filtro.idResponsavel !== undefined && canal.responsavel !== undefined) {
                        return canal.responsavel.responsavel_id === filtro.idResponsavel
                    } else if (filtro.idCanal !== undefined && canal.canal !== undefined) {
                        return canal.canal.canal_id === filtro.idCanal
                    }
                }
            }))))
    }

    incluirCanalResponsavel(canalResponsavel: CanalResponsavelInterface): Observable<ResponseCanalResponsavel> {
        return this.http
            .post<ResponseCanalResponsavel>(`${environment.api.endpoint}/canal-responsavel`, canalResponsavel)
            .pipe(tap((response) => {
                if (response.data.canal_responsavel_id !== undefined) {
                    canalResponsavel.canal_responsavel_id = response.data.canal_responsavel_id
                }
                this.saveCanalResponsavelInStorage(response.data)
            }));
    }

    async saveCanaisResponsavelInStorage(canaisResponsavel: CanalResponsavelInterface[] | undefined) {
        if (canaisResponsavel !== undefined) {
            var canalMensagem: CanalMensagem[] = await this.adequarCanaisMensagem(canaisResponsavel)

            this.mensagemRepository.update({ canais: canalMensagem })
        }
    }

    saveCanalResponsavelInStorage(canal: CanalResponsavelInterface): void {
        // var canais: CanalMensagem[] = this.mensagemRepository.canais()
        // const indexCanal = canais.findIndex((canalStorage) => {
        //     return canalStorage.canal_responsavel_id === idCanalResponsavel
        // })

        // var c: CanalMensagem = {
        //     canal_responsavel_id: idCanalResponsavel,
        //     canal_id: canal.canal_id,
        //     canal: canal.canal,
        //     responsavel_id: canal.responsavel_id,
        //     responsavel: canal.responsavel
        // }

        // if (indexCanal !== -1) {
        //     canais[indexCanal] = c
        // } else {
        //     canais.push(c)
        // }

        // this.mensagemRepository.update({ canais: canais });
    }

    async adequarCanaisMensagem(canaisResponsavel: CanalResponsavelInterface[]): Promise<CanalMensagem[]> {
        var canalMensagem: CanalMensagem[] = []

        for (let i = 0; i < canaisResponsavel.length; i++) {
            const canal = canaisResponsavel[i];
            if (canal.canal_responsavel_id !== undefined) {
                let { data: mensagens, error } = await supabase
                    .from('mensagens')
                    .select("*")
                    // Filters
                    .eq('canal_responsavel_id', canal.canal_responsavel_id)
                    .order('data_envio', { ascending: false })
                    .limit(1)

                var c: CanalMensagem = {
                    canal_responsavel_id: canal.canal_responsavel_id,
                    canal_id: canal.canal_id,
                    canal: canal.canal,
                    responsavel_id: canal.responsavel_id,
                    responsavel: canal.responsavel
                }

                if (mensagens !== null) {
                    c.mensagens = mensagens
                }

                canalMensagem.push(c)
            }
        }

        return canalMensagem
    }
}