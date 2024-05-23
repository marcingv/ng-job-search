import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsListPageComponent } from './jobs-list-page.component';
import { JobOffersService } from '@features/job-offers-data-access';
import { DebugElement, NO_ERRORS_SCHEMA, signal, Signal } from '@angular/core';
import { JobOffer } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import { By } from '@angular/platform-browser';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('JobsListPageComponent', (): void => {
  let component: JobsListPageComponent;
  let fixture: ComponentFixture<JobsListPageComponent>;
  let dataService: SpyObj<JobOffersService>;

  const offers: JobOffer[] = [
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
  ];
  const loadingFailed = signal(false);
  const isLoading = signal(false);
  const jobOffers = signal(offers);

  beforeEach(async () => {
    dataService = createSpyObj<JobOffersService>([], {
      get loadingFailed(): Signal<boolean> {
        return loadingFailed;
      },
      get isLoading(): Signal<boolean> {
        return isLoading;
      },
      get jobOffers(): Signal<JobOffer[]> {
        return jobOffers;
      },
    });

    await TestBed.overrideComponent(JobsListPageComponent, {
      set: {
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    })
      .configureTestingModule({
        imports: [JobsListPageComponent],
        providers: [{ provide: JobOffersService, useValue: dataService }],
      })
      .compileComponents();

    fixture = TestBed.createComponent(JobsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should display offers list', (): void => {
    const listCmp: DebugElement = fixture.debugElement.query(
      By.css('app-job-offers-list'),
    );
    expect(listCmp).toBeTruthy();
  });
});
