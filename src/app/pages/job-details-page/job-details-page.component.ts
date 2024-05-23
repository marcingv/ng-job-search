import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { BackButtonComponent } from '@ui/buttons/components/back-button';
import { JobOfferDetails } from '@core/types';
import { DatePipe } from '@angular/common';
import { ChipsListComponent } from '@ui/chips/chips-list';
import { SanitizeHtmlPipe } from '@ui/pipes';

@Component({
  selector: 'app-job-details-page',
  standalone: true,
  imports: [
    BackButtonComponent,
    DatePipe,
    ChipsListComponent,
    SanitizeHtmlPipe,
  ],
  templateUrl: './job-details-page.component.html',
  styleUrl: './job-details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsPageComponent implements OnChanges {
  @Input({ required: true }) public details!: JobOfferDetails;

  public tags: string[] = [];

  public ngOnChanges(): void {
    this.tags = [...this.details.types, ...this.details.industries];
  }
}
