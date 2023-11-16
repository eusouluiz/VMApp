import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { Session, UserInfoApiResponse } from './session.interface';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

interface SessionState {
  session: Session | undefined;
  userInfo: UserInfoApiResponse | undefined;
}

const initialState: SessionState = {
  session: undefined,
  userInfo: undefined,
};

const store = createStore({ name: 'session' }, withProps<SessionState>(initialState));

export const persist = persistState(store, {
  key: 'session',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class SessionRepository {
  isLoggedIn$ = store.pipe(select((state) => state.session?.accessToken));

  session$ = store.pipe(select((state) => state.session));

  userInfo$ = store.pipe(select((state) => state.userInfo));

  isLoggedIn(): boolean {
    return Boolean(store.getValue().session?.accessToken);
  }

  session(): Session | undefined {
    return store.getValue().session;
  }

  userInfo(): UserInfoApiResponse | undefined {
    return store.getValue().userInfo;
  }

  update(session: Partial<SessionState>) {
    store.update((state) => ({ ...state, ...session }));
  }
}
