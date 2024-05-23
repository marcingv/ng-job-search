import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { PathParams } from '@core/router/path-params';
import { JobOfferId } from '@core/types';
import { inject } from '@angular/core';
import { FavoriteJobOffersService } from 'src/app/features/data-access-job-offers';
import { toObservable } from '@angular/core/rxjs-interop';

export type IsFavoriteJobOfferGuardConfig = {
  onFailureRedirect: string[];
};

export const isFavoriteJobOfferGuard: (
  config: IsFavoriteJobOfferGuardConfig,
) => CanActivateFn = (config: IsFavoriteJobOfferGuardConfig): CanActivateFn => {
  return (route: ActivatedRouteSnapshot): Observable<true | UrlTree> => {
    const router: Router = inject(Router);
    const favoritesService: FavoriteJobOffersService = inject(
      FavoriteJobOffersService,
    );

    const idParam: string | null = route.paramMap.get(PathParams.JOB_ID);
    const jobId: JobOfferId | null = idParam ? +idParam : null;
    if (!jobId || isNaN(jobId)) {
      return of(guardAccessFailed(router, config));
    }

    return allowAccessIfIsFavorite(jobId, favoritesService, router, config);
  };
};

const allowAccessIfIsFavorite = (
  jobId: JobOfferId,
  favoritesService: FavoriteJobOffersService,
  router: Router,
  config: IsFavoriteJobOfferGuardConfig,
): Observable<true | UrlTree> => {
  const isFavourite$: Observable<boolean> = toObservable(
    favoritesService.isFavorite(jobId),
  );

  return isFavourite$.pipe(
    map((isFavorite: boolean) => {
      if (!isFavorite) {
        return guardAccessFailed(router, config);
      }

      return true;
    }),
  );
};

const guardAccessFailed = (
  router: Router,
  config: IsFavoriteJobOfferGuardConfig,
): UrlTree => {
  return router.createUrlTree(config.onFailureRedirect);
};
