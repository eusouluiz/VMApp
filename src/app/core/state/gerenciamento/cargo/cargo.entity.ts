import { Funcionalidade } from '../funcionalidade/funcionalidade.entity';
import { Funcionario } from '../funcionario/funcionario.entity';

export interface CargoInterface {
    cargo_id: string,
    nome: string,
    descricao: string,
    updated_at: Date,
    created_at: Date
}

export class Cargo {
    private _cargo_id: string = '';
    private _nome: string = '';
    private _descricao: string = '';
    private _funcionarios: Funcionario[] = [];
    private _funcionalidades: Funcionalidade[] = [];
    private _updated_at: Date = new Date();
    private _created_at: Date = new Date();

    constructor(
        private data?: CargoInterface,
        private listaFuncionarios?: Funcionario[],
        private listaFuncionalidades?: Funcionalidade[],
    ) {
        if (data !== undefined) {
            this._cargo_id = data.cargo_id
            this._nome = data.nome
            this._descricao = data.descricao
            this._updated_at = data.updated_at
            this._created_at = data.created_at

            if (listaFuncionarios !== undefined) {
                this._funcionarios = listaFuncionarios
            }
            if (listaFuncionalidades !== undefined) {
                this._funcionalidades = listaFuncionalidades
            }
        }
    }

    public get cargo_id(): string {
        return this._cargo_id;
    }
    public set cargo_id(value: string) {
        this._cargo_id = value;
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
    public get funcionarios(): Funcionario[] {
        return this._funcionarios;
    }
    public set funcionarios(value: Funcionario[]) {
        this._funcionarios = value;
    }
    public get funcionalidades(): Funcionalidade[] {
        return this._funcionalidades;
    }
    public set funcionalidades(value: Funcionalidade[]) {
        this._funcionalidades = value;
    }
    public get updated_at(): Date {
        return this._updated_at;
    }
    public set updated_at(value: Date) {
        this._updated_at = value;
    }
    public get created_at(): Date {
        return this._created_at;
    }
    public set created_at(value: Date) {
        this._created_at = value;
    }
}