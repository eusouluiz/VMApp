import { Funcionalidade } from '../funcionalidade/funcionalidade.entity';
import { Funcionario, FuncionarioInterface } from '../funcionario/funcionario.entity';

export interface CargoInterface {
    cargo_id?: string,
    nome: string,
    descricao?: string,
    funcionalidades?: Funcionalidade[]
    funcionarios?: FuncionarioInterface[]
}

export class Cargo {
    private _cargo_id: string = '';
    private _nome: string = '';
    private _descricao: string = '';
    private _funcionarios: Funcionario[] = [];
    private _funcionalidades: Funcionalidade[] = [];

    constructor(
        private data?: CargoInterface,
    ) {
        if (data !== undefined) {
            if (data.cargo_id !== undefined) {
                this._cargo_id = data.cargo_id
            }
            this._nome = data.nome
            if (data.descricao !== undefined) {
                this._descricao = data.descricao
            }

            if (data.funcionarios !== undefined) {
                data.funcionarios.forEach((funcionario) => {
                    this._funcionarios.push(new Funcionario(funcionario))
                })
            }
            if (data.funcionalidades !== undefined) {
                this._funcionalidades = data.funcionalidades
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
}