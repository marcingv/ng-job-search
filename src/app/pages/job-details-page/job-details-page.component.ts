import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-job-details-page',
  standalone: true,
  imports: [],
  templateUrl: './job-details-page.component.html',
  styleUrl: './job-details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsPageComponent {}
