import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@ui/layouts/main-layout';
import { JobsTabsPageComponent } from '@pages/jobs-tabs-page';
import { Paths } from './paths';
import { JobsListPageComponent } from '@pages/jobs-list-page';
import { FavouriteJobsListPageComponent } from '@pages/favourite-jobs-list-page';
import { PathParams } from '@core/router/path-params';
import { JobDetailsPageComponent } from '@pages/job-details-page/job-details-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: JobsTabsPageComponent,
        children: [
          {
            path: Paths.JOBS,
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: JobsListPageComponent,
              },
              {
                path: `:${PathParams.JOB_ID}`,
                component: JobDetailsPageComponent,
              },
            ],
          },
          {
            path: Paths.FAVOURITES,
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: FavouriteJobsListPageComponent,
              },
              {
                path: `:${PathParams.JOB_ID}`,
                component: JobDetailsPageComponent,
              },
            ],
          },
          {
            path: Paths.WILDCARD,
            redirectTo: Paths.JOBS,
          },
        ],
      },
    ],
  },
];
