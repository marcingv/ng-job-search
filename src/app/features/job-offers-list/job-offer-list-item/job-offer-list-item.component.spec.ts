import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOfferListItemComponent } from './job-offer-list-item.component';
import { JobOffer } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('JobOfferListItemComponent', (): void => {
  let component: JobOfferListItemComponent;
  let fixture: ComponentFixture<JobOfferListItemComponent>;

  const offer: JobOffer = JobOffersFactory.createInstance();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOfferListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobOfferListItemComponent);
    component = fixture.componentInstance;
    component.offer = offer;
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
});
