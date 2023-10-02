import { Funcionalidade } from "../../../app.module";

export interface Session {
  accessToken: string;
  tokenType: string;
  funcionalidadesAcesso: Funcionalidade[]
}
