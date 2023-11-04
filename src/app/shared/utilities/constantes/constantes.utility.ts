// ====================================
// ID FUNCIONALIDADES
// ====================================

export class ConstantesFuncionalidades {
    static readonly GERENCIAMENTO_RESPONSAVEL = 0
    static readonly GERENCIAMENTO_ALUNO = 1
    static readonly GERENCIAMENTO_TURMA = 2
    static readonly GERENCIAMENTO_FUNCIONARIO = 3
    static readonly GERENCIAMENTO_CARGO = 4
    static readonly GERENCIAMENTO_CANAL = 5

    static readonly GERENCIAMENTO_AVISO = 6
}

// ====================================
// ROTAS
// ====================================

export class ConstantesRotas {
    static readonly BARRA = '/'

    static readonly ROTA_APP = '/app'
    static readonly ROTA_LOGIN = '/login'

    //gerenciamentos
    static readonly ROTA_GERENCIAMENTO = '/gerenciamento'
    static readonly ROTA_GERENCIAMENTO_RESPONSAVEL = '/responsavel'
    static readonly ROTA_GERENCIAMENTO_ALUNO = '/aluno'
    static readonly ROTA_GERENCIAMENTO_TURMA = '/turma'
    static readonly ROTA_GERENCIAMENTO_FUNCIONARIO = '/funcionario'
    static readonly ROTA_GERENCIAMENTO_CARGO = '/cargo'
    static readonly ROTA_GERENCIAMENTO_DETALHES = '/detalhes'
    static readonly ROTA_GERENCIAMENTO_CADASTRO = '/cadastro'
    static readonly ROTA_GERENCIAMENTO_CANAL = '/canal'

    static readonly ROTA_MENSAGEM = '/mensagem'
    static readonly ROTA_MENSAGEM_SELECAO_ALUNO = '/selecao-responsavel'
    static readonly ROTA_MENSAGEM_CANAL = '/canal'

    static readonly ROTA_AVISO = '/aviso'
    static readonly ROTA_AVISO_NOVO = '/novo'
}

// ====================================
// PRIORIDADES AVISOS
// ====================================

export class ConstantesPrioridadesAvisos {
    static readonly ALTA = '1'
    static readonly MEDIA = '2'
    static readonly BAIXA = '3'
}