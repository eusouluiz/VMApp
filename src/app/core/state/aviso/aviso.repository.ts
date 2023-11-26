import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { AvisoInterface, AvisoResponsavelInterface } from './aviso-service/aviso.entity';

interface AvisoState {
  avisos: AvisoInterface[];
  vinculosAvisoResponsavel: AvisoResponsavelInterface[];
}

const initialState: AvisoState = {
  avisos: [],
  vinculosAvisoResponsavel: [],
};

const store = createStore({ name: 'aviso' }, withProps<AvisoState>(initialState));

export const persist = persistState(store, {
  key: 'aviso',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class AvisoRepository {
  avisos$ = store.pipe(select((state) => state.avisos));

  vinculosAvisoResponsavel$ = store.pipe(select((state) => state.avisos));

  avisos(): AvisoInterface[] {
    return store.getValue().avisos;
  }

  aviso(idAviso: string): AvisoInterface | undefined {
    return store.getValue().avisos.find((aviso) => {
      return aviso.aviso_id === idAviso;
    });
  }

  vinculosAvisoResponsavel(): AvisoResponsavelInterface[] {
    return store.getValue().vinculosAvisoResponsavel;
  }

  update(session: Partial<AvisoState>) {
    store.update((state) => ({ ...state, ...session }));
  }
}
