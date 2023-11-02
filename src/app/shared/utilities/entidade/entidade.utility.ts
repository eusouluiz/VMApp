// ====================================
// ENTIDADES
// ====================================

import { ConstantesPrioridadesAvisos } from "../constantes/constantes.utility"

export interface Usuario {
    idUsuario: number,
    cpf: string,
    senha: string,
    telefone: string,
    tipoUsuario: 'R' | 'F' | 'A' | '',
}

export interface Turma {
    idTurma: number,
    nome: string,
    alunos: Aluno[]
}

export interface Aluno {
    idAluno: number,
    nome: string,
    cgm: string,
    responsaveis: Responsavel[],
    turma: Turma,
}

export interface Responsavel {
    idResponsavel: number,
    nome: string,
    usuario: Usuario,
    alunos: Aluno[],
}

export interface Funcionalidade {
    idFuncionalidade: number
    nome: string,
    descricao: string
}

export interface Cargo {
    idCargo: number,
    nome: string,
    funcionarios: Funcionario[],
    funcionalidades: Funcionalidade[],
}

export interface Funcionario {
    idFuncionario: number,
    nome: string,
    usuario: Usuario,
    cargo: Cargo
}

export interface Canal {
    idCanal: number,
    nome: string,
    cargos: Cargo[]
}

export interface CanalResponsavel {
    idCanalResponsavel: number,
    canal: Canal,
    responsavel: Responsavel
}

export interface Mensagem {
    idMensagem: number,
    idUsuario: number,
    idCanalResponsavel: number,
    texto: string,
    arquivo: string,
    dataHoraEnvio: Date,
    indVisualizacao: boolean
}

export interface Aviso {
    idAviso: number,
    idFuncionario: number,
    idCanal: number,
    titulo: string,
    texto: string,
    arquivo: string,
    dataPublicacao: Date,
    dataEncerramento: Date,
    prioridade: '1' | '2' | '3',
    idTurmas: number[]
}

export interface AvisoResponsavel {
    idAviso: number,
    idResponsavel: number,
    indVisualizacao: boolean
}

export var USUARIO_DATA: Usuario[] = [
    { idUsuario: 0, cpf: '00000000000', senha: 'admin000', telefone: '041000000000', tipoUsuario: 'F' },
    { idUsuario: 1, cpf: '12345678900', senha: 'senha123', telefone: '041987654321', tipoUsuario: 'R' },
    { idUsuario: 2, cpf: '98765432100', senha: 'senha456', telefone: '041123456789', tipoUsuario: 'R' },
    { idUsuario: 3, cpf: '08918011970', senha: 'senha789', telefone: '041988222527', tipoUsuario: 'F' },
    { idUsuario: 4, cpf: '00011122233', senha: 'senha000', telefone: '041999666333', tipoUsuario: 'F' },
    { idUsuario: 5, cpf: '55555555555', senha: 'senha555', telefone: '041555555555', tipoUsuario: 'A' },
]

export var TURMA_DATA: Turma[] = [
    { idTurma: 0, nome: 'Turma A Manha', alunos: [] },
    { idTurma: 1, nome: 'Turma B Manha', alunos: [] },
    { idTurma: 2, nome: 'Turma A Tarde', alunos: [] },
]

export var ALUNO_DATA: Aluno[] = [
    { idAluno: 0, nome: 'Luizinho a0', cgm: '123456789012345', responsaveis: [], turma: TURMA_DATA[0] },
    { idAluno: 1, nome: 'Gabrielzinho a1', cgm: '123456789012345', responsaveis: [], turma: TURMA_DATA[0] },
    { idAluno: 2, nome: 'Rafaelzinho a2', cgm: '123456789012345', responsaveis: [], turma: TURMA_DATA[0] },
    { idAluno: 3, nome: 'Jaiminho a3', cgm: '123456789012345', responsaveis: [], turma: TURMA_DATA[2] },
    { idAluno: 4, nome: 'Felipinho a4', cgm: '123456789012345', responsaveis: [], turma: TURMA_DATA[2] },
]

export var RESPONSAVEL_DATA: Responsavel[] = [
    { idResponsavel: 0, nome: 'Gabriel r0', usuario: USUARIO_DATA[1], alunos: [] },
    { idResponsavel: 1, nome: 'Luiz r1', usuario: USUARIO_DATA[2], alunos: [] },
    { idResponsavel: 2, nome: 'Jaime r2', usuario: USUARIO_DATA[4], alunos: [] },
]

export var FUNCIONALIDADE_DATA: Funcionalidade[] = [
    { idFuncionalidade: 0, nome: 'Gerenciamento Responsaveis', descricao: 'Gerencia todos os responsaveis' },
    { idFuncionalidade: 1, nome: 'Gerenciamento Aluno', descricao: 'Gerencia todos os alunos' },
    { idFuncionalidade: 2, nome: 'Gerenciamento Turma', descricao: 'Gerencia todas as turmas' },
    { idFuncionalidade: 3, nome: 'Gerenciamento Funcionarios', descricao: 'Gerencia todos os funcionarios' },
    { idFuncionalidade: 4, nome: 'Gerenciamento Cargo', descricao: 'Gerencia todos os cargos' },
    { idFuncionalidade: 5, nome: 'Gerenciamento Canal', descricao: 'Gerencia todos os canais' },
    { idFuncionalidade: 6, nome: 'Gerenciamento Aviso', descricao: 'Gerencia todos os avisos' },
]

export var CARGO_DATA: Cargo[] = [
    { idCargo: 0, nome: 'Admin', funcionarios: [], funcionalidades: FUNCIONALIDADE_DATA },
    { idCargo: 1, nome: 'Funcionarios - Responsavel', funcionarios: [], funcionalidades: [FUNCIONALIDADE_DATA[0], FUNCIONALIDADE_DATA[1], FUNCIONALIDADE_DATA[2]] },
    { idCargo: 2, nome: 'Funcionarios - Funcionario', funcionarios: [], funcionalidades: [FUNCIONALIDADE_DATA[3], FUNCIONALIDADE_DATA[4]] },
]

export var FUNCIONARIO_DATA: Funcionario[] = [
    { idFuncionario: 0, nome: 'Admin f0', usuario: USUARIO_DATA[0], cargo: CARGO_DATA[0] },
    { idFuncionario: 1, nome: 'Giacomo f1', usuario: USUARIO_DATA[3], cargo: CARGO_DATA[1] },
    { idFuncionario: 2, nome: 'Madu f2', usuario: USUARIO_DATA[4], cargo: CARGO_DATA[2] },
    { idFuncionario: 3, nome: 'Jaime f3', usuario: USUARIO_DATA[5], cargo: CARGO_DATA[2] },
]

export var CANAL_DATA: Canal[] = [
    { idCanal: 0, nome: 'Admin c0', cargos: [CARGO_DATA[0]] },
    { idCanal: 1, nome: 'Secretaria c1', cargos: [CARGO_DATA[1]] },
    { idCanal: 2, nome: 'Pedagogia c2', cargos: [CARGO_DATA[2]] },
    { idCanal: 3, nome: 'Outro c3', cargos: [CARGO_DATA[1], CARGO_DATA[2]] },
]

export var CANAL_RESPONSAVEL_DATA: CanalResponsavel[] = [
    { idCanalResponsavel: 0, canal: CANAL_DATA[0], responsavel: RESPONSAVEL_DATA[0] },
    { idCanalResponsavel: 1, canal: CANAL_DATA[0], responsavel: RESPONSAVEL_DATA[1] },
    { idCanalResponsavel: 2, canal: CANAL_DATA[1], responsavel: RESPONSAVEL_DATA[2] },
    { idCanalResponsavel: 3, canal: CANAL_DATA[2], responsavel: RESPONSAVEL_DATA[0] },
]

export var MENSAGEM_DATA: Mensagem[] = [
    {
        idMensagem: 0,
        idUsuario: 0,
        idCanalResponsavel: 1,
        texto: 'teste teste teste teste teste teste teste',
        arquivo: '',
        dataHoraEnvio: new Date(),
        indVisualizacao: false
    },{
        idMensagem: 1,
        idUsuario: 0,
        idCanalResponsavel: 1,
        texto: 'teste teste teste teste teste teste teste2',
        arquivo: '',
        dataHoraEnvio: new Date(),
        indVisualizacao: false
    },{
        idMensagem: 1,
        idUsuario: 0,
        idCanalResponsavel: 0,
        texto: 'teste teste teste teste teste teste teste3',
        arquivo: '',
        dataHoraEnvio: new Date(),
        indVisualizacao: false
    },
]

export var AVISO_DATA: Aviso[] = [
    {
        idAviso: 0,
        idFuncionario: 0,
        idCanal: 0,
        titulo: 'Aviso 0',
        texto: 'teste1',
        arquivo: '',
        dataPublicacao: new Date(),
        dataEncerramento: new Date(),
        prioridade: '1',        
        idTurmas: []
    },{
        idAviso: 1,
        idFuncionario: 0,
        idCanal: 0,
        titulo: 'Aviso 1',
        texto: 'teste2',
        arquivo: '',
        dataPublicacao: new Date(),
        dataEncerramento: new Date(),
        prioridade: '2',        
        idTurmas: []
    },{
        idAviso: 2,
        idFuncionario: 0,
        idCanal: 0,
        titulo: 'Aviso 2',
        texto: 'teste3',
        arquivo: '',
        dataPublicacao: new Date(),
        dataEncerramento: new Date(),
        prioridade: '3',        
        idTurmas: []
    },
]

export function preencheDados() {
    // preenche turmas

    TURMA_DATA[0].alunos.push(ALUNO_DATA[0])
    TURMA_DATA[0].alunos.push(ALUNO_DATA[1])
    TURMA_DATA[2].alunos.push(ALUNO_DATA[2])
    TURMA_DATA[2].alunos.push(ALUNO_DATA[3])
    TURMA_DATA[2].alunos.push(ALUNO_DATA[4])

    // preenche alunos

    ALUNO_DATA[0].responsaveis.push(RESPONSAVEL_DATA[1])
    ALUNO_DATA[1].responsaveis.push(RESPONSAVEL_DATA[0])
    ALUNO_DATA[1].responsaveis.push(RESPONSAVEL_DATA[1])
    ALUNO_DATA[3].responsaveis.push(RESPONSAVEL_DATA[2])

    // preenche responsaveis

    RESPONSAVEL_DATA[0].alunos.push(ALUNO_DATA[1])
    RESPONSAVEL_DATA[1].alunos.push(ALUNO_DATA[0])
    RESPONSAVEL_DATA[1].alunos.push(ALUNO_DATA[1])
    RESPONSAVEL_DATA[2].alunos.push(ALUNO_DATA[3])

    // preenche cargos

    CARGO_DATA[0].funcionarios.push(FUNCIONARIO_DATA[0])
    CARGO_DATA[1].funcionarios.push(FUNCIONARIO_DATA[1])
    CARGO_DATA[2].funcionarios.push(FUNCIONARIO_DATA[2])
    CARGO_DATA[2].funcionarios.push(FUNCIONARIO_DATA[3])

}

export function logaData(info: any = undefined) {
    if (info === undefined) {
        console.log(USUARIO_DATA)
        console.log(RESPONSAVEL_DATA)
        console.log(ALUNO_DATA)
        console.log(TURMA_DATA)
        console.log(FUNCIONARIO_DATA)
        console.log(CARGO_DATA)
        console.log(FUNCIONALIDADE_DATA)
        console.log(CANAL_DATA)
        console.log(CANAL_RESPONSAVEL_DATA)
    } else {
        console.log(info)
    }
}

export function usuarioVazio(): Usuario {
    return { idUsuario: 0, cpf: '', senha: '', telefone: '', tipoUsuario: '' }
}

export function responsavelVazio(): Responsavel {
    return { idResponsavel: 0, nome: '', usuario: usuarioVazio(), alunos: [] }
}

export function turmaVazio(): Turma {
    return { idTurma: 0, nome: '', alunos: [] }
}

export function alunoVazio(): Aluno {
    return { idAluno: 0, nome: '', cgm: '', responsaveis: [], turma: turmaVazio() }
}

export function cargoVazio(): Cargo {
    return { idCargo: 0, nome: '', funcionarios: [], funcionalidades: [] }
}

export function funcionarioVazio(): Funcionario {
    return { idFuncionario: 0, nome: '', usuario: usuarioVazio(), cargo: cargoVazio() }
}

export function canalVazio(): Canal {
    return { idCanal: 0, nome: '', cargos: [] }
}

export function avisoVazio(): Aviso {
    return {
        idAviso: 0,
        idFuncionario: -1,
        idCanal: -1,
        titulo: '',
        texto: '',
        arquivo: '',
        dataPublicacao: new Date(),
        dataEncerramento: new Date(),
        prioridade: '3',        
        idTurmas: []
    }
}