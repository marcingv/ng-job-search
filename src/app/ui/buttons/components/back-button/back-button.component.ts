import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { HomeIconComponent } from '@ui/icons/home-icon';
import { ButtonDirective } from '@ui/buttons/directives';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [HomeIconComponent, ButtonDirective, RouterLink],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  protected readonly DEFAULT_LABEL: string = 'Back';

  protected readonly activatedRoute = inject(ActivatedRoute);

  @Input() public label?: string;

  public routerLink: string[] = ['..'];
}
