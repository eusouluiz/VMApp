import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule, ModalController } from '@ionic/angular';
import { Aviso, avisoVazio } from '../../../../shared/utilities/entidade/entidade.utility';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AvisoModalTituloComponent } from '../aviso-modal-titulo/aviso-modal-titulo.component';
import { AvisoModalTextoComponent } from '../aviso-modal-texto/aviso-modal-texto.component';

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
  ]
})
export class AvisoModalComponent implements OnInit {

  @Input('modo') modo: 'cadastrar' | 'editar' | 'detalhes' = 'detalhes'
  @Input('aviso') aviso: Aviso = avisoVazio()
  @Input('hasAcessoGerenciamentoAviso') hasAcessoGerenciamentoAviso: boolean = false

  form: UntypedFormGroup

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalController: ModalController
  ) {
    this.form = formBuilder.group({
      titulo: ['', Validators.required],
      texto: ['', Validators.required],
    })
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.inicializarConteudo()
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

  deletar(){
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

}
