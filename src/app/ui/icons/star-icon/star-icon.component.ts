import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-star-icon',
  standalone: true,
  imports: [],
  templateUrl: './star-icon.component.html',
  styleUrl: './star-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarIconComponent {
  @Input() public id?: string;
  @Input() public cssClass?: string;

  @HostBinding('class') class: string = 'leading-none';
}
