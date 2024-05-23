import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOfferListItemComponent } from './job-offer-list-item.component';
import { JobOffer } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import { By } from '@angular/platform-browser';
import { DebugElement, signal } from '@angular/core';
import { FavouriteJobOffersService } from '@features/job-offers-data-access';
import { StarIconComponent } from '@ui/icons/star-icon';
import { ButtonDirective } from '@ui/buttons/directives';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('JobOfferListItemComponent', (): void => {
  let component: JobOfferListItemComponent;
  let fixture: ComponentFixture<JobOfferListItemComponent>;
  let dataProvider: SpyObj<FavouriteJobOffersService>;

  const offer: JobOffer = JobOffersFactory.createInstance();
  const isFavouriteSignal = signal<boolean>(false);

  beforeEach(async () => {
    dataProvider = createSpyObj<FavouriteJobOffersService>([
      'isFavourite',
      'toggle',
    ]);
    dataProvider.isFavourite.and.returnValue(isFavouriteSignal);

    isFavouriteSignal.set(false);

    await TestBed.configureTestingModule({
      imports: [JobOfferListItemComponent],
      providers: [
        { provide: FavouriteJobOffersService, useValue: dataProvider },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobOfferListItemComponent);
    component = fixture.componentInstance;
    component.offer = offer;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should display offer info', (): void => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain(offer.title);
    expect(element.textContent).toContain(offer.companyName);
    expect(element.textContent).toContain(offer.reference);

    const logo: DebugElement = fixture.debugElement.query(By.css('img'));
    expect(logo).toBeTruthy();
    expect(logo.attributes['src']).toEqual(offer.companyLogo);
    expect(logo.attributes['alt']).toEqual(offer.title);

    const icon: DebugElement = fixture.debugElement.query(By.css('.icon-star'));
    expect(icon).toBeTruthy();
    expect(icon.attributes['id']).toEqual('star-' + offer.id);
  });

  it('should have active class on favourite offers star icon', () => {
    isFavouriteSignal.set(true);
    fixture.detectChanges();

    const icon: DebugElement = fixture.debugElement.query(
      By.directive(StarIconComponent),
    );

    expect(icon).toBeTruthy();
    expect(icon.classes['active']).toBeTruthy();
  });

  it('should toggle favourite on star icon click', () => {
    const button: DebugElement = fixture.debugElement.query(
      By.directive(ButtonDirective),
    );
    button.triggerEventHandler('click');

    expect(dataProvider.toggle).toHaveBeenCalledWith(offer.id);
  });
});
