import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  OnChanges,
  Signal,
} from '@angular/core';
import { JobOffer } from '@core/types';
import { StarIconComponent } from '@ui/icons/star-icon';
import { ButtonComponent } from '@ui/buttons/button';
import { FavouriteJobOffersService } from '@features/job-offers-data-access';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-job-offer-list-item',
  standalone: true,
  imports: [StarIconComponent, ButtonComponent, NgClass],
  templateUrl: './job-offer-list-item.component.html',
  styleUrl: './job-offer-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOfferListItemComponent implements OnChanges {
  @Input({ required: true }) public offer!: JobOffer;

  protected isFavourite!: Signal<boolean>;
  protected toggleFavouritesBtnTitle!: Signal<string>;

  public constructor(
    protected favouriteOffersService: FavouriteJobOffersService,
  ) {}

  public ngOnChanges(): void {
    this.isFavourite = this.favouriteOffersService.isFavourite(this.offer.id);
    this.toggleFavouritesBtnTitle = computed(() => {
      return this.isFavourite()
        ? 'Remove from favourites'
        : 'Add to favourites';
    });
  }
}
