import { Aviso } from "../../state/aviso/aviso-service/aviso.entity";

export interface LembreteInterface {
    lembrete_id: string,
    titulo: string,
    texto: string,
    data_lembrete: Date,
    aviso_id: string,
}

export class Lembrete {
    private _lembrete_id: string = '';
    private _titulo: string = '';
    private _texto: string = '';
    private _data_lembrete: Date = new Date();
    private _aviso: Aviso = new Aviso();

    constructor(
        private data?: LembreteInterface,
    ) {
        if (data !== undefined) {
            this._lembrete_id = data.lembrete_id
            this._titulo = data.titulo
            this._texto = data.texto
            this._data_lembrete = data.data_lembrete
            this._aviso.aviso_id = data.aviso_id
        }
    }

    public get id(): string {
        return this._lembrete_id;
    }
    public set id(value: string) {
        this._lembrete_id = value;
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
    public get data_lembrete(): Date {
        return this._data_lembrete;
    }
    public set data_lembrete(value: Date) {
        this._data_lembrete = value;
    }
    public get aviso(): Aviso {
        return this._aviso;
    }
    public set aviso(value: Aviso) {
        this._aviso = value;
    }
}

