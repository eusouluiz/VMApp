import { Router } from "@angular/router"
import { Location } from '@angular/common'
import { Directive, HostListener } from "@angular/core"

@Directive()
export class Pagina {

    constructor(
        private routerPagina: Router,
        private basePagina: string,
        private locationPagina?: Location,
    ) {
    }

    

    // evento emitido toda vez que retorna a pagina
    @HostListener('window:popstate', ['$event'])
    onPopState(event: any) {
        this.inicializarConteudo()
    }
    
    protected inicializarConteudo() {}

    protected retornarPagina() {
        if (this.locationPagina !== undefined) {
            this.locationPagina.back()
        }
    }

    protected navegarPara(rota: string) {
        rota = this.adequarPagina(rota)
        const caminho = this.basePagina + rota
        this.routerPagina.navigate([caminho])
    }

    protected adequarPagina(rota: string): string {
        if (rota.substring(0, 1) !== '/') {
            return '/' + rota
        }
        return rota
    }
}