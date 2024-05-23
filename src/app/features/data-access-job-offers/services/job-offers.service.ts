import { Injectable, Signal, signal } from '@angular/core';
import { JobOffersApiService } from '@core/api';
import { JobOffer } from '@core/types';

@Injectable({
  providedIn: 'root',
})
export class JobOffersService {
  private isLoadingSignal = signal<boolean>(false);
  private loadingFailedSignal = signal<boolean>(false);
  private jobOffersSignal = signal<JobOffer[]>([]);

  public constructor(private api: JobOffersApiService) {
    this.loadData();
  }

  public loadData(): void {
    this.isLoadingSignal.set(true);
    this.loadingFailedSignal.set(false);

    this.api.list().subscribe({
      next: (data: JobOffer[]) => this.jobOffersSignal.set(data),
      error: () => {
        this.jobOffersSignal.set([]);
        this.loadingFailedSignal.set(true);
      },
      complete: () => this.isLoadingSignal.set(false),
    });
  }

  public get isLoading(): Signal<boolean> {
    return this.isLoadingSignal.asReadonly();
  }

  public get loadingFailed(): Signal<boolean> {
    return this.loadingFailedSignal.asReadonly();
  }

  public get jobOffers(): Signal<JobOffer[]> {
    return this.jobOffersSignal.asReadonly();
  }
}
