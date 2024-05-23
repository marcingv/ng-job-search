import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { FavouriteJobOffersService } from '@features/job-offers-data-access';
import { JobOffer } from '@core/types';
import { JobOffersListComponent } from '@features/job-offers-list';

@Component({
  selector: 'app-favourite-jobs-list-page',
  standalone: true,
  imports: [JobOffersListComponent],
  templateUrl: './favourite-jobs-list-page.component.html',
  styleUrl: './favourite-jobs-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteJobsListPageComponent {
  protected isLoading: Signal<boolean> = this.dataService.isLoading;
  protected loadingFailed: Signal<boolean> = this.dataService.loadingFailed;
  protected jobOffers: Signal<JobOffer[]> = this.dataService.favourites;

  public constructor(private dataService: FavouriteJobOffersService) {}
}
