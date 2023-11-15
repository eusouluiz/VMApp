
export interface CanalInterface {
    id: string,
    nome: string,
    descricao: string,
    updated_at: Date,
    created_at: Date
}

export class Canal {
    private _id: string = '';
    private _nome: string = '';
    private _descricao: string = '';
    private _updated_at: Date = new Date();
    private _created_at: Date = new Date();

    constructor (
        private data?: CanalInterface,
    ) {
        if (data !== undefined) {
            this._id = data.id
            this._nome = data.nome
            this._descricao = data.descricao
            this._updated_at = data.updated_at
            this._created_at = data.created_at

        }
    }
    
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
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

