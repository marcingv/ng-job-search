import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOfferListItemComponent } from './job-offer-list-item.component';
import { JobOffer } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import { By } from '@angular/platform-browser';
import { DebugElement, signal } from '@angular/core';
import { FavoriteJobOffersService } from 'src/app/features/data-access-job-offers';
import { StarIconComponent } from '@ui/icons/star-icon';
import { ButtonDirective } from '@ui/buttons/directives';
import { provideRouter } from '@angular/router';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('JobOfferListItemComponent', (): void => {
  let component: JobOfferListItemComponent;
  let fixture: ComponentFixture<JobOfferListItemComponent>;
  let dataProvider: SpyObj<FavoriteJobOffersService>;

  const offer: JobOffer = JobOffersFactory.createInstance();
  const isFavoriteSignal = signal<boolean>(false);

  beforeEach(async () => {
    dataProvider = createSpyObj<FavoriteJobOffersService>([
      'isFavorite',
      'toggle',
    ]);
    dataProvider.isFavorite.and.returnValue(isFavoriteSignal);

    isFavoriteSignal.set(false);

    await TestBed.configureTestingModule({
      imports: [JobOfferListItemComponent],
      providers: [
        provideRouter([]),
        { provide: FavoriteJobOffersService, useValue: dataProvider },
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
    expect(logo.attributes['alt']).toEqual(offer.companyName);

    const icon: DebugElement = fixture.debugElement.query(By.css('.icon-star'));
    expect(icon).toBeTruthy();
    expect(icon.attributes['id']).toEqual('star-' + offer.id);
  });

  it('should have active class on favorite offers star icon', () => {
    isFavoriteSignal.set(true);
    fixture.detectChanges();

    const icon: DebugElement = fixture.debugElement.query(
      By.directive(StarIconComponent),
    );

    expect(icon).toBeTruthy();
    expect(icon.classes['active']).toBeTruthy();
  });

  it('should toggle favorite on star icon click', () => {
    const button: DebugElement = fixture.debugElement.query(
      By.directive(ButtonDirective),
    );
    button.triggerEventHandler('click');

    expect(dataProvider.toggle).toHaveBeenCalledWith(offer.id);
  });

  it('should render the link to details page', () => {
    const detailsLink: DebugElement = fixture.debugElement.query(By.css('a'));

    expect(detailsLink).toBeTruthy();
    expect(detailsLink.attributes['href']).toContain(`/${offer.id}`);
  });
});
