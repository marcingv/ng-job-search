import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { JobOffersApiService } from '@core/api';
import { PathParams } from '@core/router/path-params';
import { JobOfferDetails, JobOfferId } from '@core/types';
import { catchError, map, Observable, of } from 'rxjs';
import { ResolvedJobOfferDetails } from '@features/job-offers-data-access';
import { HttpErrorResponse } from '@angular/common/http';

const JOB_OFFER_NOT_FOUND_MESSAGE = 'Job offer does not exist.';
const JOB_OFFER_FETCH_ERROR_MESSAGE =
  'Could not fetch job offer details. Try again later.';

export const jobOfferDetailsResolver: () => ResolveFn<
  Observable<ResolvedJobOfferDetails>
> = () => {
  return (
    route: ActivatedRouteSnapshot,
  ): Observable<ResolvedJobOfferDetails> => {
    const api: JobOffersApiService = inject(JobOffersApiService);

    const idParam: string | null = route.paramMap.get(PathParams.JOB_ID);
    const jobId: JobOfferId | null = idParam ? +idParam : null;
    if (!jobId || isNaN(jobId)) {
      return of({
        details: null,
        isResolveError: true,
        resolveErrorMessage: JOB_OFFER_NOT_FOUND_MESSAGE,
      });
    }

    return api.details(jobId).pipe(
      map((details: JobOfferDetails): ResolvedJobOfferDetails => {
        return {
          details: details,
          isResolveError: false,
        };
      }),
      catchError(
        (err: HttpErrorResponse): Observable<ResolvedJobOfferDetails> => {
          return of({
            details: null,
            isResolveError: true,
            resolveErrorMessage:
              err.status === 404
                ? JOB_OFFER_NOT_FOUND_MESSAGE
                : JOB_OFFER_FETCH_ERROR_MESSAGE,
          });
        },
      ),
    );
  };
};
