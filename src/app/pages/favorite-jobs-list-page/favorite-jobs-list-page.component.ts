import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { FavoriteJobOffersService } from 'src/app/features/data-access-job-offers';
import { JobOffer } from '@core/types';
import { JobOffersListComponent } from 'src/app/features/job-offers-list';

@Component({
  selector: 'app-favorite-jobs-list-page',
  standalone: true,
  imports: [JobOffersListComponent],
  templateUrl: './favorite-jobs-list-page.component.html',
  styleUrl: './favorite-jobs-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteJobsListPageComponent {
  private readonly dataService = inject(FavoriteJobOffersService);

  protected isInitialLoadDone: Signal<boolean> =
    this.dataService.isInitialLoadDone;
  protected loadingFailed: Signal<boolean> = this.dataService.loadingFailed;
  protected jobOffers: Signal<JobOffer[]> = this.dataService.favorites;
}
