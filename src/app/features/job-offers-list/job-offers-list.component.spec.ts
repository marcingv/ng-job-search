import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOffersListComponent } from './job-offers-list.component';
import { JobOffer } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('JobOffersListComponent', (): void => {
  let component: JobOffersListComponent;
  let fixture: ComponentFixture<JobOffersListComponent>;

  const offers: JobOffer[] = [
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOffersListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobOffersListComponent);
    component = fixture.componentInstance;
    component.data = offers;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should display a list of offers', (): void => {
    const ul: DebugElement = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();

    const liItems: DebugElement[] = ul.queryAll(By.css('li'));
    expect(liItems.length).toEqual(offers.length);
  });
});
