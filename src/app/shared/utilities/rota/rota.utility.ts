import { Router } from "@angular/router"
import { Location } from '@angular/common'

export class Rota {

    constructor(
        private rotaRouter: Router,
        private rotaBase: string,
        private rotaLocation?: Location,
    ) {

    }

    protected retornarPagina() {
        if (this.rotaLocation !== undefined) {
            this.rotaLocation.back()
        }
    }

    protected navegarPara(rota: string) {
        this.adequarRota(rota)
        const caminho = this.rotaBase + rota
        this.rotaRouter.navigate([caminho])
    }

    protected adequarRota(rota: String) {
        if (rota.substring(0, 1) !== '/') {
            rota = '/' + rota
        }
    }
}