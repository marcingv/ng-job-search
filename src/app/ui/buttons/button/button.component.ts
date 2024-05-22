import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonType } from '@ui/buttons/types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  protected readonly THEMES: Record<ButtonType, string> = {
    primary: 'bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-700',
    transparent: 'hover:bg-gray-100 active:bg-gray-200',
  };

  @Input() public type: ButtonType = 'primary';
  @Input() public cssClass?: string;
  @Input() public title?: string;
  @Input() public disabled: boolean = false;
  @Output() public clicked = new EventEmitter<MouseEvent>();

  protected onClick($event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    this.clicked.next($event);
  }
}
