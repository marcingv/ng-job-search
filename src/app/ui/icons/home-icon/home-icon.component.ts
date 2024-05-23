import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  standalone: true,
  imports: [],
  templateUrl: './home-icon.component.html',
  styleUrl: './home-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeIconComponent {
  @HostBinding('class') class: string = 'icon-home';
}
