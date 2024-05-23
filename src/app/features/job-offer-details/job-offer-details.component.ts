import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { JobOfferDetails } from '@core/types';
import { ChipsListComponent } from '@ui/chips/chips-list';
import { DatePipe } from '@angular/common';
import { SanitizeHtmlPipe } from '@ui/pipes';

@Component({
  selector: 'app-job-offer-details',
  standalone: true,
  imports: [ChipsListComponent, DatePipe, SanitizeHtmlPipe],
  templateUrl: './job-offer-details.component.html',
  styleUrl: './job-offer-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOfferDetailsComponent implements OnChanges {
  @Input({ required: true }) public details!: JobOfferDetails;

  protected tags: string[] = [];

  public ngOnChanges(): void {
    this.tags = [...this.details.types, ...this.details.industries];
  }
}
