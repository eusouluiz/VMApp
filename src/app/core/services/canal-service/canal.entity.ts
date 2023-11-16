import { Cargo } from "../cargo-service/cargo.entity";
import { Responsavel } from "../responsavel-service/responsavel.entity";

export interface CanalInterface {
    canal_id: string,
    nome: string,
    descricao: string,
    updated_at: Date,
    created_at: Date
}

export class Canal {
    private _canal_id: string = '';
    private _nome: string = '';
    private _descricao: string = '';
    private _cargos: Cargo[] = [];
    private _updated_at: Date = new Date();
    private _created_at: Date = new Date();

    constructor (
        private data?: CanalInterface,
        private listaCargos?: Cargo[]
    ) {
        if (data !== undefined) {
            this._canal_id = data.canal_id
            this._nome = data.nome
            this._descricao = data.descricao
            this._updated_at = data.updated_at
            this._created_at = data.created_at

            if (listaCargos !== undefined){
                this._cargos = listaCargos
            }
        }
    }
    
    public get canal_id(): string {
        return this._canal_id;
    }
    public set canal_id(value: string) {
        this._canal_id = value;
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
    public get cargos(): Cargo[] {
        return this._cargos;
    }
    public set cargos(value: Cargo[]) {
        this._cargos = value;
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


export interface CanalResponsavelInterface {
    canal_responsavel_id: string,
    canal_id: string,
    responsavel_id: string,
    updated_at: Date,
    created_at: Date
}

export class CanalResponsavel {
    private _canal_responsavel_id: string = '';
    private _canal: Canal = new Canal();
    private _responsavel: Responsavel = new Responsavel();
    private _updated_at: Date = new Date();
    private _created_at: Date = new Date();

    constructor (
        private data?: CanalResponsavelInterface,
    ) {
        if (data !== undefined) {
            this._canal_responsavel_id = data.canal_responsavel_id
            this._canal.canal_id = data.canal_id
            this._responsavel.responsavel_id = data.responsavel_id
            this._updated_at = data.updated_at
            this._created_at = data.created_at

        }
    }
    
    public get canal_responsavel_id(): string {
        return this._canal_responsavel_id;
    }
    public set canal_responsavel_id(value: string) {
        this._canal_responsavel_id = value;
    }
    public get canal(): Canal {
        return this._canal;
    }
    public set canal(value: Canal) {
        this._canal = value;
    }
    public get responsavel(): Responsavel {
        return this._responsavel;
    }
    public set responsavel(value: Responsavel) {
        this._responsavel = value;
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

