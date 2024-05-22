import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { JobOffersListService } from '@features/job-offers-data-access';
import { JobOffer } from '@core/types';

@Component({
  selector: 'app-jobs-list-page',
  standalone: true,
  imports: [],
  templateUrl: './jobs-list-page.component.html',
  styleUrl: './jobs-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsListPageComponent {
  protected isLoading: Signal<boolean> = this.dataService.isLoading;
  protected loadingFailed: Signal<boolean> = this.dataService.loadingFailed;
  protected jobOffers: Signal<JobOffer[]> = this.dataService.jobOffers;

  public constructor(private dataService: JobOffersListService) {}
}
