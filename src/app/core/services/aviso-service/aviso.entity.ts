
export interface AvisoInterface {
    id: string,
    titulo: string,
    texto: string,
    arquivo: string,
    prioridade: string,
    data_publicacao: Date,
    data_encerramento: Date,
    funcionario_id: string,
    canal_id: string,
    updated_at: Date,
    created_at: Date
}

export class Aviso {
    private _id: string = '';
    private _titulo: string = '';
    private _texto: string = '';
    private _arquivo: string = '';
    private _prioridade: string = '';
    private _data_publicacao: Date = new Date();
    private _data_encerramento: Date = new Date();
    private _funcionario_id: string = '';
    private _canal_id: string = '';
    private _updated_at: Date = new Date();
    private _created_at: Date = new Date();

    constructor (
        private data?: AvisoInterface,
    ) {
        if (data !== undefined) {
            this._id = data.id
            this._titulo = data.titulo
            this._texto = data.texto
            this._arquivo = data.arquivo
            this._prioridade = data.prioridade
            this._data_publicacao = data.data_publicacao
            this._data_encerramento = data.data_encerramento
            this._funcionario_id = data.funcionario_id
            this._canal_id = data.canal_id
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
    public get titulo(): string {
        return this._titulo;
    }
    public set titulo(value: string) {
        this._titulo = value;
    }
    public get texto(): string {
        return this._texto;
    }
    public set texto(value: string) {
        this._texto = value;
    }
    public get arquivo(): string {
        return this._arquivo;
    }
    public set arquivo(value: string) {
        this._arquivo = value;
    }
    public get prioridade(): string {
        return this._prioridade;
    }
    public set prioridade(value: string) {
        this._prioridade = value;
    }
    public get data_publicacao(): Date {
        return this._data_publicacao;
    }
    public set data_publicacao(value: Date) {
        this._data_publicacao = value;
    }
    public get data_encerramento(): Date {
        return this._data_encerramento;
    }
    public set data_encerramento(value: Date) {
        this._data_encerramento = value;
    }
    public get funcionario_id(): string {
        return this._funcionario_id;
    }
    public set funcionario_id(value: string) {
        this._funcionario_id = value;
    }
    public get canal_id(): string {
        return this._canal_id;
    }
    public set canal_id(value: string) {
        this._canal_id = value;
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

