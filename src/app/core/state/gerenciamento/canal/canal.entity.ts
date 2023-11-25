import { CanalMensagem } from '../../mensagem/mensagem.repository';
import { Cargo } from '../cargo/cargo.entity';
import { Responsavel, ResponsavelInterface } from '../responsavel/responsavel.entity';

export interface CanalInterface {
  canal_id?: string;
  nome: string;
  descricao: string;
  cargos?: Cargo[]
}

export class Canal {
  private _canal_id: string = '';

  private _nome: string = '';

  private _descricao: string = '';

  private _cargos: Cargo[] = [];

  constructor(private data?: CanalInterface) {
    if (data !== undefined) {
      if (data.canal_id !== undefined) {
        this._canal_id = data.canal_id;
      }
      this._nome = data.nome;
      this._descricao = data.descricao;

      if (data.cargos !== undefined) {
        this._cargos = data.cargos;
      }
    }
  }

  public get canal_id(): string {
    return this._canal_id;
  }

  public set canal_id(value: string) {
    this._canal_id = value;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public get descricao(): string {
    return this._descricao;
  }

  public set descricao(value: string) {
    this._descricao = value;
  }

  public get cargos(): Cargo[] {
    return this._cargos;
  }

  public set cargos(value: Cargo[]) {
    this._cargos = value;
  }
}

export interface CanalResponsavelInterface {
  canal_responsavel_id?: string;
  canal?: Canal,
  responsavel?: ResponsavelInterface,
  canal_id?: string;
  responsavel_id?: string;
}

export class CanalResponsavel {
  private _canal_responsavel_id: string = '';

  private _canal: Canal = new Canal();

  private _responsavel: Responsavel = new Responsavel();

  constructor(private data?: CanalResponsavelInterface) {
    if (data !== undefined) {
      if (data.canal_responsavel_id !== undefined) {
        this._canal_responsavel_id = data.canal_responsavel_id;
      }

      if (data.canal !== undefined){
        this._canal = data.canal
      } else if (data.canal_id !== undefined) {
        this._canal.canal_id = data.canal_id;
      }
      if (data.responsavel !== undefined){
        this._responsavel = new Responsavel(data.responsavel)
      } else if (data.responsavel_id !== undefined) {
        this._responsavel.responsavel_id = data.responsavel_id;
      }

    }
  }

  public get canal_responsavel_id(): string {
    return this._canal_responsavel_id;
  }

  public set canal_responsavel_id(value: string) {
    this._canal_responsavel_id = value;
  }

  public get canal(): Canal {
    return this._canal;
  }

  public set canal(value: Canal) {
    this._canal = value;
  }

  public get responsavel(): Responsavel {
    return this._responsavel;
  }

  public set responsavel(value: Responsavel) {
    this._responsavel = value;
  }

  static converterCanalMensagem(canalMensagem: CanalMensagem): CanalResponsavel{
    if ((canalMensagem.canal_id !== undefined && canalMensagem.responsavel_id !== undefined) ||
        ((canalMensagem.canal !== undefined && canalMensagem.responsavel !== undefined))) {
      var canal: CanalResponsavelInterface = {
        canal_id: canalMensagem.canal_id,
        responsavel_id: canalMensagem.responsavel_id,
        canal: canalMensagem.canal,
        responsavel: canalMensagem.responsavel,
      }
      if (canalMensagem.canal_id !== undefined) {
        canal.canal_responsavel_id = canalMensagem.canal_responsavel_id
      }
      return new CanalResponsavel(canal)
    }
    throw new Error('canalMensagem invalido')
  }
}
