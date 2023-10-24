import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { Cargo, Canal, canalVazio } from '../../../../shared/utilities/entidade/entidade.utility';
import { CanalService } from '../../../../core/services/canal-service/canal.service';
import { CargoService } from '../../../../core/services/cargo-service/cargo.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';

@Component({
  selector: 'app-gerenciamento-canal-detalhes',
  templateUrl: './gerenciamento-canal-detalhes.page.html',
  styleUrls: ['./gerenciamento-canal-detalhes.page.scss'],
})
export class GerenciamentoCanalDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {

  canal: Canal = canalVazio()
  listaTodosCargos: Cargo[] | null = null

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private canalService: CanalService,
    private cargoService: CargoService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO
    super(router, ROTA_BASE, location)

    this.inicializarForms()
    this.inicializarConteudo()
  }

  ngOnInit() {
  }
  
  inicializarForms() {
    this.inicializarFormCanal()
    this.inicializarFormBuscaCargo()
  }

  inicializarFormCanal() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    })
  }

  protected inicializarConteudo(): void {
    this.listaTodosCargos = this.cargoService.buscarTodosCargos().slice()

    this.definirModo()

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.isModoDetalhes() && id !== null) {
      this.canal = this.resgatarCanal(Number.parseInt(id))

      this.form?.setValue({
        nome: this.canal.nome,
      })
    }
    this.inicializarTabelaCargos()

    if (this.isModoDetalhes()) {
      this.form?.disable()
    }
      
  }

  // ---- busca canal ----//
  private resgatarCanal(id: number): Canal {
    const canal = this.canalService.buscarCanal(id)
    if (canal !== undefined) {
      return canal
    }
    return canalVazio()
  }
  // ---- busca canal ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.canalService.deletarCanal(this.canal.idCanal)
    this.retornarPagina()
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaCargos()
  }

  //cancelar edicao
  cancelar() {

    if (this.isModoCadastrar()) {
      this.retornarPagina()
      return
    }

    this.modo = 'detalhes'

    this.form?.setValue({
      nome: this.canal.nome,
    })
    this.form?.disable()

    this.inicializarTabelaCargos()
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {
      this.canal.nome = this.form?.value.nome

      this.atualizarCargos()

      if (this.isModoCadastrar()) {
        this.canalService.incluirCanal(this.canal)
      } else {
        this.canalService.alterarCanal(this.canal)
      }

      this.modo = 'detalhes'
      this.form?.disable()
    } else {
      this.form?.markAllAsTouched()
    }
  }
  // ---- controle botoes ----//

  // ---- controle cargos ----//

  formBuscaCargo!: UntypedFormGroup

  inicializarFormBuscaCargo() {
    this.formBuscaCargo = this.formBuilder.group({
      busca: ''
    })
  }

  listaCargosBusca: Cargo[] = []
  nomeCargosBusca: string[] = []

  listaCargosTabela!: Cargo[]

  private inicializarTabelaCargos() {
    this.listaCargosTabela = this.canal.cargos.slice()
    if (!this.isModoDetalhes()) {
      this.inicializarBuscaCargos()
    }
  }

  private inicializarBuscaCargos() {

    this.listaCargosBusca = []
    if (this.listaTodosCargos !== null) {
      this.listaTodosCargos.forEach((c) => {
        const idCargo = c.idCargo
        var isCanalPossuiCargo = false
  
        for (let i = 0; i < this.listaCargosTabela.length; i++) {
          const canalCargo = this.listaCargosTabela[i];
          if (canalCargo.idCargo === idCargo) {
            isCanalPossuiCargo = true
            break
          }
        }
  
        if (!isCanalPossuiCargo) {
          this.listaCargosBusca.push(c)
        }
      })
    }

    this.nomeCargosBusca = this.resgatarNomeCargosBusca(this.listaCargosBusca)
    this.limparCampoBusca()
  }

  private resgatarNomeCargosBusca(lista: Cargo[]): string[] {
    var nomes: string[] = []
    lista.forEach(cargo => {
      nomes.push(cargo.nome)
    });
    return nomes
  }

  adicionarCargo(valor: number) {

    if (valor === -1) {
      this.navegarTelaCargo(valor)
      return
    }

    const cargo = this.listaCargosBusca[valor]

    this.listaCargosTabela.push(cargo)

    this.removerCargoDaListaBusca(valor)
    this.limparCampoBusca()
  }

  limparCampoBusca() {
    this.formBuscaCargo.setValue({
      busca: ''
    })
  }

  private removerCargoDaListaBusca(index: number) {
    for (let i = 0; i < this.listaCargosBusca.length; i++) {
      if (index === i) {
        this.listaCargosBusca.splice(index, 1)
        this.nomeCargosBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarCargos() {
    this.canal.cargos = this.listaCargosTabela.sort((c1, c2) => {
      if (c1.nome.toLowerCase() > c2.nome.toLowerCase()) {
        return 1
      } else if (c2.nome.toLowerCase() > c1.nome.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
  }

  navegarTelaCargo(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_CARGO
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO
    }
    this.navegarPara(rota)
  }

  deletarCargo(id: number) {
    const indexCargo = this.listaCargosTabela.findIndex((c) => {
      return c.idCargo === id
    })
    if (indexCargo !== -1) {
      const cargo = this.listaCargosTabela[indexCargo]
      this.listaCargosTabela.splice(indexCargo, 1)


      this.listaCargosBusca.push(cargo)
      this.nomeCargosBusca.push(cargo.nome)
    }
  }

  // ---- controle cargos ----//

}
