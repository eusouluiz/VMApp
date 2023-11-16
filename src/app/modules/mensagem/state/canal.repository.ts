import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { CanalInterface } from '../../../core/services/canal-service/canal.entity';

interface CanalState {
  canais: CanalInterface[] | undefined;
}

const initialState: CanalState = {
  canais: undefined,
};

const store = createStore({ name: 'canais' }, withProps<CanalState>(initialState));

export const persist = persistState(store, {
  key: 'canais',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class CanalRepository {
  canais$ = store.pipe(select((state) => state.canais));

  getCanais() {
    return store.getValue().canais;
  }

  setCanais(canais: CanalInterface[]) {
    store.update((state) => ({ ...state, canais }));
  }

  updateCanais(newCanais: CanalInterface[]) {
    store.update((state) => ({ ...state, filter: newCanais }));
  }

  hasCanaisChanged(newCanais: CanalInterface[]) {
    return JSON.stringify(initialState.canais) !== JSON.stringify(newCanais);
  }
}
