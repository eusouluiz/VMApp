
export interface UsuarioInterface {
    user_id: string,
    nome: string,
    cpf: string,
    telefone: string,
    tipo: string,
    email: string,
}

export class Usuario {
    private _user_id: string = '';
    private _nome: string = '';
    private _cpf: string = '';
    private _telefone: string = '';
    private _tipo: string = '';

    constructor (
        private data?: UsuarioInterface
    ) {
        if (data !== undefined) {
            this._user_id = data.user_id
            this._nome = data.nome
            this._cpf = data.cpf
            this._telefone = data.telefone
            this._tipo = data.tipo
        }
    }
    
    public get user_id(): string {
        return this._user_id
    }
    public set user_id(value: string) {
        this._user_id = value
    }
    public get nome(): string {
        return this._nome
    }
    public set nome(value: string) {
        this._nome = value
    }
    public get cpf(): string {
        return this._cpf
    }
    public set cpf(value: string) {
        this._cpf = value
    }
    public get telefone(): string {
        return this._telefone
    }
    public set telefone(value: string) {
        this._telefone = value
    }
    public get tipo(): string {
        return this._tipo
    }
    public set tipo(value: string) {
        this._tipo = value
    }
}