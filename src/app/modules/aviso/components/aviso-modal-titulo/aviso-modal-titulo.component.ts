import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-aviso-modal-titulo',
  templateUrl: './aviso-modal-titulo.component.html',
  styleUrls: ['./aviso-modal-titulo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AvisoModalTituloComponent implements ControlValueAccessor, OnInit {

  @Input('isCadastrar') isCadastrar: boolean = false

  constructor(
    @Self() @Optional() public ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {}
  
  // ---- controle formulario ---- //
  
  value: String | null = null
  isDisabled = false;
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

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

}
