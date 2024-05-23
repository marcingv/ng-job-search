import { Injectable, Signal, signal } from '@angular/core';
import { JobOffersApiService } from '@core/api';
import { JobOffer } from '@core/types';
import { catchError, finalize, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobOffersService {
  private isInitialLoadDoneSignal = signal<boolean>(false);
  private isLoadingSignal = signal<boolean>(false);
  private loadingFailedSignal = signal<boolean>(false);
  private jobOffersSignal = signal<JobOffer[]>([]);

  public constructor(private api: JobOffersApiService) {
    /**
     * Loading data immediately upon service creation
     * in order to deliver data as fast as possible
     * without the need for triggering a manual load.
     */
    this.loadData().subscribe();
  }

  public loadData(): Observable<JobOffer[]> {
    this.isLoadingSignal.set(true);
    this.loadingFailedSignal.set(false);

    return this.api.list().pipe(
      catchError(() => {
        this.loadingFailedSignal.set(true);

        return of([]);
      }),
      tap((data: JobOffer[]) => this.jobOffersSignal.set(data)),
      finalize(() => {
        this.isLoadingSignal.set(false);
        if (!this.isInitialLoadDoneSignal()) {
          this.isInitialLoadDoneSignal.set(true);
        }
      }),
    );
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
