import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-jobs-list-page',
  standalone: true,
  imports: [],
  templateUrl: './jobs-list-page.component.html',
  styleUrl: './jobs-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsListPageComponent {

}
