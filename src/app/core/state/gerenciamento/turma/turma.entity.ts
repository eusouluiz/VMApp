import { Aluno } from '../aluno/aluno.entity';

export interface TurmaInterface {
    turma_id: string,
    nome: string,
    descricao: string,
    alunos?: Aluno[],
}

export class Turma {
    private _turma_id: string = '';
    private _nome: string = '';
    private _descricao: string = '';
    private _alunos: Aluno[] = [];

    constructor(
        private data?: TurmaInterface,
    ) {
        if (data !== undefined) {
            this._turma_id = data.turma_id
            this._nome = data.nome
            this._descricao = data.descricao

            if (data.alunos !== undefined) {
                this._alunos = data.alunos
            }
        }
    }

    public get turma_id(): string {
        return this._turma_id;
    }
    public set turma_id(value: string) {
        this._turma_id = value;
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
    public get alunos(): Aluno[] {
        return this._alunos;
    }
    public set alunos(value: Aluno[]) {
        this._alunos = value;
    }
}