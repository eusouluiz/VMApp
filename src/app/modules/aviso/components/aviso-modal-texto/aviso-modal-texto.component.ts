import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-aviso-modal-texto',
  templateUrl: './aviso-modal-texto.component.html',
  styleUrls: ['./aviso-modal-texto.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AvisoModalTextoComponent implements ControlValueAccessor, OnInit {
  @Input('isEditar') isEditar: boolean = false;

  // ---- controle formulario ---- //

  value: String | null = null;

  isDisabled = false;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {}

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
