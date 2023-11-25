import { Responsavel, ResponsavelInterface } from "../responsavel/responsavel.entity";
import { Turma } from "../turma/turma.entity"

export interface AlunoInterface {
    aluno_id?: string,
    cgm: string,
    nome: string,
    turma?: Turma,
    turma_id?: string | null,
    responsaveis?: ResponsavelInterface[],
}

export class Aluno {
    private _aluno_id: string = '';
    private _cgm: string = '';
    private _nome: string = '';
    private _turma: Turma = new Turma();
    private _responsaveis: Responsavel[] = [];
    public turma_id: string = ''

    constructor(
        data?: AlunoInterface
    ) {
        if (data !== undefined) {
            if (data.aluno_id !== undefined) {
                this._aluno_id = data.aluno_id
            }
            this._cgm = data.cgm
            this._nome = data.nome

            if (data.turma !== undefined) {
                this._turma = data.turma
            } else if (data.turma_id !== undefined && data.turma_id !== null) {
                this._turma.turma_id = data.turma_id
            }

            if (data.responsaveis !== undefined) {
                data.responsaveis.forEach((responsavel) => {
                    this._responsaveis.push(new Responsavel(responsavel))
                })
            }
        }
    }

    converterAlunoInterface(): AlunoInterface {
        return {
            aluno_id: this._aluno_id,
            cgm: this._cgm,
            nome: this._nome,
            turma: this._turma,
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
}