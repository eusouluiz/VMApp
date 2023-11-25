import { Component, EventEmitter, Input, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit {
  @ViewChild('popover') popover!: any;

  @Input('listaItens') listaItens!: String[];
  @Input('textoSemResultado') textoSemResultado?: String;
  @Input('icone') icone: String | null = null;
  @Input('idBusca') idBusca!: String;
  @Input('label') label!: String;

  @Output() onBusca = new EventEmitter<Number>();
  @Output() onCliqueIcone = new EventEmitter<boolean>();
  @Output() onSelecionado = new EventEmitter<boolean>();
  @Output() onDesselecionado = new EventEmitter<boolean>();
  
  @Input() showValidationErrorMessage = true;

  isItensVisiveis = false;
  itens!: String[];

  busca!: string;
  primeiroItem!: string;

  @Input() placeholder: string | null = null;

  @Input() icon: string | null = null;

  value: String | null = null;
  isDisabled = false;
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    const { control } = this.ngControl;

    let validators = this.getValidators();
    validators = control?.validator ? [control.validator, ...validators] : this.getValidators();

    control?.setValidators(validators);
    control?.updateValueAndValidity();

    this.inicializaItens();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  // ---- controle formulario ---- //

  updateChanges() {
    this.onChange(this.value);
  }

  writeValue(value: string): void {
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

  inicializaItens() {
    this.itens = this.listaItens;
  }

  getItens(ev: any) {
    // reseta busca
    this.inicializaItens();

    // seta o valor a o que esta vindo da busca
    var val = '';
    if (typeof ev !== 'undefined') {
      val = typeof ev !== typeof 'string' ? ev.target.value : ev;
    }

    // se o valor for um valor valido
    if (val) {
      this.isItensVisiveis = true;
      this.itens = this.itens.filter((item) => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  mostrarItens() {
    this.popover.cssClass = undefined;
    this.popover.keyboardClose = false;
    this.isItensVisiveis = true;
  }

  async esconderItens() {
    //sleep de 250 milisegundo pra caso blur tenha sido de selecao de item
    //pra dar tempo de executar funcao selecionarItem antes de esconder popover
    await new Promise((f) => setTimeout(f, 500));

    this.isItensVisiveis = false;
    await this.popover.dismiss();

    // gambiarra para esconder popover
    this.popover.cssClass = 'ion-hide';
    this.popover.keyboardClose = true;
    await this.popover.present();
    await this.popover.dismiss();
  }

  async selecionarItem(item: any) {
    const idBusca = item === -1 ? -1 : this.listaItens.indexOf(item);
    this.value = item === -1 ? undefined : item;

    this.updateChanges();
    await this.indicaBuscaRealizada(idBusca);

    this.inicializaItens();
    this.busca = '';
  }

  selecionarPrimeiro(input: any) {
    this.getItens(input);
    this.value = this.itens[0];
    this.updateChanges();
    this.indicaBuscaRealizada(this.listaItens.indexOf(this.value));

    this.esconderItens();
  }

  async indicaBuscaRealizada(id: Number) {
    this.onBusca.emit(id);
    this.inicializaItens();
  }

  indicaBotaoClicado() {
    this.onCliqueIcone.emit();
  }

  indicaBuscaSelecionada() {
    // console.log('selecionado')
    this.onSelecionado.emit();
  }

  indicaBuscaDesselecionada() {
    // console.log('desselecionado')
    this.onDesselecionado.emit();
  }

  getValidators(): ValidatorFn[] {
    return [];
  }
}
