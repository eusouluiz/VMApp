
export class DataUtil {
    static adequarDataServico(data: string): string {
        return data.replace(' ', ', ')
    }

    static converterDataServico(data: string): string {
        return (new Date(data)).toLocaleString().replace(',', '')
    }
}