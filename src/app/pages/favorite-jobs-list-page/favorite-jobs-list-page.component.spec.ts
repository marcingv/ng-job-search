import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteJobsListPageComponent } from './favorite-jobs-list-page.component';
import { FavoriteJobOffersService } from '@features/job-offers-data-access';
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

describe('FavoriteJobsListPageComponent', () => {
  let component: FavoriteJobsListPageComponent;
  let fixture: ComponentFixture<FavoriteJobsListPageComponent>;
  let dataProvider: SpyObj<FavoriteJobOffersService>;

  const offers: JobOffer[] = [
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
  ];
  const loadingFailed = signal(false);
  const isLoading = signal(false);
  const jobOffers = signal(offers);

  beforeEach(async () => {
    dataProvider = createSpyObj<FavoriteJobOffersService>([], {
      get loadingFailed(): Signal<boolean> {
        return loadingFailed;
      },
      get isLoading(): Signal<boolean> {
        return isLoading;
      },
      get favorites(): Signal<JobOffer[]> {
        return jobOffers;
      },
      isFavorite(id: JobOfferId): Signal<boolean> {
        return computed(() => {
          return !!jobOffers().find((oneOffer) => (oneOffer.id = id));
        });
      },
    });

    await TestBed.overrideComponent(FavoriteJobsListPageComponent, {
      set: {
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    })
      .configureTestingModule({
        imports: [FavoriteJobsListPageComponent],
        providers: [
          { provide: FavoriteJobOffersService, useValue: dataProvider },
        ],
      })
      .compileComponents();

    fixture = TestBed.createComponent(FavoriteJobsListPageComponent);
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
