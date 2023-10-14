import { Funcionalidade } from "../../../shared/utilities/entidade/entidade.utility";

export interface Session {
  accessToken: string;
  tokenType: string;
  funcionalidadesAcesso: Funcionalidade[]
}
