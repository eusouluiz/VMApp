import { Usuario } from "../usuario-service/usuario.entity"

export interface ResponsavelInterface {
    id: string,
    user_id: string,
    created_at: Date,
    updated_at: Date,
    user_nome: string,
}

export class Responsavel {
    private _id: string = '';
    private _usuario: Usuario = new Usuario();
    private _created_at: Date = new Date();
    private _updated_at: Date = new Date();

    constructor (
        private data?: ResponsavelInterface
    ) {
        if (data !== undefined) {
            this._id = data.id
            this._usuario.user_id = data.user_id
            this._created_at = data.created_at
            this._updated_at = data.updated_at
        }
    }
    
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    public get usuario(): Usuario {
        return this._usuario
    }
    public set usuario(value: Usuario) {
        this._usuario = value
    }
    public get created_at(): Date {
        return this._created_at
    }
    public set created_at(value: Date) {
        this._created_at = value
    }
    public get updated_at(): Date {
        return this._updated_at
    }
    public set updated_at(value: Date) {
        this._updated_at = value
    }
}