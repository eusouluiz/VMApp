import { Router } from "@angular/router";
import { Rota } from "../rota/rota.utility";
import { Location } from "@angular/common";
import { UntypedFormGroup } from "@angular/forms";


export class PaginaGerenciamento extends Rota {

    constructor(
        private routerGerenciamento: Router,
        private rotaBaseGerenciamento: string,
        private locationGerenciamento: Location,
    ) {
        super(routerGerenciamento, rotaBaseGerenciamento, locationGerenciamento)
    }

    modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'
    form: UntypedFormGroup | undefined;



    // ---- controle modo pagina ----//

    protected definirModo() {
        // pega ultimo termo do endpoint
        const rota = this.routerGerenciamento.url.split('/').pop()

        if (rota === 'cadastro') {
            this.modo = 'cadastrar'
        }
    }

    isModoDetalhes() {
        return this.modo === 'detalhes'
    }

    isModoEditar() {
        return this.modo === 'editar'
    }

    isModoCadastrar() {
        return this.modo === 'cadastrar'
    }

    eventoActions(ev: any) {
        if (ev.detail.data === undefined) {
            return
        }
        const action = ev.detail.data.action

        if (action === 'delete') {
            this.deletar()
        }
    }

    // ---- define modo pagina ----//

    protected deletar() {
        throw Error('metodo deletar nao implementado')
    }

    //editar
    iniciarEdicao() {
      this.modo = 'editar'
      this.form?.enable()
  
      this.inicializarComponentesEdicao()
    }

    protected inicializarComponentesEdicao() {
        throw new Error("metodo inicializarComponentesEdicao nao implementado");
    }
}