// ====================================
// ENTIDADES
// ====================================

import { Aluno } from '../../../core/state/gerenciamento/aluno/aluno.entity';
import { Aviso, AvisoResponsavel } from '../../../core/services/aviso-service/aviso.entity';
import { Canal, CanalResponsavel } from '../../../core/state/gerenciamento/canal/canal.entity';
import { Cargo } from '../../../core/state/gerenciamento/cargo/cargo.entity';
import { Funcionalidade } from '../../../core/state/gerenciamento/funcionalidade/funcionalidade.entity';
import { Funcionario } from '../../../core/state/gerenciamento/funcionario/funcionario.entity';
import { Lembrete } from '../../../core/services/lembrete-service/lembrete.entity';
import { Mensagem } from '../../../core/state/mensagem/mensagem-service/mensagem.entity';
import { Responsavel } from '../../../core/state/gerenciamento/responsavel/responsavel.entity';
import { Turma } from '../../../core/state/gerenciamento/turma/turma.entity';
import { Usuario } from '../../../core/state/gerenciamento/usuario/usuario.entity';

export var USUARIO_DATA: Usuario[] = [
  new Usuario({
    user_id: '9a9f86a8-bc35-468d-bfc8-2f2197d5823f',
    nome: 'Vivian Marçal',
    cpf: '80798419008',
    telefone: '91984232701',
    tipo: 'F',
    password: 'password'
  }),
  new Usuario({
    user_id: "9a9f8466-1760-4ed2-aa57-f691a8547d5e",
    nome: 'Gabriel Falavinha Gomes',
    cpf: '47683610054',
    telefone: '19985094994',
    tipo: 'R',
    password: 'julho013'
  }),
  new Usuario({
    user_id: '2',
    nome: 'Giacomo Vaz',
    cpf: '08918011970',
    telefone: '041988222527',
    tipo: 'R'
  }),
  new Usuario({
    user_id: 'ed232b7e-3c33-44b1-9e81-8514f6620079',
    nome: 'Luiz Nascimento',
    cpf: '35345610070',
    telefone: '98988477611',
    tipo: 'R',
    password: 'pacoca03'
  }),
  new Usuario({
    user_id: '4',
    nome: 'Maria Eduarda Almeida',
    cpf: '00011122233',
    telefone: '62993507254',
    tipo: 'F',
  }),
  new Usuario({
    user_id: '5',
    nome: 'Ana Vitoria Oliveira',
    cpf: '55555555555',
    telefone: '68988704784',
    tipo: 'A',
  }),
];

export var TURMA_DATA: Turma[] = [
  new Turma({
    turma_id: '0',
    nome: 'Turma A Manha',
    descricao: '',
  }),
  new Turma({
    turma_id: '1',
    nome: 'Turma B Manha',
    descricao: '',
  }),
  new Turma({
    turma_id: '2',
    nome: 'Turma A Tarde',
    descricao: '',
  }),
];

export var ALUNO_DATA: Aluno[] = [
  new Aluno({
    aluno_id: '0',
    nome: 'Stephanie Falavinha',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[0].turma_id,
  }),
  new Aluno({
    aluno_id: '1',
    nome: 'Eduardo Nascimento',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[0].turma_id,
  }),
  new Aluno({
    aluno_id: '2',
    nome: 'Diogo Pluma',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[0].turma_id,
  }),
  new Aluno({
    aluno_id: '3',
    nome: 'Felipe Prezado',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[2].turma_id,
  }),
  new Aluno({
    aluno_id: '4',
    nome: 'Mozart Murilo',
    cgm: '123456789012345',
    turma_id: TURMA_DATA[2].turma_id,
  }),
];

export var RESPONSAVEL_DATA: Responsavel[] = [
  new Responsavel({
    responsavel_id: "9a9f8466-1bb8-46ea-8318-58b68ad8f328",
    user: USUARIO_DATA[1],
  }),
  new Responsavel({
    responsavel_id: '1',
    user: USUARIO_DATA[2],
  }),
  new Responsavel({
    responsavel_id: '2',
    user: USUARIO_DATA[3],
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
      nome: 'Administração',
      descricao: '',
    },
    undefined,
    FUNCIONALIDADE_DATA
  ),
  new Cargo({
    cargo_id: '1',
    nome: 'Secretaria',
    descricao: '',
  }),
  new Cargo({
    cargo_id: '2',
    nome: 'Funcionarios - Funcionario',
    descricao: '',
  }),
];

export var FUNCIONARIO_DATA: Funcionario[] = [
  new Funcionario({
    funcionario_id: '0',
    user: USUARIO_DATA[0],
    cargo_id: CARGO_DATA[0].cargo_id,
  }),
  new Funcionario({
    funcionario_id: '1',
    user: USUARIO_DATA[3],
    cargo_id: CARGO_DATA[1].cargo_id,
  }),
  new Funcionario({
    funcionario_id: '2',
    user: USUARIO_DATA[4],
    cargo_id: CARGO_DATA[2].cargo_id,
  }),
  new Funcionario({
    funcionario_id: '3',
    user: USUARIO_DATA[5],
    cargo_id: CARGO_DATA[2].cargo_id,
  }),
];

export var CANAL_DATA: Canal[] = [
  new Canal({ canal_id: '0', nome: 'Administração', descricao: '', updated_at: new Date(), created_at: new Date() }, [
    CARGO_DATA[0],
  ]),
  new Canal({
    canal_id: '1',
    nome: 'Secretária',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
  new Canal({
    canal_id: '2',
    nome: 'Pedagogia',
    descricao: '',
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var CANAL_RESPONSAVEL_DATA: CanalResponsavel[] = [
  new CanalResponsavel({
    canal_responsavel_id: '9aad8767-42e1-4b4b-89db-f9bff6e01a7c',
    canal_id: '50868b06-8680-11ee-b9d1-0242ac120002',
    responsavel_id: '9aac75fd-aa76-4482-9e44-e90e0170d912',
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
];

export var MENSAGEM_DATA: Mensagem[] = [
  new Mensagem({
    mensagem_id: '2',
    texto: 'Olá! Precisamos atualizar nossos registros e gostaríamos de solicitar uma cópia do comprovante de endereço atualizado. Isso nos ajudará a manter nossas informações atualizadas.',
    arquivo: '',
    lida: false,
    data_envio: '1995-12-17T10:13:00',
    data_leitura: '',
    user_id: USUARIO_DATA[0].user_id,
    canal_responsavel_id: CANAL_RESPONSAVEL_DATA[1].canal_responsavel_id,
  }),
  new Mensagem({
    mensagem_id: '1',
    texto: 'Olá! Com certeza estarei lá. Mal posso esperar para conversar sobre o futuro da escola.',
    arquivo: '',
    lida: false,
    data_envio: '1995-12-17T12:01:00',
    data_leitura: '',
    user_id: USUARIO_DATA[1].user_id,
    canal_responsavel_id: CANAL_RESPONSAVEL_DATA[0].canal_responsavel_id,
  }),
  new Mensagem({
    mensagem_id: '0',
    texto: 'Olá, Gabriel! Gostaríamos de confirmar a sua presença na reunião de pais e professores agendada para amanhã às 18h. É uma ótima oportunidade para discutirmos questõs importantes sobre a educação de nossos alunos',
    arquivo: '',
    lida: false,
    data_envio: '1995-12-17T11:33:00',
    data_leitura: '',
    user_id: USUARIO_DATA[0].user_id,
    canal_responsavel_id: CANAL_RESPONSAVEL_DATA[0].canal_responsavel_id,
  }),
];

export var AVISO_DATA: Aviso[] = [
  new Aviso({
    aviso_id: '0',
    titulo: 'Aula Aberta: Conectando Pais e Alunos',
    texto: 'Convidamos todos os pais a participar de nossa Aula Aberta, uma oportunidade para vivenciar o ambiente de aprendizado de seus filhos. Conecte-se com professores, compreenda as metodologias de ensino e compartilhe momentos educativos únicos com seus filhos.',
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
    titulo: 'Campanha Solidária: Espalhando o Amor',
    texto: 'Participe de nossa campanha solidária para arrecadar itens essenciais para comunidades carentes. Juntos, podemos fazer a diferença! Contribua com alimentos não perecíveis, roupas e produtos de higiene. Vamos espalhar o amor e construir um mundo mais compassivo.',
    arquivo: '',
    prioridade: '2',
    data_publicacao: new Date(),
    data_encerramento: new Date(),
    funcionario_id: FUNCIONARIO_DATA[0].funcionario_id,
    canal_id: CANAL_DATA[0].canal_id,
    updated_at: new Date(),
    created_at: new Date(),
  }),
];

export var AVISO_RESPONSAVEL_DATA: AvisoResponsavel[] = [
  new AvisoResponsavel({
    aviso_responsavel_id: '0',
    aviso_id: AVISO_DATA[0].aviso_id,
    responsavel_id: RESPONSAVEL_DATA[0].responsavel_id,
    ind_visualizacao: false,
  }),
  new AvisoResponsavel({
    aviso_responsavel_id: '1',
    aviso_id: AVISO_DATA[0].aviso_id,
    responsavel_id: RESPONSAVEL_DATA[1].responsavel_id,
    ind_visualizacao: true,
  }),
  new AvisoResponsavel({
    aviso_responsavel_id: '2',
    aviso_id: AVISO_DATA[0].aviso_id,
    responsavel_id: RESPONSAVEL_DATA[2].responsavel_id,
    ind_visualizacao: false,
  }),
]

export var LEMBRETE_DATA: Lembrete[] = [];

export function preencheDados() {
  // preenche turmas

  TURMA_DATA[0].alunos.push(ALUNO_DATA[0]);
  TURMA_DATA[0].alunos.push(ALUNO_DATA[1]);
  TURMA_DATA[2].alunos.push(ALUNO_DATA[2]);
  TURMA_DATA[2].alunos.push(ALUNO_DATA[3]);
  TURMA_DATA[2].alunos.push(ALUNO_DATA[4]);

  // preenche alunos

  ALUNO_DATA[0].responsaveis.push(RESPONSAVEL_DATA[0]);
  ALUNO_DATA[2].responsaveis.push(RESPONSAVEL_DATA[0]);
  ALUNO_DATA[1].responsaveis.push(RESPONSAVEL_DATA[1]);
  ALUNO_DATA[3].responsaveis.push(RESPONSAVEL_DATA[2]);

  ALUNO_DATA[0].turma = TURMA_DATA[0];
  ALUNO_DATA[1].turma = TURMA_DATA[0];
  ALUNO_DATA[2].turma = TURMA_DATA[2];
  ALUNO_DATA[3].turma = TURMA_DATA[2];
  ALUNO_DATA[4].turma = TURMA_DATA[2];

  // preenche responsaveis

  RESPONSAVEL_DATA[0].alunos.push(ALUNO_DATA[2]);
  RESPONSAVEL_DATA[0].alunos.push(ALUNO_DATA[0]);
  RESPONSAVEL_DATA[1].alunos.push(ALUNO_DATA[1]);
  RESPONSAVEL_DATA[2].alunos.push(ALUNO_DATA[3]);

  RESPONSAVEL_DATA[0].usuario = USUARIO_DATA[1];
  RESPONSAVEL_DATA[1].usuario = USUARIO_DATA[2];
  RESPONSAVEL_DATA[2].usuario = USUARIO_DATA[3];

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

  CANAL_RESPONSAVEL_DATA[0].responsavel = RESPONSAVEL_DATA[0];
  CANAL_RESPONSAVEL_DATA[1].responsavel = RESPONSAVEL_DATA[1];
  CANAL_RESPONSAVEL_DATA[2].responsavel = RESPONSAVEL_DATA[2];

  // preenche aviso responsavel

  AVISO_RESPONSAVEL_DATA[0].aviso = AVISO_DATA[0];
  AVISO_RESPONSAVEL_DATA[1].aviso = AVISO_DATA[0];
  AVISO_RESPONSAVEL_DATA[2].aviso = AVISO_DATA[0];

  AVISO_RESPONSAVEL_DATA[0].responsavel = RESPONSAVEL_DATA[0];
  AVISO_RESPONSAVEL_DATA[1].responsavel = RESPONSAVEL_DATA[1];
  AVISO_RESPONSAVEL_DATA[2].responsavel = RESPONSAVEL_DATA[2];
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
