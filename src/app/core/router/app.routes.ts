import { Route, Routes } from '@angular/router';
import { MainLayoutComponent } from '@ui/layouts/main-layout';
import { JobsTabsPageComponent } from '@pages/jobs-tabs-page';
import { Paths } from './paths';
import { JobsListPageComponent } from '@pages/jobs-list-page';
import { FavoriteJobsListPageComponent } from 'src/app/pages/favorite-jobs-list-page';
import { PathParams } from '@core/router/path-params';
import { JobDetailsPageComponent } from '@pages/job-details-page/job-details-page.component';
import {
  isFavoriteJobOfferGuard,
  jobOfferDetailsResolver,
} from 'src/app/features/data-access-job-offers';

const OFFERS_LIST_PAGE: Route = {
  path: Paths.JOB_OFFERS,
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: JobsListPageComponent,
    },
    {
      path: `:${PathParams.JOB_ID}`,
      component: JobDetailsPageComponent,
      resolve: {
        data: jobOfferDetailsResolver(),
      },
    },
    {
      path: Paths.WILDCARD,
      redirectTo: '',
    },
  ],
};

const FAVORITES_LIST_PAGE: Route = {
  path: Paths.FAVORITES,
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: FavoriteJobsListPageComponent,
    },
    {
      path: `:${PathParams.JOB_ID}`,
      component: JobDetailsPageComponent,
      canActivate: [
        isFavoriteJobOfferGuard({
          onFailureRedirect: [Paths.ROOT, Paths.FAVORITES],
        }),
      ],
      resolve: {
        data: jobOfferDetailsResolver(),
      },
    },
    {
      path: Paths.WILDCARD,
      redirectTo: '',
    },
  ],
};

const OFFERS_TABS: Route = {
  path: '',
  component: JobsTabsPageComponent,
  children: [
    OFFERS_LIST_PAGE,
    FAVORITES_LIST_PAGE,
    {
      path: Paths.WILDCARD,
      redirectTo: Paths.JOB_OFFERS,
    },
  ],
};

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [OFFERS_TABS],
  },
];
