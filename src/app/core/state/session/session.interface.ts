// interface UsuarioLogado {
//   idUsuario: number;
//   nome: string;
//   idFuncionarioResponsavel: number;
//   tipoUsuario: 'F' | 'R';
//   idCargo?: number;
//   funcionalidadesAcessoId?: number[];
// }

export interface LoginApiBody {
  cpf: string;
  password: string;
}

export interface LoginApiResponse {
  token: string;
  expires_at: string;
}

export interface Session {
  accessToken: string;
  expiresAt: string;
  tokenType?: string;
}

export interface UserInfoApiResponse {
  idUsuario: number;
  nome: string;
  idFuncionarioResponsavel: number;
  tipo: 'F' | 'R' | 'A';
  idCargo?: number;
  funcionalidadesAcessoId?: number[];
}
