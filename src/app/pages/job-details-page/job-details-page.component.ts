import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BackButtonComponent } from '@ui/buttons/components/back-button';
import { JobOfferDetails } from '@core/types';

@Component({
  selector: 'app-job-details-page',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './job-details-page.component.html',
  styleUrl: './job-details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsPageComponent {
  @Input({ required: true }) public details!: JobOfferDetails;
}
