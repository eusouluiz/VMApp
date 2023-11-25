import { DataUtil } from './../../../../shared/utilities/data/data.utility';

export interface MensagemInterface {
    //id que vem do supabase
    id?: string,
    mensagem_id?: string,
    texto: string,
    arquivo: string,
    lida: boolean,
    data_envio: string,
    data_envio_date?: Date,
    data_leitura?: string,
    user_id: string,
    canal_responsavel_id: string,
}

export class Mensagem {
    private _mensagem_id: string = ''
    private _texto: string = ''
    private _arquivo: string = ''
    private _lida: boolean = false
    private _data_envio: Date = new Date()
    private _data_leitura: Date = new Date()
    private _user_id: string = ''
    private _canal_responsavel_id: string = ''

    constructor(
        private data?: MensagemInterface,
    ) {
        if (data !== undefined) {
            if (data.mensagem_id !== undefined) {
                this._mensagem_id = data.mensagem_id;
            } 
            this._texto = data.texto
            this._arquivo = data.arquivo
            this._lida = data.lida
            if (data.data_envio_date !== undefined) {
                this._data_envio = data.data_envio_date
            } else {
                this._data_envio = new Date(data.data_envio)
            }
            if (data.data_leitura !== undefined && data.data_leitura !== null) {
                this._data_leitura = new Date(data.data_leitura)
            }
            this._user_id = data.user_id
            this._canal_responsavel_id = data.canal_responsavel_id
        }
    }

    public get mensagem_id(): string {
        return this._mensagem_id;
    }
    public set mensagem_id(value: string) {
        this._mensagem_id = value;
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
    public get lida(): boolean {
        return this._lida
    }
    public set lida(value: boolean) {
        this._lida = value
    }
    public get data_envio(): Date {
        return this._data_envio
    }
    public set data_envio(value: Date) {
        this._data_envio = value
    }
    public get data_leitura(): Date {
        return this._data_leitura
    }
    public set data_leitura(value: Date) {
        this._data_leitura = value
    }
    public get user_id(): string {
        return this._user_id
    }
    public set user_id(value: string) {
        this._user_id = value
    }
    public get canal_responsavel_id(): string {
        return this._canal_responsavel_id
    }
    public set canal_responsavel_id(value: string) {
        this._canal_responsavel_id = value
    }
}

