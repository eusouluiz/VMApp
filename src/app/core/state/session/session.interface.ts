// interface UsuarioLogado {
//   idUsuario: number;
//   nome: string;
//   idFuncionarioResponsavel: number;
//   tipoUsuario: 'F' | 'R';
//   idCargo?: number;
//   funcionalidadesAcessoId?: number[];
// }

import { Funcionario } from "../gerenciamento/funcionario/funcionario.entity";
import { Responsavel } from "../gerenciamento/responsavel/responsavel.entity";

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
  user_id: string;
  nome: string;
  cpf: string;
  funcionario: Funcionario;
  responsavel: Responsavel;
  tipo: 'F' | 'R' | 'A';
}
