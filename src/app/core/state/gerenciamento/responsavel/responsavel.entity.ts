import { Aluno } from "../aluno/aluno.entity";
import { Usuario } from "../usuario/usuario.entity"

export interface ResponsavelInterface {
    responsavel_id: string,
    user: Usuario,
    alunos?: Aluno[],
    user_nome?: string,
}

export class Responsavel {
    private _responsavel_id: string = '';
    private _usuario: Usuario = new Usuario();
    private _alunos: Aluno[] = [];

    constructor(
        private data?: ResponsavelInterface
    ) {
        if (data !== undefined) {
            this._responsavel_id = data.responsavel_id
            this._usuario = data.user
            if (data.alunos !== undefined) {
                this._alunos = data.alunos
            }
        }
    }

    converterResponsavelInterface(): ResponsavelInterface{
        return {
            responsavel_id: this._responsavel_id,
            user: this._usuario
        }
    }

    public get responsavel_id(): string {
        return this._responsavel_id
    }
    public set responsavel_id(value: string) {
        this._responsavel_id = value
    }
    public get usuario(): Usuario {
        return this._usuario
    }
    public set usuario(value: Usuario) {
        this._usuario = value
    }
    public get alunos(): Aluno[] {
        return this._alunos;
    }
    public set alunos(value: Aluno[]) {
        this._alunos = value;
    }
}