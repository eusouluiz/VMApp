// ====================================
// ID FUNCIONALIDADES
// ====================================

export class ConstantesFuncionalidades {
    static readonly GERENCIAMENTO_RESPONSAVEL = 0
    static readonly GERENCIAMENTO_ALUNO = 1
    static readonly GERENCIAMENTO_TURMA = 2
    static readonly GERENCIAMENTO_FUNCIONARIO = 3
    static readonly GERENCIAMENTO_CARGO = 4

    // static readonly EDICAO_RESPONSAVEL = 5
    // static readonly DELECAO_RESPONSAVEL = 6
    // static readonly CADASTRO_RESPONSAVEL = 7
    // static readonly CONSULTA_RESPONSAVEL = 8

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

    static readonly ROTA_MENSAGEM = '/mensagem'
    static readonly ROTA_AVISO = '/aviso'
}