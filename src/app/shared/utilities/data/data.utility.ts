export class DataUtil {
  static adequarDataServico(data: string): string {
    return data.replace(' ', ', ');
  }

  static converterDataServico(data: string): string {
    return new Date(data).toLocaleString().replace(',', '');
  }

  static timezonedToUTC(data: string): string {
    let dataLembrete = new Date(data);
    const newDate =
      dataLembrete.getFullYear() +
      '-' +
      (dataLembrete.getMonth() + 1) +
      '-' +
      dataLembrete.getDate() +
      ' ' +
      (dataLembrete.getHours() + 3) +
      ':' +
      dataLembrete.getMinutes() +
      ':' +
      dataLembrete.getSeconds();

    return newDate;
  }

  static adequarDataLembrete(data: string): string {
    let dataLembrete = new Date(data);
    const newDate =
      dataLembrete.getFullYear() +
      '-' +
      (dataLembrete.getMonth() + 1) +
      '-' +
      dataLembrete.getDate() +
      ' ' +
      dataLembrete.getHours() +
      ':' +
      dataLembrete.getMinutes() +
      ':' +
      dataLembrete.getSeconds();

    return newDate;
  }

  static diferencaDias(data1: Date, data2: Date): number {
    if (data2 < data1) {
      return data1.getDate() - data2.getDate();
    } else {
      return 0;
    }
  }
}
