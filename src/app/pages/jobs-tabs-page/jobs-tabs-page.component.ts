import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Paths } from '@core/router/paths';

@Component({
  selector: 'app-jobs-tabs-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './jobs-tabs-page.component.html',
  styleUrl: './jobs-tabs-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsTabsPageComponent {
  protected tabs = signal<Array<{ name: string; routerLink: string[] }>>([
    {
      name: 'Jobs',
      routerLink: [Paths.ROOT, Paths.JOBS],
    },
    {
      name: 'Favourites',
      routerLink: [Paths.ROOT, Paths.FAVOURITES],
    },
  ]).asReadonly();
}
