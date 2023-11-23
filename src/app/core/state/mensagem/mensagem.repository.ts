import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { MensagemInterface } from './mensagem-service/mensagem.entity';

export interface CanaisMensagem {
  canal_responsavel_id: string,
  mensagens: MensagemInterface[]
}

interface MensagemState {
  canais: CanaisMensagem[]
}

const initialState: MensagemState = {
  canais: [],
};

const store = createStore({ name: 'mensagem' }, withProps<MensagemState>(initialState));

export const persist = persistState(store, {
  key: 'mensagem',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class MensagemRepository {

  canais$ = store.pipe(select((state) => state.canais));

  canais(): CanaisMensagem[] {
    return store.getValue().canais;
  }

  canal(idCanalResponsavel: string): CanaisMensagem | undefined {
    return store.getValue().canais.find((canal) => {
      return canal.canal_responsavel_id === idCanalResponsavel
    });
  }

  update(session: Partial<MensagemState>) {
    store.update((state) => ({ ...state, ...session }));
  }
}
