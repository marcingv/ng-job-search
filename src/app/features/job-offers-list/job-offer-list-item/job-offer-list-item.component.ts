import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Signal,
} from '@angular/core';
import { JobOffer } from '@core/types';
import { StarIconComponent } from '@ui/icons/star-icon';
import { FavouriteJobOffersService } from '@features/job-offers-data-access';
import { ButtonDirective } from '@ui/buttons/directives';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-job-offer-list-item',
  standalone: true,
  imports: [StarIconComponent, ButtonDirective, NgClass],
  templateUrl: './job-offer-list-item.component.html',
  styleUrl: './job-offer-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOfferListItemComponent implements OnChanges {
  protected readonly ADD_TO_FAVORITES_LABEL = 'Add to favorites';
  protected readonly REMOVE_FROM_FAVORITES_LABEL = 'Remove from favorites';

  @Input({ required: true }) public offer!: JobOffer;

  protected isFavourite!: Signal<boolean>;

  public constructor(
    protected favouriteOffersService: FavouriteJobOffersService,
  ) {}

  public ngOnChanges(): void {
    this.isFavourite = this.favouriteOffersService.isFavourite(this.offer.id);
  }
}
