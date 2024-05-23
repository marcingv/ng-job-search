import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JobOffer } from '@core/types';
import { JobOfferListItemComponent } from './job-offer-list-item/job-offer-list-item.component';
import { EmptyCollectionPlaceholderComponent } from 'src/app/ui/placeholders/empty-collection-placeholder';
import { ErrorPlaceholderComponent } from '@ui/placeholders/error-placeholder';

@Component({
  selector: 'app-job-offers-list',
  standalone: true,
  imports: [
    JobOfferListItemComponent,
    EmptyCollectionPlaceholderComponent,
    ErrorPlaceholderComponent,
  ],
  templateUrl: './job-offers-list.component.html',
  styleUrl: './job-offers-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOffersListComponent {
  @Input({ required: true }) public data: JobOffer[] = [];
  @Input() public showActions: boolean = true;
  @Input() public emptyMessage?: string;
  @Input() public loadingFailed: boolean = false;
  @Input() public loadFailedMessage?: string =
    'Server error occurred. Try again later.';
}
