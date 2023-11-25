import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { AvisoInterface } from './aviso-service/aviso.entity';

interface AvisoState {
  avisos: AvisoInterface[]
}

const initialState: AvisoState = {
  avisos: [],
};

const store = createStore({ name: 'aviso' }, withProps<AvisoState>(initialState));

export const persist = persistState(store, {
  key: 'aviso',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class AvisoRepository {

  avisos$ = store.pipe(select((state) => state.avisos));

  avisos(): AvisoInterface[] {
    return store.getValue().avisos;
  }

  aviso(idAviso: string): AvisoInterface | undefined {
    return store.getValue().avisos.find((aviso) => {
      return aviso.aviso_id === idAviso
    });
  }

  update(session: Partial<AvisoState>) {
    store.update((state) => ({ ...state, ...session }));
  }
}
