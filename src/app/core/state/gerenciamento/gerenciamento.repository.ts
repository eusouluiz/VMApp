import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { ResponsavelInterface } from './responsavel/responsavel.entity';
import { AlunoInterface } from './aluno/aluno.entity';
import { TurmaInterface } from './turma/turma.entity';

interface GerenciamentoState {
  responsaveis: ResponsavelInterface[],
  alunos: AlunoInterface[],
  turmas: TurmaInterface[],
}

const initialState: GerenciamentoState = {
  responsaveis: [],
  alunos: [],
  turmas: [],
};

const store = createStore({ name: 'gerenciamento' }, withProps<GerenciamentoState>(initialState));

export const persist = persistState(store, {
  key: 'gerenciamento',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class GerenciamentoRepository {

  responsaveis$ = store.pipe(select((state) => state.responsaveis));

  alunos$ = store.pipe(select((state) => state.alunos));

  turmas$ = store.pipe(select((state) => state.turmas));

  responsaveis(): ResponsavelInterface[] {
    return store.getValue().responsaveis;
  }

  alunos(): AlunoInterface[] {
    return store.getValue().alunos;
  }

  turmas(): TurmaInterface[] {
    return store.getValue().turmas;
  }

  responsavel(idResponsavel: string): ResponsavelInterface | undefined {
    return store.getValue().responsaveis.find((responsavel) => {
      return responsavel.responsavel_id === idResponsavel
    });
  }

  update(session: Partial<GerenciamentoState>) {
    store.update((state) => ({ ...state, ...session }));
  }
}
