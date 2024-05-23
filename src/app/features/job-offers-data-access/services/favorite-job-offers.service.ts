import { computed, effect, Injectable, signal, Signal } from '@angular/core';
import { LocalStorageService } from '@core/storage';
import { JobOffer, JobOfferId } from '@core/types';
import { JobOffersService } from '@features/job-offers-data-access';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FavoriteJobOffersService {
  private readonly STORAGE_KEY = 'favorite-job-offers-ids';

  public isLoading: Signal<boolean> = this.jobOffersService.isLoading;
  public loadingFailed: Signal<boolean> = this.jobOffersService.loadingFailed;
  public favorites: Signal<JobOffer[]> = computed(() => {
    const favIds: JobOfferId[] = this.favoritesIds();

    return this.jobOffersService
      .jobOffers()
      .filter((oneOffer: JobOffer) => favIds.includes(oneOffer.id));
  });

  private favoritesIds = signal<JobOfferId[]>(
    this.storage.getItem<JobOfferId[]>(this.STORAGE_KEY) ?? [],
  );

  public constructor(
    private storage: LocalStorageService,
    private jobOffersService: JobOffersService,
  ) {
    this.enableStorageSynchronization();
  }

  public isFavorite(id: JobOfferId): Signal<boolean> {
    return computed(() => this.favoritesIds().includes(id));
  }

  public toggle(id: JobOfferId): void {
    const idx: JobOfferId = this.favoritesIds().indexOf(id);

    this.favoritesIds.update((currIds: JobOfferId[]) => {
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
      const favIds: JobOfferId[] = this.favoritesIds();

      this.storage.setItem(this.STORAGE_KEY, favIds);
    });

    this.storage
      .remoteChangeNotification<JobOfferId[]>(this.STORAGE_KEY)
      .pipe(
        tap((remoteFavIds: JobOfferId[] | null) => {
          if (remoteFavIds) {
            this.favoritesIds.set(remoteFavIds);
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
