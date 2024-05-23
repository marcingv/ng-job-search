import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { FavoriteJobOffersService } from '@features/job-offers-data-access';
import { JobOffer } from '@core/types';
import { JobOffersListComponent } from '@features/job-offers-list';

@Component({
  selector: 'app-favorite-jobs-list-page',
  standalone: true,
  imports: [JobOffersListComponent],
  templateUrl: './favorite-jobs-list-page.component.html',
  styleUrl: './favorite-jobs-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteJobsListPageComponent {
  protected isLoading: Signal<boolean> = this.dataService.isLoading;
  protected loadingFailed: Signal<boolean> = this.dataService.loadingFailed;
  protected jobOffers: Signal<JobOffer[]> = this.dataService.favorites;

  public constructor(private dataService: FavoriteJobOffersService) {}
}
