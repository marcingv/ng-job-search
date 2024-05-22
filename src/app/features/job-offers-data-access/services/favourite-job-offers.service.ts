import { computed, effect, Injectable, signal, Signal } from '@angular/core';
import { LocalStorageService } from '@core/storage';
import { JobOffer, JobOfferId } from '@core/types';
import { JobOffersService } from '@features/job-offers-data-access';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FavouriteJobOffersService {
  private readonly STORAGE_KEY = 'favourite-job-offers-ids';

  public isLoading: Signal<boolean> = this.jobOffersService.isLoading;
  public loadingFailed: Signal<boolean> = this.jobOffersService.loadingFailed;
  public favourites: Signal<JobOffer[]> = computed(() => {
    const favIds: JobOfferId[] = this.favouritesIds();

    return this.jobOffersService
      .jobOffers()
      .filter((oneOffer: JobOffer) => favIds.includes(oneOffer.id));
  });

  private favouritesIds = signal<JobOfferId[]>(
    this.storage.getItem<JobOfferId[]>(this.STORAGE_KEY) ?? [],
  );

  public constructor(
    private storage: LocalStorageService,
    private jobOffersService: JobOffersService,
  ) {
    this.enableStorageSynchronization();
  }

  public isFavourite(id: JobOfferId): Signal<boolean> {
    return computed(() => this.favouritesIds().includes(id));
  }

  public toggle(id: JobOfferId): void {
    const idx: JobOfferId = this.favouritesIds().indexOf(id);

    this.favouritesIds.update((currIds: JobOfferId[]) => {
      const newIds: JobOfferId[] = currIds.slice();

      if (idx >= 0) {
        // Remove
        newIds.splice(idx, 1);
      } else {
        // Add
        newIds.push(id);
      }

      return newIds;
    });
  }

  private enableStorageSynchronization(): void {
    effect(() => {
      const favIds: JobOfferId[] = this.favouritesIds();

      this.storage.setItem(this.STORAGE_KEY, favIds);
    });

    this.storage
      .remoteChangeNotification<JobOfferId[]>(this.STORAGE_KEY)
      .pipe(
        tap((remoteFavIds: JobOfferId[] | null) => {
          if (remoteFavIds) {
            this.favouritesIds.set(remoteFavIds);
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
