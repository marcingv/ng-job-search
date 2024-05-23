import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  Signal,
} from '@angular/core';
import { JobOffer } from '@core/types';
import { StarIconComponent } from '@ui/icons/star-icon';
import { FavoriteJobOffersService } from '@features/job-offers-data-access';
import { ButtonDirective } from '@ui/buttons/directives';
import { NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-offer-list-item',
  standalone: true,
  imports: [StarIconComponent, ButtonDirective, NgClass, RouterLink],
  templateUrl: './job-offer-list-item.component.html',
  styleUrl: './job-offer-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOfferListItemComponent implements OnChanges {
  protected activatedRoute = inject(ActivatedRoute);
  protected favoriteOffersService = inject(FavoriteJobOffersService);

  protected readonly ADD_TO_FAVORITES_LABEL = 'Add to favorites';
  protected readonly REMOVE_FROM_FAVORITES_LABEL = 'Remove from favorites';

  @Input({ required: true }) public offer!: JobOffer;
  @Input() public showActions: boolean = true;

  protected isFavorite!: Signal<boolean>;
  protected detailsRouterLink!: string[];

  public ngOnChanges(): void {
    this.isFavorite = this.favoriteOffersService.isFavorite(this.offer.id);
    this.detailsRouterLink = this.createDetailsRouterLink();
  }

  private createDetailsRouterLink(): string[] {
    return [this.offer.id.toString()];
  }
}
