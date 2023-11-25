import { Cargo } from "../cargo/cargo.entity"
import { Usuario } from "../usuario/usuario.entity"

export interface FuncionarioInterface {
    funcionario_id: string,
    user: Usuario,
    cargo?: Cargo,
    cargo_id?: string | null,
}

export class Funcionario {
    private _funcionario_id: string = '';
    private _usuario: Usuario = new Usuario();
    private _cargo: Cargo = new Cargo();

    constructor(
        private data?: FuncionarioInterface
    ) {
        if (data !== undefined) {
            this._funcionario_id = data.funcionario_id
            this._usuario = data.user

            if (data.cargo !== undefined) {
                this._cargo = data.cargo
            } else if (data.cargo_id !== undefined && data.cargo_id !== null) {
                this._cargo.cargo_id = data.cargo_id
            }
        }
    }

    converterFuncionarioInterface(): FuncionarioInterface {
        return {
            funcionario_id: this._funcionario_id,
            user: this._usuario,
            cargo: this._cargo,
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
}