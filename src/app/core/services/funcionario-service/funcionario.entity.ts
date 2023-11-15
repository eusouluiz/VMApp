import { Cargo } from "../cargo-service/cargo.entity"
import { Usuario } from "../usuario-service/usuario.entity"

export interface FuncionarioInterface {
    id: string,
    user_id: string,
    cargo_id: string | null,
    created_at: Date,
    updated_at: Date,
    user_nome: string,
}

export class Funcionario {
    private _id: string = '';
    private _usuario: Usuario = new Usuario();
    private _cargo: Cargo = new Cargo();
    private _created_at: Date = new Date();
    private _updated_at: Date = new Date();

    constructor (
        private data?: FuncionarioInterface
    ) {
        if (data !== undefined) {
            this._id = data.id
            this._usuario.user_id = data.user_id
            this._created_at = data.created_at
            this._updated_at = data.updated_at
            
            if (data.cargo_id !== null) {
                this._cargo.id = data.cargo_id
            }
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
    public get cargo(): Cargo {
        return this._cargo
    }
    public set cargo(value: Cargo) {
        this._cargo = value
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