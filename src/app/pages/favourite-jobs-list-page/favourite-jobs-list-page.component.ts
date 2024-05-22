import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favourite-jobs-list-page',
  standalone: true,
  imports: [],
  templateUrl: './favourite-jobs-list-page.component.html',
  styleUrl: './favourite-jobs-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteJobsListPageComponent {}
