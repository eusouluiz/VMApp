import { Turma } from "../turma-service/turma.entity"

export interface AlunoInterface {
    id: string,
    cgm: string,
    nome: string,
    turma_id: string | null,
    created_at: Date,
    updated_at: Date
}

export class Aluno {
    private _id: string = '';
    private _cgm: string = '';
    private _nome: string = '';
    private _turma: Turma = new Turma();
    private _created_at: Date = new Date();
    private _updated_at: Date = new Date();

    constructor (
        private data?: AlunoInterface
    ) {
        if (data !== undefined) {
            this._id = data.id
            this._cgm = data.cgm
            this._nome = data.nome
            this._created_at = data.created_at
            this._updated_at = data.updated_at
    
            if (data.turma_id !== null) {
                this._turma.id = data.turma_id
            }
        }
    }
    
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
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