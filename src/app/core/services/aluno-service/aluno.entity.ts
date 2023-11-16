import { Responsavel } from "../responsavel-service/responsavel.entity";
import { Turma } from "../turma-service/turma.entity"

export interface AlunoInterface {
    aluno_id: string,
    cgm: string,
    nome: string,
    turma_id: string | null,
    created_at: Date,
    updated_at: Date
}

export class Aluno {
    private _aluno_id: string = '';
    private _cgm: string = '';
    private _nome: string = '';
    private _turma: Turma = new Turma();
    private _responsaveis: Responsavel[] = [];
    private _created_at: Date = new Date();
    private _updated_at: Date = new Date();

    constructor (
        private data?: AlunoInterface
    ) {
        if (data !== undefined) {
            this._aluno_id = data.aluno_id
            this._cgm = data.cgm
            this._nome = data.nome
            this._created_at = data.created_at
            this._updated_at = data.updated_at
    
            if (data.turma_id !== null) {
                this._turma.turma_id = data.turma_id
            }
        }
    }
    
    public get aluno_id(): string {
        return this._aluno_id
    }
    public set aluno_id(value: string) {
        this._aluno_id = value
    }
    public get cgm(): string {
        return this._cgm
    }
    public set cgm(value: string) {
        this._cgm = value
    }
    public get nome(): string {
        return this._nome
    }
    public set nome(value: string) {
        this._nome = value
    }
    public get turma(): Turma {
        return this._turma
    }
    public set turma(value: Turma) {
        this._turma = value
    }
    public get responsaveis(): Responsavel[] {
        return this._responsaveis;
    }
    public set responsaveis(value: Responsavel[]) {
        this._responsaveis = value;
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