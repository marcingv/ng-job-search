import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-star-icon',
  standalone: true,
  imports: [],
  templateUrl: './star-icon.component.html',
  styleUrl: './star-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarIconComponent {
  @HostBinding('class') class: string = 'icon-star';
}
