// ====================================
// ID FUNCIONALIDADES
// ====================================

export class ConstantesFuncionalidades {
  static readonly GERENCIAMENTO_RESPONSAVEL = '9aaf9e5f-238c-44ca-afa6-85689d95915d';

  static readonly GERENCIAMENTO_ALUNO = '9aaf9e6e-5c27-476c-a0fb-4409832f4480';

  static readonly GERENCIAMENTO_TURMA = '9aaf9e8b-3f1e-4037-829a-bf5424e2fb53';

  static readonly GERENCIAMENTO_FUNCIONARIO = '9aaf9ea8-86f6-43b8-bcd1-13fdef293184';

  static readonly GERENCIAMENTO_CARGO = '9aaf9eb7-ed7f-475a-be84-559fdb4a6c08';

  static readonly GERENCIAMENTO_CANAL = '9aaf9eca-8ea2-480a-b2da-4deafe3c045c';

  static readonly GERENCIAMENTO_AVISO = '9aaf9ee4-2d6d-4e41-adc4-74cf744ff135';
}

// ====================================
// ROTAS
// ====================================

export class ConstantesRotas {
  static readonly BARRA = '/';

  static readonly ROTA_APP = '/app';

  static readonly ROTA_LOGIN = '/login';

  //gerenciamentos
  static readonly ROTA_GERENCIAMENTO = '/gerenciamento';

  static readonly ROTA_GERENCIAMENTO_RESPONSAVEL = '/responsavel';

  static readonly ROTA_GERENCIAMENTO_ALUNO = '/aluno';

  static readonly ROTA_GERENCIAMENTO_TURMA = '/turma';

  static readonly ROTA_GERENCIAMENTO_FUNCIONARIO = '/funcionario';

  static readonly ROTA_GERENCIAMENTO_CARGO = '/cargo';

  static readonly ROTA_GERENCIAMENTO_DETALHES = '/detalhes';

  static readonly ROTA_GERENCIAMENTO_CADASTRO = '/cadastro';

  static readonly ROTA_GERENCIAMENTO_CANAL = '/canal';

  static readonly ROTA_MENSAGEM = '/mensagem';

  static readonly ROTA_MENSAGEM_SELECAO_ALUNO = '/selecao-responsavel';

  static readonly ROTA_MENSAGEM_CANAL = '/canal';

  static readonly ROTA_AVISO = '/aviso';

  static readonly ROTA_AVISO_NOVO = '/novo';
}

// ====================================
// PRIORIDADES AVISOS
// ====================================

export class ConstantesPrioridadesAvisos {
  static readonly ALTA = '1';

  static readonly MEDIA = '2';

  static readonly BAIXA = '3';
}

export class ConstantesSupabase {
  static readonly CANAL_NOTIFICACAO_MENSAGEM = 'notificacao-mensagem'

  static readonly CANAL_NOTIFICACAO_AVISO = 'notificacao-aviso'

  static readonly CANAL_MENSAGEM_INSERT = 'mensagens-insert'

  static readonly CANAL_MENSAGEM_UPDATE = 'mensagens-update'
}

export class ConstantesEndpoints {
  static readonly ENDPOINT_BARRA = '/'
  
  static readonly ENDPOINT_USUARIO = '/user'

  static readonly ENDPOINT_RESPONSAVEL = '/responsavel'
  static readonly ENDPOINT_ALUNO = '/aluno'
  static readonly ENDPOINT_TURMA = '/turma'
}
