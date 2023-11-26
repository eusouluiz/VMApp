import { Aviso } from '../../state/aviso/aviso-service/aviso.entity';

export interface LembreteInterface {
  lembrete_id?: string;
  titulo?: string;
  texto?: string;
  data_lembrete: string;
}

export class Lembrete {
  private _lembrete_id: string = '';

  private _titulo: string = '';

  private _texto: string = '';

  private _data_lembrete: Date = new Date();

  constructor(private data?: LembreteInterface) {
    if (data !== undefined) {
      if (data.lembrete_id !== undefined) {
        this._lembrete_id = data.lembrete_id;
      }

      if (data.titulo !== undefined) {
        this._titulo = data.titulo;
      }

      if (data.texto !== undefined) {
        this._texto = data.texto;
      }

      this._data_lembrete = new Date(data.data_lembrete);
    }
  }

  public get id(): string {
    return this._lembrete_id;
  }

  public set id(value: string) {
    this._lembrete_id = value;
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

  public get data_lembrete(): Date {
    return this._data_lembrete;
  }

  public set data_lembrete(value: Date) {
    this._data_lembrete = value;
  }
}
