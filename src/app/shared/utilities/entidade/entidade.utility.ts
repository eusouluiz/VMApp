// ====================================
// ENTIDADES
// ====================================

import { Aluno } from '../../../core/services/aluno-service/aluno.entity';
import { Aviso } from '../../../core/services/aviso-service/aviso.entity';
import { Canal, CanalResponsavel } from '../../../core/services/canal-service/canal.entity';
import { Cargo } from '../../../core/services/cargo-service/cargo.entity';
import { Funcionalidade } from '../../../core/services/funcionalidade-service/funcionalidade.entity';
import { Funcionario } from '../../../core/services/funcionario-service/funcionario.entity';
import { Lembrete } from '../../../core/services/lembrete-service copy/lembrete.entity';
import { Mensagem } from '../../../core/services/mensagem-service/mensagem.entity';
import { Responsavel } from '../../../core/services/responsavel-service/responsavel.entity';
import { Turma } from '../../../core/services/turma-service/turma.entity';
import { Usuario } from '../../../core/services/usuario-service/usuario.entity';

export var USUARIO_DATA: Usuario[] = [
  new Usuario({
    user_id: '9a8b41aa-1fab-4be5-a047-4759d0ce1a4f',
    nome: 'Admin',
    cpf: '00000000000',
    telefone: '041000000000',
    tipo: 'F',
  }),
  new Usuario({
    user_id: '1',
    nome: 'Gabriel Falavinha Gomes',
    cpf: '12345678900',
    telefone: '041987654321',
    tipo: 'R',
  }),
  new Usuario({
    user_id: '2',
    nome: 'Luiz Gustavo Nascimento',
    cpf: '98765432100',
    telefone: '041123456789',
    tipo: 'R',
  }),
  new Usuario({ user_id: '3', nome: 'Giacomo Vaz', cpf: '08918011970', telefone: '041988222527', tipo: 'F' }),
  new Usuario({
    user_id: '4',
    nome: 'Maria Eduarda Almeida',
    cpf: '00011122233',
    telefone: '041999666333',
    tipo: 'F',
  }),
  new Usuario({
    user_id: '5',
    nome: 'Ana Vitoria Oliveira',
    cpf: '55555555555',
    telefone: '041555555555',
    tipo: 'A',
  }),
];

export var TURMA_DATA: Turma[] = [
  new Turma({
    turma_id: '0',
    nome: 'Turma A Manha',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Turma({
    turma_id: '1',
    nome: 'Turma B Manha',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Turma({
    turma_id: '2',
    nome: 'Turma A Tarde',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var ALUNO_DATA: Aluno[] = [
  new Aluno({
    aluno_id: '0',
    nome: 'Luizinho a0',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[0].turma_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Aluno({
    aluno_id: '1',
    nome: 'Gabrielzinho a1',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[0].turma_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Aluno({
    aluno_id: '2',
    nome: 'Rafaelzinho a2',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[0].turma_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Aluno({
    aluno_id: '3',
    nome: 'Jaiminho a3',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[2].turma_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Aluno({
    aluno_id: '4',
    nome: 'Felipinho a4',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[2].turma_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var RESPONSAVEL_DATA: Responsavel[] = [
  new Responsavel({
    responsavel_id: '0',
    user_id: USUARIO_DATA[1].user_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Responsavel({
    responsavel_id: '1',
    user_id: USUARIO_DATA[2].user_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Responsavel({
    responsavel_id: '2',
    user_id: USUARIO_DATA[4].user_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var FUNCIONALIDADE_DATA: Funcionalidade[] = [
  new Funcionalidade({
    funcionalidade_id: '0',
    nome: 'Gerenciamento Responsaveis',
    descricao: 'Gerencia todos os responsaveis',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionalidade({
    funcionalidade_id: '1',
    nome: 'Gerenciamento Aluno',
    descricao: 'Gerencia todos os alunos',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionalidade({
    funcionalidade_id: '2',
    nome: 'Gerenciamento Turma',
    descricao: 'Gerencia todas as turmas',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionalidade({
    funcionalidade_id: '3',
    nome: 'Gerenciamento Funcionarios',
    descricao: 'Gerencia todos os funcionarios',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionalidade({
    funcionalidade_id: '4',
    nome: 'Gerenciamento Cargo',
    descricao: 'Gerencia todos os cargos',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionalidade({
    funcionalidade_id: '5',
    nome: 'Gerenciamento Canal',
    descricao: 'Gerencia todos os canais',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionalidade({
    funcionalidade_id: '6',
    nome: 'Gerenciamento Aviso',
    descricao: 'Gerencia todos os avisos',
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var CARGO_DATA: Cargo[] = [
  new Cargo(
    {
      cargo_id: '9a9f8804-94e5-4f5e-a0e5-d44b67731b0f',
      nome: 'Admin',
      descricao: '',
      updated_at: new Date(),
      created_at: new Date(),
    },
    undefined,
    FUNCIONALIDADE_DATA
  ),
  new Cargo({
    cargo_id: '1',
    nome: 'Funcionarios - Responsavel',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Cargo({
    cargo_id: '2',
    nome: 'Funcionarios - Funcionario',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var FUNCIONARIO_DATA: Funcionario[] = [
  new Funcionario({
    funcionario_id: '0',
    user_id: USUARIO_DATA[0].user_id,
    cargo_id: CARGO_DATA[0].cargo_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionario({
    funcionario_id: '1',
    user_id: USUARIO_DATA[3].user_id,
    cargo_id: CARGO_DATA[1].cargo_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionario({
    funcionario_id: '2',
    user_id: USUARIO_DATA[4].user_id,
    cargo_id: CARGO_DATA[2].cargo_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Funcionario({
    funcionario_id: '3',
    user_id: USUARIO_DATA[5].user_id,
    cargo_id: CARGO_DATA[2].cargo_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var CANAL_DATA: Canal[] = [
  new Canal({ canal_id: '0', nome: 'Admin c0', descricao: '', updated_at: new Date(), created_at: new Date() }, [
    CARGO_DATA[0],
  ]),
  new Canal({
    canal_id: '1',
    nome: 'Secretaria c1',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Canal({
    canal_id: '2',
    nome: 'Pedagogia c2',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Canal({ canal_id: '3', nome: 'Outro c3', descricao: '', updated_at: new Date(), created_at: new Date() }),
];

export var CANAL_RESPONSAVEL_DATA: CanalResponsavel[] = [
  new CanalResponsavel({
    canal_responsavel_id: '0',
    canal_id: CANAL_DATA[0].canal_id,
    responsavel_id: RESPONSAVEL_DATA[0].responsavel_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new CanalResponsavel({
    canal_responsavel_id: '1',
    canal_id: CANAL_DATA[1].canal_id,
    responsavel_id: RESPONSAVEL_DATA[0].responsavel_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new CanalResponsavel({
    canal_responsavel_id: '2',
    canal_id: CANAL_DATA[2].canal_id,
    responsavel_id: RESPONSAVEL_DATA[0].responsavel_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new CanalResponsavel({
    canal_responsavel_id: '3',
    canal_id: CANAL_DATA[3].canal_id,
    responsavel_id: RESPONSAVEL_DATA[0].responsavel_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var MENSAGEM_DATA: Mensagem[] = [
  new Mensagem({
    mensagem_id: '0',
    texto: 'teste teste teste teste teste teste teste',
    arquivo: '',
    lida: false,
    data_envio: new Date(),
    data_leitura: new Date(),
    user_id: USUARIO_DATA[0].user_id,
    canal_responsavel_id: CANAL_RESPONSAVEL_DATA[0].canal_responsavel_id,
  }),
  new Mensagem({
    mensagem_id: '1',
    texto: 'teste teste teste teste teste teste teste2',
    arquivo: '',
    lida: false,
    data_envio: new Date(),
    data_leitura: new Date(),
    user_id: USUARIO_DATA[0].user_id,
    canal_responsavel_id: CANAL_RESPONSAVEL_DATA[1].canal_responsavel_id,
  }),
  new Mensagem({
    mensagem_id: '2',
    texto: 'teste teste teste teste teste teste teste3',
    arquivo: '',
    lida: false,
    data_envio: new Date(),
    data_leitura: new Date(),
    user_id: USUARIO_DATA[0].user_id,
    canal_responsavel_id: CANAL_RESPONSAVEL_DATA[2].canal_responsavel_id,
  }),
];

export var AVISO_DATA: Aviso[] = [
  new Aviso({
    aviso_id: '0',
    titulo: 'Aviso 0',
    texto: 'teste1',
    arquivo: '',
    prioridade: '1',
    data_publicacao: new Date(),
    data_encerramento: new Date(),
    funcionario_id: FUNCIONARIO_DATA[0].funcionario_id,
    canal_id: CANAL_DATA[0].canal_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Aviso({
    aviso_id: '1',
    titulo: 'Aviso 1',
    texto: 'teste2',
    arquivo: '',
    prioridade: '2',
    data_publicacao: new Date(),
    data_encerramento: new Date(),
    funcionario_id: FUNCIONARIO_DATA[0].funcionario_id,
    canal_id: CANAL_DATA[0].canal_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Aviso({
    aviso_id: '2',
    titulo: 'Aviso 2',
    texto: 'teste3',
    arquivo: '',
    prioridade: '3',
    data_publicacao: new Date(),
    data_encerramento: new Date(),
    funcionario_id: FUNCIONARIO_DATA[0].funcionario_id,
    canal_id: CANAL_DATA[0].canal_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var LEMBRETE_DATA: Lembrete[] = [];

export function preencheDados() {
  // preenche turmas

  TURMA_DATA[0].alunos.push(ALUNO_DATA[0]);
  TURMA_DATA[0].alunos.push(ALUNO_DATA[1]);
  TURMA_DATA[2].alunos.push(ALUNO_DATA[2]);
  TURMA_DATA[2].alunos.push(ALUNO_DATA[3]);
  TURMA_DATA[2].alunos.push(ALUNO_DATA[4]);

  // preenche alunos

  ALUNO_DATA[0].responsaveis.push(RESPONSAVEL_DATA[1]);
  ALUNO_DATA[1].responsaveis.push(RESPONSAVEL_DATA[0]);
  ALUNO_DATA[1].responsaveis.push(RESPONSAVEL_DATA[1]);
  ALUNO_DATA[3].responsaveis.push(RESPONSAVEL_DATA[2]);

  ALUNO_DATA[0].turma = TURMA_DATA[0];
  ALUNO_DATA[1].turma = TURMA_DATA[0];
  ALUNO_DATA[2].turma = TURMA_DATA[2];
  ALUNO_DATA[3].turma = TURMA_DATA[2];
  ALUNO_DATA[4].turma = TURMA_DATA[2];

  // preenche responsaveis

  RESPONSAVEL_DATA[0].alunos.push(ALUNO_DATA[1]);
  RESPONSAVEL_DATA[1].alunos.push(ALUNO_DATA[0]);
  RESPONSAVEL_DATA[1].alunos.push(ALUNO_DATA[1]);
  RESPONSAVEL_DATA[2].alunos.push(ALUNO_DATA[3]);

  RESPONSAVEL_DATA[0].usuario = USUARIO_DATA[1];
  RESPONSAVEL_DATA[1].usuario = USUARIO_DATA[2];
  RESPONSAVEL_DATA[2].usuario = USUARIO_DATA[4];

  // preenche funcionarios

  FUNCIONARIO_DATA[0].usuario = USUARIO_DATA[0];
  FUNCIONARIO_DATA[1].usuario = USUARIO_DATA[3];
  FUNCIONARIO_DATA[2].usuario = USUARIO_DATA[4];
  FUNCIONARIO_DATA[3].usuario = USUARIO_DATA[5];

  FUNCIONARIO_DATA[0].cargo = CARGO_DATA[0];
  FUNCIONARIO_DATA[1].cargo = CARGO_DATA[1];
  FUNCIONARIO_DATA[2].cargo = CARGO_DATA[2];
  FUNCIONARIO_DATA[3].cargo = CARGO_DATA[2];

  // preenche cargos

  CARGO_DATA[0].funcionarios.push(FUNCIONARIO_DATA[0]);
  CARGO_DATA[1].funcionarios.push(FUNCIONARIO_DATA[1]);
  CARGO_DATA[2].funcionarios.push(FUNCIONARIO_DATA[2]);
  CARGO_DATA[2].funcionarios.push(FUNCIONARIO_DATA[3]);

  // preenche canal responsavel

  CANAL_RESPONSAVEL_DATA[0].canal = CANAL_DATA[0];
  CANAL_RESPONSAVEL_DATA[1].canal = CANAL_DATA[0];
  CANAL_RESPONSAVEL_DATA[2].canal = CANAL_DATA[1];
  CANAL_RESPONSAVEL_DATA[3].canal = CANAL_DATA[2];

  CANAL_RESPONSAVEL_DATA[0].responsavel = RESPONSAVEL_DATA[0];
  CANAL_RESPONSAVEL_DATA[1].responsavel = RESPONSAVEL_DATA[1];
  CANAL_RESPONSAVEL_DATA[2].responsavel = RESPONSAVEL_DATA[2];
  CANAL_RESPONSAVEL_DATA[3].responsavel = RESPONSAVEL_DATA[0];
}

export function logaData(info: any = undefined) {
  if (info === undefined) {
    console.log(USUARIO_DATA);
    console.log(RESPONSAVEL_DATA);
    console.log(ALUNO_DATA);
    console.log(TURMA_DATA);
    console.log(FUNCIONARIO_DATA);
    console.log(CARGO_DATA);
    console.log(FUNCIONALIDADE_DATA);
    console.log(CANAL_DATA);
    console.log(CANAL_RESPONSAVEL_DATA);
  } else {
    console.log(info);
  }
}
