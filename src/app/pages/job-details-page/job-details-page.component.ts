import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BackButtonComponent } from '@ui/buttons/components/back-button';
import { DatePipe } from '@angular/common';
import { ChipsListComponent } from '@ui/chips/chips-list';
import { SanitizeHtmlPipe } from '@ui/pipes';
import { ResolvedJobOfferDetails } from 'src/app/features/data-access-job-offers';
import { JobOfferDetailsComponent } from '@features/job-offer-details/job-offer-details.component';
import { ErrorPlaceholderComponent } from '@ui/placeholders/error-placeholder';

@Component({
  selector: 'app-job-details-page',
  standalone: true,
  imports: [
    BackButtonComponent,
    DatePipe,
    ChipsListComponent,
    SanitizeHtmlPipe,
    JobOfferDetailsComponent,
    ErrorPlaceholderComponent,
  ],
  templateUrl: './job-details-page.component.html',
  styleUrl: './job-details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsPageComponent {
  @Input() public data?: ResolvedJobOfferDetails;
}
