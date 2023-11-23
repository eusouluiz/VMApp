
export class DataUtil {
    static adequarDataServico(data: string): string {
        return data.replace(' ', ', ')
    }

    static converterDataServico(data_envio: string): string {
        return (new Date(data_envio)).toLocaleString().replace(',', '')
    }
}