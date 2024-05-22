import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JobOffer } from '@core/types';

@Component({
  selector: 'app-job-offer-list-item',
  standalone: true,
  imports: [],
  templateUrl: './job-offer-list-item.component.html',
  styleUrl: './job-offer-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOfferListItemComponent {
  @Input({ required: true }) public offer!: JobOffer;
}
