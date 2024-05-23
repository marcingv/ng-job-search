import { Injectable, Signal, signal } from '@angular/core';
import { JobOffersApiService } from '@core/api';
import { JobOffer } from '@core/types';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobOffersService {
  private isInitialLoadDoneSignal = signal<boolean>(false);
  private isLoadingSignal = signal<boolean>(false);
  private loadingFailedSignal = signal<boolean>(false);
  private jobOffersSignal = signal<JobOffer[]>([]);

  public constructor(private api: JobOffersApiService) {
    this.loadData();
  }

  public loadData(): void {
    this.isLoadingSignal.set(true);
    this.loadingFailedSignal.set(false);

    this.api
      .list()
      .pipe(
        finalize(() => {
          this.isLoadingSignal.set(false);
          if (!this.isInitialLoadDoneSignal()) {
            this.isInitialLoadDoneSignal.set(true);
          }
        }),
      )
      .subscribe({
        next: (data: JobOffer[]) => this.jobOffersSignal.set(data),
        error: () => {
          this.jobOffersSignal.set([]);
          this.loadingFailedSignal.set(true);
        },
      });
  }

  public get isLoading(): Signal<boolean> {
    return this.isLoadingSignal.asReadonly();
  }

  public get isInitialLoadDone(): Signal<boolean> {
    return this.isInitialLoadDoneSignal.asReadonly();
  }

  public get loadingFailed(): Signal<boolean> {
    return this.loadingFailedSignal.asReadonly();
  }

  public get jobOffers(): Signal<JobOffer[]> {
    return this.jobOffersSignal.asReadonly();
  }
}
