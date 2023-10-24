interface UsuarioLogado {
  tipoUsuario: 'F' | 'R',
  cargoId?: number,
  funcionalidadesAcessoId?: number[],
}

export interface Session {
  accessToken: string;
  tokenType: string;
  usuarioLogado: UsuarioLogado
}
