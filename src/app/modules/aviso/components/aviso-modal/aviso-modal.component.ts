import { AvisoService } from '../../../../core/state/aviso/aviso/aviso.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AvisoModalTituloComponent } from '../aviso-modal-titulo/aviso-modal-titulo.component';
import { AvisoModalTextoComponent } from '../aviso-modal-texto/aviso-modal-texto.component';
import { Router } from '@angular/router';
import { Aviso, AvisoResponsavel, AvisoResponsavelInterface } from '../../../../core/state/aviso/aviso/aviso.entity';
import { AvisoIndicadorVisualizacaoComponent } from '../aviso-indicador-visualizacao/aviso-indicador-visualizacao.component';
import { UsuarioLogado } from '../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { AvisoRepository } from '../../../../core/state/aviso/aviso.repository';

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
    private avisoRepository: AvisoRepository,
  ) {
    this.form = formBuilder.group({
      titulo: ['', Validators.required],
      texto: ['', Validators.required],
    })
    this.buscarAvisoResponsavel()
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.inicializarConteudo()
    this.preencherVisualizacaoAviso()
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
    if (!this.isResponsavel) {
      this.isModoVisualizacao = !this.isModoVisualizacao
      if (this.isModoVisualizacao) {
        this.buscarAvisoResponsavel()
      }
    }
  }

  buscarAvisoResponsavel() {
    this.avisoService.buscarTodosAvisosResponsavel().subscribe({
      next: () => {
        const listaVinculo = this.avisoRepository.vinculosAvisoResponsavel().filter((vinculo) => {
          return this.aviso.aviso_id === vinculo.aviso_id
        })
        this.listaAvisoResponsavel.splice(0, this.listaAvisoResponsavel.length)
        listaVinculo.forEach((vinculo) => {
          this.listaAvisoResponsavel.push(new AvisoResponsavel(vinculo))
        })
      }
    })
  }

  preencherVisualizacaoAviso() {
    if (this.isResponsavel) {
      const idResponsavel = this.usuarioLogado.getIdResponsavel()
      if (idResponsavel !== undefined) {
        var vinculo: AvisoResponsavelInterface = {
          aviso_id: this.aviso.aviso_id,
          responsavel_id: idResponsavel,
          ind_visualizacao: true
        }

        this.avisoService.incluirAvisoResponsavel(vinculo).subscribe()
      }

    }
  }
}
