import { AvisoService } from '../../../../core/state/aviso/aviso-service/aviso.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AvisoModalTituloComponent } from '../aviso-modal-titulo/aviso-modal-titulo.component';
import { AvisoModalTextoComponent } from '../aviso-modal-texto/aviso-modal-texto.component';
import { Router } from '@angular/router';
import { Aviso, AvisoResponsavel } from '../../../../core/state/aviso/aviso-service/aviso.entity';
import { Responsavel } from '../../../../core/state/gerenciamento/responsavel/responsavel.entity';
import { AvisoIndicadorVisualizacaoComponent } from '../aviso-indicador-visualizacao/aviso-indicador-visualizacao.component';
import { UsuarioLogado } from '../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { AVISO_RESPONSAVEL_DATA } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-aviso-modal',
  templateUrl: './aviso-modal.component.html',
  styleUrls: ['./aviso-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AvisoModalTituloComponent,
    AvisoModalTextoComponent,
    AvisoIndicadorVisualizacaoComponent,
  ]
})
export class AvisoModalComponent implements OnInit {

  @Input('modo') modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'
  @Input('aviso') aviso: Aviso = new Aviso()
  @Input('hasAcessoGerenciamentoAviso') hasAcessoGerenciamentoAviso: boolean = false

  form: UntypedFormGroup

  isModoVisualizacao: boolean = false
  isResponsavel: boolean = this.usuarioLogado.isResponsavel()

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private modalController: ModalController,
    private avisoService: AvisoService,
    private usuarioLogado: UsuarioLogado,
  ) {
    this.form = formBuilder.group({
      titulo: ['', Validators.required],
      texto: ['', Validators.required],
    })
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.inicializarConteudo()
    this.indicarVisualizacaoAviso()
  }

  inicializarConteudo() {
    console.log(this.aviso)
    if (this.isModoDetalhes()) {
      this.form.setValue({
        titulo: this.aviso.titulo,
        texto: this.aviso.texto,
      })
      this.form.controls.titulo.disable()
      this.form.controls.texto.disable()
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

  iniciarEdicao() {
    this.modo = 'editar'
    this.form.controls.titulo.enable()
    this.form.controls.texto.enable()
  }

  deletar() {
    return this.modalController.dismiss(undefined, 'deletarAviso')
  }

  salvarAviso() {
    if (this.form.valid) {
      const formAviso = {
        titulo: this.form.controls.titulo.value,
        texto: this.form.controls.texto.value,
      }

      this.modo = 'detalhes'
      return this.modalController.dismiss(formAviso, 'salvarAviso')
    } else {
      this.form?.markAllAsTouched()
    }
  }

  cancelar() {
    this.form.setValue({
      titulo: this.aviso.titulo,
      texto: this.aviso.texto,
    })

    if (this.isModoCadastrar()) {
      return this.modalController.dismiss()
    }

    this.modo = 'detalhes'
    this.form.controls.titulo.disable()
    this.form.controls.texto.disable()
  }

  navegarCanal() {
    return this.modalController.dismiss(undefined, 'duvidaAviso')
  }

  // ---- indicador visualizacao ---- //

  listaAvisoResponsavel: AvisoResponsavel[] = []

  alterarModoVisualizacao() {
    this.isModoVisualizacao = !this.isModoVisualizacao
    if (this.isModoVisualizacao) {
      this.buscarAvisoResponsavel()
    }
  }

  buscarAvisoResponsavel() {
    const lista = this.avisoService.buscarAvisoResponsavel({ idAviso: this.aviso.aviso_id })?.slice()
    if (lista !== undefined) {
      this.listaAvisoResponsavel = lista
    }

    console.log(this.listaAvisoResponsavel)
  }

  indicarVisualizacaoAviso() {
    var avisoResponsavel = this.avisoService.buscarAvisoResponsavel({
      idAviso: this.aviso.aviso_id,
      idResponsavel: this.usuarioLogado.getIdResponsavel()
    })?.slice()

    if (avisoResponsavel !== undefined && avisoResponsavel.length > 0) {
      if (!avisoResponsavel[0].ind_visualizacao) {
        avisoResponsavel[0].ind_visualizacao = true
        this.avisoService.alterarAvisoResponsavel(avisoResponsavel[0])
      }
    }
  }
}
