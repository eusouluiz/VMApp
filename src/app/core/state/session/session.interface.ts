interface UsuarioLogado {
  idUsuario: number,
  nome: string,
  idFuncionarioResponsavel: number,
  tipoUsuario: 'F' | 'R',
  idCargo?: number,
  funcionalidadesAcessoId?: number[],
}

export interface Session {
  accessToken: string;
  tokenType: string;
  usuarioLogado: UsuarioLogado
}
