import { Aluno } from "../aluno/aluno.entity";
import { Usuario } from "../../../services/usuario-service/usuario.entity"

export interface ResponsavelInterface {
    responsavel_id: string,
    user: Usuario,
    created_at: Date,
    updated_at: Date,
    alunos?: Aluno[],
    user_nome?: string,
}

export class Responsavel {
    private _responsavel_id: string = '';
    private _usuario: Usuario = new Usuario();
    private _alunos: Aluno[] = [];
    private _created_at: Date = new Date();
    private _updated_at: Date = new Date();

    constructor (
        private data?: ResponsavelInterface
    ) {
        if (data !== undefined) {
            this._responsavel_id = data.responsavel_id
            this._usuario = data.user
            this._created_at = data.created_at
            this._updated_at = data.updated_at
            if (data.alunos !== undefined){
                this._alunos = data.alunos
            }
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