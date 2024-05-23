import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { JobOffersApiService } from '@core/api';
import { PathParams } from '@core/router/path-params';
import { JobOfferDetails, JobOfferId } from '@core/types';
import { catchError, Observable, of } from 'rxjs';

export const jobOfferDetailsResolver: () => ResolveFn<
  Observable<JobOfferDetails | null>
> = () => {
  return (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<JobOfferDetails | null> => {
    const router: Router = inject(Router);
    const api: JobOffersApiService = inject(JobOffersApiService);

    const idParam: string | null = route.paramMap.get(PathParams.JOB_ID);
    const jobId: JobOfferId | null = idParam ? +idParam : null;
    if (!jobId || isNaN(jobId)) {
      errorRedirect(router, state);

      return of(null);
    }

    return api.details(jobId).pipe(
      catchError(() => {
        errorRedirect(router, state);

        return of(null);
      }),
    );
  };
};

const errorRedirect = (router: Router, state: RouterStateSnapshot): void => {
  router.navigate([state.url, '..']);
};
