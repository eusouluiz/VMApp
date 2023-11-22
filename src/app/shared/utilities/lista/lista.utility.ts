
export class ListaUtil {
    
    // retorna valore que possuem apenas na lista 1 e na lista 2 e valores que coincidem entre as listas
    static retornarDiferencaListas(lista1: string[], lista2: string[]): any{
        var apenas1: string[] = []
        var coincidentes: string[] = []
        var apenas2: string[] = []

        lista1.forEach((id) => {
            if (lista2.includes(id)) {
                coincidentes.push(id)
            } else {
                apenas1.push(id)
            }
        })

        lista2.forEach((id) => {
            if(!lista1.includes(id)){
                apenas2.push(id)
            }
        })

        return [apenas1, apenas2, coincidentes] as const
    }
}