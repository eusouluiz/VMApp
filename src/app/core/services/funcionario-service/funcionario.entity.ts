import { Cargo } from "../cargo-service/cargo.entity"
import { Usuario } from "../usuario-service/usuario.entity"

export interface FuncionarioInterface {
    funcionario_id: string,
    user_id: string,
    cargo_id: string | null,
    created_at: Date,
    updated_at: Date,
    user_nome?: string,
}

export class Funcionario {
    private _funcionario_id: string = '';
    private _usuario: Usuario = new Usuario();
    private _cargo: Cargo = new Cargo();
    private _created_at: Date = new Date();
    private _updated_at: Date = new Date();

    constructor (
        private data?: FuncionarioInterface
    ) {
        if (data !== undefined) {
            this._funcionario_id = data.funcionario_id
            this._usuario.user_id = data.user_id
            this._created_at = data.created_at
            this._updated_at = data.updated_at
            
            if (data.cargo_id !== null) {
                this._cargo.cargo_id = data.cargo_id
            }
        }
    }
    
    public get funcionario_id(): string {
        return this._funcionario_id
    }
    public set funcionario_id(value: string) {
        this._funcionario_id = value
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