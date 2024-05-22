import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsListPageComponent } from './jobs-list-page.component';
import { JobOffersListService } from '@features/job-offers-data-access';
import { DebugElement, signal, Signal } from '@angular/core';
import { JobOffer } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import { By } from '@angular/platform-browser';
import { JobOffersListComponent } from '@features/job-offers-list';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('JobsListPageComponent', (): void => {
  let component: JobsListPageComponent;
  let fixture: ComponentFixture<JobsListPageComponent>;
  let dataService: SpyObj<JobOffersListService>;

  const offers: JobOffer[] = [
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
  ];
  const loadingFailed = signal(false);
  const isLoading = signal(false);
  const jobOffers = signal(offers);

  beforeEach(async () => {
    dataService = createSpyObj<JobOffersListService>([], {
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

    await TestBed.configureTestingModule({
      imports: [JobsListPageComponent],
      providers: [{ provide: JobOffersListService, useValue: dataService }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should display offers list', (): void => {
    const listCmp: DebugElement = fixture.debugElement.query(
      By.directive(JobOffersListComponent),
    );
    expect(listCmp).toBeTruthy();
  });
});
