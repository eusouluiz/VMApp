import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuArea } from './page-menu.interface';

@Component({
  selector: 'app-page-menu',
  templateUrl: './page-menu.component.html',
  styleUrls: ['./page-menu.component.scss'],
})
export class PageMenuComponent {
  @Input() visible = false;

  @Input() activeArea!: MenuArea;

  @Input() userIsFuncionario: boolean = false;

  @Output() onChange = new EventEmitter<MenuArea>();

  handleAreaSelected(targetArea: MenuArea) {
    this.onChange.emit(targetArea);
  }
}
