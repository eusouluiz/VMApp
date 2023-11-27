import { Lembrete, LembreteInterface } from '../lembrete/lembrete.entity';
import { Canal } from '../../gerenciamento/canal/canal.entity';
import { Funcionario } from '../../gerenciamento/funcionario/funcionario.entity';
import { Responsavel } from '../../gerenciamento/responsavel/responsavel.entity';
import { Turma } from '../../gerenciamento/turma/turma.entity';

export interface AvisoInterface {
  aviso_id?: string;
  titulo: string;
  texto: string;
  arquivo: string;
  prioridade: string;
  data_publicacao: string;
  data_encerramento?: string;
  funcionario?: Funcionario;
  funcionario_id: string;
  canal_id: string;
  turmas?: Turma[];
  lembrete?: LembreteInterface;
}

export class Aviso {
  private _aviso_id: string = '';

  private _titulo: string = '';

  private _texto: string = '';

  private _arquivo: string = '';

  private _prioridade: string = '';

  private _data_publicacao: Date = new Date();

  private _data_encerramento: Date = new Date();

  private _funcionario: Funcionario = new Funcionario();

  private _canal: Canal = new Canal();

  private _turmas: Turma[] = [];

  private _lembrete: LembreteInterface = {
    data_lembrete: '',
  };

  constructor(private data?: AvisoInterface) {
    if (data !== undefined) {
      if (data.aviso_id !== undefined) {
        this._aviso_id = data.aviso_id;
      }
      this._titulo = data.titulo;
      this._texto = data.texto;
      this._arquivo = data.arquivo;
      this._prioridade = data.prioridade;
      this._data_publicacao = new Date(data.data_publicacao);
      if (data.data_encerramento !== undefined) {
        this._data_encerramento = new Date(data.data_encerramento);
      }
      if (data.funcionario !== undefined) {
        this._funcionario = data.funcionario;
      } else {
        this._funcionario.funcionario_id = data.funcionario_id;
      }
      this._canal.canal_id = data.canal_id;

      if (data.turmas !== undefined) {
        this._turmas = data.turmas;
      }

      if (data.lembrete !== undefined) {
        this._lembrete = data.lembrete;
      }
    }
  }

  public get aviso_id(): string {
    return this._aviso_id;
  }

  public set aviso_id(value: string) {
    this._aviso_id = value;
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

  public get arquivo(): string {
    return this._arquivo;
  }

  public set arquivo(value: string) {
    this._arquivo = value;
  }

  public get prioridade(): string {
    return this._prioridade;
  }

  public set prioridade(value: string) {
    this._prioridade = value;
  }

  public get data_publicacao(): Date {
    return this._data_publicacao;
  }

  public set data_publicacao(value: Date) {
    this._data_publicacao = value;
  }

  public get data_encerramento(): Date {
    return this._data_encerramento;
  }

  public set data_encerramento(value: Date) {
    this._data_encerramento = value;
  }

  public get funcionario(): Funcionario {
    return this._funcionario;
  }

  public set funcionario(value: Funcionario) {
    this._funcionario = value;
  }

  public get canal(): Canal {
    return this._canal;
  }

  public set canal(value: Canal) {
    this._canal = value;
  }

  public get turmas(): Turma[] {
    return this._turmas;
  }

  public set turmas(value: Turma[]) {
    this._turmas = value;
  }

  public get lembrete(): LembreteInterface {
    return this._lembrete;
  }

  public set lembrete(value: LembreteInterface) {
    this._lembrete = value;
  }
}

export interface AvisoResponsavelInterface {
  aviso_responsavel_id?: string;
  aviso_id: string;
  responsavel_id: string;
  ind_visualizacao: boolean;
  responsavel_nome?: string;
}

export class AvisoResponsavel {
  private _aviso_responsavel_id: string = '';

  private _aviso: Aviso = new Aviso();

  private _responsavel: Responsavel = new Responsavel();

  private _ind_visualizacao: boolean = false;

  constructor(data?: AvisoResponsavelInterface) {
    if (data !== undefined) {
      if (data.aviso_responsavel_id !== undefined) {
        this._aviso_responsavel_id = data.aviso_responsavel_id;
      }
      this._aviso.aviso_id = data.aviso_id;
      this._responsavel.responsavel_id = data.responsavel_id;
      if (data.responsavel_nome !== undefined) {
        this._responsavel.usuario.nome = data.responsavel_nome;
      }
      this._ind_visualizacao = data.ind_visualizacao;
    }
  }

  public get aviso_responsavel_id(): string {
    return this._aviso_responsavel_id;
  }

  public set aviso_responsavel_id(value: string) {
    this._aviso_responsavel_id = value;
  }

  public get aviso(): Aviso {
    return this._aviso;
  }

  public set aviso(value: Aviso) {
    this._aviso = value;
  }

  public get responsavel(): Responsavel {
    return this._responsavel;
  }

  public set responsavel(value: Responsavel) {
    this._responsavel = value;
  }

  public get ind_visualizacao(): boolean {
    return this._ind_visualizacao;
  }

  public set ind_visualizacao(value: boolean) {
    this._ind_visualizacao = value;
  }
}
