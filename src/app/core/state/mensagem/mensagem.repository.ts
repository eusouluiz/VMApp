import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { MensagemInterface } from './mensagem-service/mensagem.entity';
import { Canal, CanalInterface } from '../gerenciamento/canal/canal.entity';
import { Responsavel, ResponsavelInterface } from '../gerenciamento/responsavel/responsavel.entity';

export interface CanalMensagem {
  canal_responsavel_id: string,
  responsavel_id?: string,
  canal_id?: string,
  responsavel?: ResponsavelInterface,
  canal?: Canal,
  mensagens?: MensagemInterface[]
}

interface MensagemState {
  listaCanais: CanalInterface[]
  canais: CanalMensagem[]
}

const initialState: MensagemState = {
  listaCanais: [],
  canais: [],
};

const store = createStore({ name: 'mensagem' }, withProps<MensagemState>(initialState));

export const persist = persistState(store, {
  key: 'mensagem',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class MensagemRepository {

  listaCanais$ = store.pipe(select((state) => state.listaCanais));

  canais$ = store.pipe(select((state) => state.canais));

  listaCanais(): CanalInterface[] {
    return store.getValue().listaCanais;
  }

  canais(): CanalMensagem[] {
    return store.getValue().canais;
  }

  canal(idCanalResponsavel: string): CanalMensagem | undefined {
    return store.getValue().canais.find((canal) => {
      return canal.canal_responsavel_id === idCanalResponsavel
    });
  }

  update(session: Partial<MensagemState>) {
    store.update((state) => ({ ...state, ...session }));
  }
}
