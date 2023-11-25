
export class DataUtil {
    static adequarDataServico(data: string): string {
        return data.replace(' ', ', ')
    }

    static converterDataServico(data: string): string {
        return (new Date(data)).toLocaleString().replace(',', '')
    }

    static diferencaDias(data1: Date, data2: Date): number {
        if (data2 < data1) {            
            return data1.getDate() - data2.getDate()
        } else {
            return 0
        }
    }
}