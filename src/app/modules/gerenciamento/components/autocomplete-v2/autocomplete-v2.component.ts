import { Component, EventEmitter, Input, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autocomplete-v2',
  templateUrl: './autocomplete-v2.component.html',
  styleUrls: ['./autocomplete-v2.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AutocompleteV2Component implements ControlValueAccessor, OnInit {

  @Input('listaItens') listaItens!: String[]
  @Input('textoSemResultado') textoSemResultado!: String
  @Input('icone') icone: String | null = null
  @Input('idBusca') idBusca!: String
  @Input('label') label!: String
  
  @Output() onBusca = new EventEmitter<Number>()
  @Output() onCliqueIcone = new EventEmitter<boolean>()

  isItensVisiveis = false;
  itens!: String[];
  
  busca!: string
  primeiroItem!: string

  @Input() placeholder: string | null = null;

  @Input() icon: string | null = null;

  value: String | null = null
  isDisabled = false;
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    console.log(this.ngControl)
  }

  ngOnInit() {
    const { control } = this.ngControl;

    let validators = this.getValidators();
    validators = control?.validator ? [control.validator, ...validators] : this.getValidators();

    control?.setValidators(validators);
    control?.updateValueAndValidity();
    
    console.log(this.listaItens)
    this.inicializaItens()
  }

  // ---- controle formulario ---- //

  updateChanges() {
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    console.log(value)
    this.value = value;
    this.updateChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  // ---- controle formulario ---- //

  inicializaItens(){
    this.itens = this.listaItens;
  }

  getItens(ev: any) {

      // reseta busca
      this.inicializaItens();

      // seta o valor a o que esta vindo da busca
      var val = '';
      if (typeof ev !== 'undefined'){
        val = typeof ev !== typeof 'string' ? ev.target.value : ev;
      }

      // se o valor for um valor valido
      if (val) {
        this.isItensVisiveis = true;
        this.itens = this.itens.filter((item) => {
            return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
  }

  mudarVisualizacaoItens(){
    this.isItensVisiveis = !this.isItensVisiveis
  }

  selecionarItem(item: any){
    // this.barraBusca.setFocus()
    console.log('selecionado: ' + item)
    
    const idBusca = item === -1 ? -1 : this.listaItens.indexOf(item) 
    this.value = item === -1 ? undefined : item
    
    this.updateChanges();
    this.indicaBuscaRealizada(idBusca)

    this.inicializaItens()
    this.busca = ''
  }

  selecionarPrimeiro(input: any) {
    this.getItens(input)
    this.value = this.itens[0];
    this.updateChanges();
    this.indicaBuscaRealizada(this.listaItens.indexOf(this.value))
  }

  indicaBuscaRealizada(id: Number){
    this.onBusca.emit(id)
    this.inicializaItens()
  }

  indicaBotaoClicado(){
    this.onCliqueIcone.emit()
  }

  getValidators(): ValidatorFn[] {
    return []
  }

}
