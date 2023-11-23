
export class DataUtil {
    static adequarDataServico(data:string): string{
        return data.replace(' ', ', ')
    }
}