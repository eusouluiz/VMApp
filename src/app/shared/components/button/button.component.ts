import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'icon'
    | 'icon-round'
    | 'icon-round-primary'
    | 'danger'
    | 'success' = 'primary';

  @Input() size: 'lg' | 'md' | 'sm' = 'sm';

  @Input() padding: 'default' | 'sm' | 'none' = 'default';

  @Input() width: 'full' | 'fit-content' = 'full';

  @Input() icon: string | null = null;

  @Input() iconSize: 'md' | 'sm' = 'sm';

  @Input() iconSlot: 'start' | 'end' = 'start';

  @Input() disabled: boolean = false;

  @Input() loading: boolean = false;
}
