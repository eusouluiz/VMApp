import { Router } from "@angular/router"
import { Location } from '@angular/common'
import { Directive, HostListener } from "@angular/core"

@Directive()
export class Rota {

    constructor(
        private rotaRouter: Router,
        private rotaBase: string,
        private rotaLocation?: Location,
    ) {
    }

    

    // evento emitido toda vez que retorna a pagina
    @HostListener('window:popstate', ['$event'])
    onPopState(event: any) {
        this.inicializarConteudo()
    }
    
    protected inicializarConteudo() {}

    protected retornarPagina() {
        if (this.rotaLocation !== undefined) {
            this.rotaLocation.back()
        }
    }

    protected navegarPara(rota: string) {
        rota = this.adequarRota(rota)
        const caminho = this.rotaBase + rota
        this.rotaRouter.navigate([caminho])
    }

    protected adequarRota(rota: string): string {
        if (rota.substring(0, 1) !== '/') {
            return '/' + rota
        }
        return rota
    }
}