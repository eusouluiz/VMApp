import { Router } from "@angular/router"
import { Location, PlatformLocation } from '@angular/common'

export class Rota {

    constructor(
        private rotaRouter: Router,
        private rotaBase: string,
        private rotaLocation?: PlatformLocation,
    ) {
    }

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