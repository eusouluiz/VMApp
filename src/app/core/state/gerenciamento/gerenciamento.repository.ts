import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { ResponsavelInterface } from './responsavel/responsavel.entity';
import { AlunoInterface } from './aluno/aluno.entity';
import { TurmaInterface } from './turma/turma.entity';
import { FuncionarioInterface } from './funcionario/funcionario.entity';
import { CargoInterface } from './cargo/cargo.entity';
import { CanalInterface } from './canal/canal.entity';

interface GerenciamentoState {
  responsaveis: ResponsavelInterface[],
  alunos: AlunoInterface[],
  turmas: TurmaInterface[],
  funcionarios: FuncionarioInterface[],
  cargos: CargoInterface[],
  canais: CanalInterface[],
}

const initialState: GerenciamentoState = {
  responsaveis: [],
  alunos: [],
  turmas: [],
  funcionarios: [],
  cargos: [],
  canais: [],
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

  funcionarios$ = store.pipe(select((state) => state.funcionarios));

  cargos$ = store.pipe(select((state) => state.cargos));

  canais$ = store.pipe(select((state) => state.canais));

  responsaveis(): ResponsavelInterface[] {
    return store.getValue().responsaveis;
  }

  alunos(): AlunoInterface[] {
    return store.getValue().alunos;
  }

  turmas(): TurmaInterface[] {
    return store.getValue().turmas;
  }

  funcionarios(): FuncionarioInterface[] {
    return store.getValue().funcionarios;
  }

  cargos(): CargoInterface[] {
    return store.getValue().cargos;
  }

  canais(): CanalInterface[] {
    return store.getValue().canais;
  }

  responsavel(idResponsavel: string): ResponsavelInterface | undefined {
    return store.getValue().responsaveis.find((responsavel) => {
      return responsavel.responsavel_id === idResponsavel
    });
  }

  aluno(idAluno: string): AlunoInterface | undefined {
    return store.getValue().alunos.find((aluno) => {
      return aluno.aluno_id === idAluno
    });
  }

  turma(idTurma: string): TurmaInterface | undefined {
    return store.getValue().turmas.find((turma) => {
      return turma.turma_id === idTurma
    });
  }

  funcionario(idFuncionario: string): FuncionarioInterface | undefined {
    return store.getValue().funcionarios.find((funcionario) => {
      return funcionario.funcionario_id === idFuncionario
    });
  }

  cargo(idCargo: string): CargoInterface | undefined {
    return store.getValue().cargos.find((cargo) => {
      return cargo.cargo_id === idCargo
    });
  }

  canal(idCanal: string): CanalInterface | undefined {
    return store.getValue().canais.find((canal) => {
      return canal.canal_id === idCanal
    });
  }

  update(session: Partial<GerenciamentoState>) {
    store.update((state) => ({ ...state, ...session }));
  }
}
