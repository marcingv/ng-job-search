import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BackButtonComponent } from '@ui/buttons/components/back-button';

@Component({
  selector: 'app-job-details-page',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './job-details-page.component.html',
  styleUrl: './job-details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsPageComponent {}
