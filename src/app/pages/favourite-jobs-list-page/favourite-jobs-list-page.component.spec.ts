import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouriteJobsListPageComponent } from './favourite-jobs-list-page.component';
import { FavouriteJobOffersService } from '@features/job-offers-data-access';
import { JobOffer, JobOfferId } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import {
  computed,
  DebugElement,
  NO_ERRORS_SCHEMA,
  Signal,
  signal,
} from '@angular/core';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { By } from '@angular/platform-browser';

describe('FavouriteJobsListPageComponent', () => {
  let component: FavouriteJobsListPageComponent;
  let fixture: ComponentFixture<FavouriteJobsListPageComponent>;
  let dataProvider: SpyObj<FavouriteJobOffersService>;

  const offers: JobOffer[] = [
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
  ];
  const loadingFailed = signal(false);
  const isLoading = signal(false);
  const jobOffers = signal(offers);

  beforeEach(async () => {
    dataProvider = createSpyObj<FavouriteJobOffersService>([], {
      get loadingFailed(): Signal<boolean> {
        return loadingFailed;
      },
      get isLoading(): Signal<boolean> {
        return isLoading;
      },
      get favourites(): Signal<JobOffer[]> {
        return jobOffers;
      },
      isFavourite(id: JobOfferId): Signal<boolean> {
        return computed(() => {
          return !!jobOffers().find((oneOffer) => (oneOffer.id = id));
        });
      },
    });

    await TestBed.overrideComponent(FavouriteJobsListPageComponent, {
      set: {
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    })
      .configureTestingModule({
        imports: [FavouriteJobsListPageComponent],
        providers: [
          { provide: FavouriteJobOffersService, useValue: dataProvider },
        ],
      })
      .compileComponents();

    fixture = TestBed.createComponent(FavouriteJobsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display offers list', (): void => {
    const listCmp: DebugElement = fixture.debugElement.query(
      By.css('app-job-offers-list'),
    );
    expect(listCmp).toBeTruthy();
  });
});
