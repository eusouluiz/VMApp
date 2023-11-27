import { ConstantesFuncionalidades } from "../../../../shared/utilities/constantes/constantes.utility";

export interface FuncionalidadeInterface {
    funcionalidade_id: string,
    nome: string,
    descricao: string,
}

export class Funcionalidade {
    private _funcionalidade_id: string = '';
    private _nome: string = '';
    private _descricao: string = '';

    constructor (
        private data?: FuncionalidadeInterface,
    ) {
        if (data !== undefined) {
            this._funcionalidade_id = data.funcionalidade_id
            this._nome = data.nome
            this._descricao = data.descricao
        }
    }
    
    public get funcionalidade_id(): string {
        return this._funcionalidade_id;
    }
    public set id(value: string) {
        this._funcionalidade_id = value;
    }
    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }
    public get descricao(): string {
        return this._descricao;
    }
    public set descricao(value: string) {
        this._descricao = value;
    }
}

export var FUNCIONALIDADE_DATA: Funcionalidade[] = [
    new Funcionalidade({
      funcionalidade_id: ConstantesFuncionalidades.GERENCIAMENTO_RESPONSAVEL,
      nome: 'Gerenciamento Responsáveis',
      descricao: 'Gerencia todos os responsáveis',
    }),
    new Funcionalidade({
      funcionalidade_id: ConstantesFuncionalidades.GERENCIAMENTO_ALUNO,
      nome: 'Gerenciamento Aluno',
      descricao: 'Gerencia todos os alunos',
    }),
    new Funcionalidade({
      funcionalidade_id: ConstantesFuncionalidades.GERENCIAMENTO_TURMA,
      nome: 'Gerenciamento Turma',
      descricao: 'Gerencia todas as turmas',
    }),
    new Funcionalidade({
      funcionalidade_id: ConstantesFuncionalidades.GERENCIAMENTO_FUNCIONARIO,
      nome: 'Gerenciamento Funcionários',
      descricao: 'Gerencia todos os funcionários',
    }),
    new Funcionalidade({
      funcionalidade_id: ConstantesFuncionalidades.GERENCIAMENTO_CARGO,
      nome: 'Gerenciamento Cargo',
      descricao: 'Gerencia todos os cargos',
    }),
    new Funcionalidade({
      funcionalidade_id: ConstantesFuncionalidades.GERENCIAMENTO_CANAL,
      nome: 'Gerenciamento Canal',
      descricao: 'Gerencia todos os canais',
    }),
    new Funcionalidade({
      funcionalidade_id: ConstantesFuncionalidades.GERENCIAMENTO_AVISO,
      nome: 'Gerenciamento Aviso',
      descricao: 'Gerencia todos os avisos',
    }),
  ];