import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JobOffer } from '@core/types';
import { JobOfferListItemComponent } from './job-offer-list-item/job-offer-list-item.component';

@Component({
  selector: 'app-job-offers-list',
  standalone: true,
  imports: [JobOfferListItemComponent],
  templateUrl: './job-offers-list.component.html',
  styleUrl: './job-offers-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOffersListComponent {
  @Input({ required: true }) public data: JobOffer[] = [];
}
