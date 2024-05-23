import { CanActivateFn } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { JobOffersService } from '@features/data-access-job-offers';
import { toObservable } from '@angular/core/rxjs-interop';

export const initialJobOffersLoadGuard: CanActivateFn =
  (): Observable<boolean> => {
    const jobOffersService: JobOffersService = inject(JobOffersService);

    return toObservable(jobOffersService.isInitialLoadDone).pipe(
      filter((isInitialLoadDone: boolean) => isInitialLoadDone),
    );
  };
