import { Router } from "@angular/router";
import { Pagina } from "../pagina/pagina.utility";
import { Location } from "@angular/common";
import { UntypedFormGroup } from "@angular/forms";


export class PaginaGerenciamentoDetalhes extends Pagina {

    constructor(
        private routerGerenciamentoDetalhes: Router,
        private rotaBaseGerenciamentoDetalhes: string,
        private locationGerenciamentoDetalhes: Location,
    ) {
        super(routerGerenciamentoDetalhes, rotaBaseGerenciamentoDetalhes, locationGerenciamentoDetalhes)
    }

    modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'
    form: UntypedFormGroup | undefined;



    // ---- controle modo pagina ----//

    protected definirModo() {
        // pega ultimo termo do endpoint
        const rota = this.routerGerenciamentoDetalhes.url.split('/').pop()

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

    deletarAction() {
        this.deletar()
    }

    retornarModoDetalhes(){
        this.modo = 'detalhes';
        this.form?.disable();
    }

    // ---- define modo pagina ----//

    protected deletar() {
        throw Error('metodo deletar nao implementado')
    }

    //editar
    iniciarEdicao() {
        this.modo = 'editar'
        this.habilitarForms()

        this.inicializarComponentesEdicao()
    }

    protected inicializarComponentesEdicao() {
        throw new Error("metodo inicializarComponentesEdicao nao implementado");
    }

    protected habilitarForms(){
        this.form?.enable()
    }
}