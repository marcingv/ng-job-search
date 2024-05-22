import { Routes } from '@angular/router';
import { MainLayoutComponent } from "@layouts/main-layout";
import { JobsTabsPageComponent } from "@pages/jobs-tabs-page";
import { Paths } from "./paths";
import { JobsListPageComponent } from "@pages/jobs-list-page";
import { FavouriteJobsListPageComponent } from "@pages/favourite-jobs-list-page";

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
            component: JobsListPageComponent,
          },
          {
            path: Paths.FAVOURITES,
            component: FavouriteJobsListPageComponent,
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
