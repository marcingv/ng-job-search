import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { JobOffersService } from './job-offers.service';
import { JobOffersApiService } from '@core/api';
import { delay, of, throwError } from 'rxjs';
import { JobOffersFactory } from '@testing/job-offers.factory';
import { JobOffer } from '@core/types';
import { HttpErrorResponse } from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('JobOffersService', (): void => {
  let service: JobOffersService;
  let api: SpyObj<JobOffersApiService>;

  const offers: JobOffer[] = [
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
  ];

  beforeEach((): void => {
    api = createSpyObj<JobOffersApiService>(['list']);
    api.list.and.returnValue(of(offers));

    TestBed.configureTestingModule({
      providers: [{ provide: JobOffersApiService, useValue: api }],
    });

    service = TestBed.inject(JobOffersService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should load job offers as soon as service is created', (): void => {
    expect(api.list).toHaveBeenCalledTimes(1);
    expect(service.isLoading()).toBeFalse();
    expect(service.loadingFailed()).toBeFalse();
    expect(service.jobOffers()).toBeTruthy();
    expect(service.jobOffers()).toEqual(offers);
  });

  it('should update loading signal during data fetch', fakeAsync((): void => {
    const freshOffers: JobOffer[] = [
      JobOffersFactory.createInstance(),
      JobOffersFactory.createInstance(),
      JobOffersFactory.createInstance(),
    ];

    api.list.and.returnValue(of(freshOffers).pipe(delay(500)));
    expect(service.isLoading()).toBeFalse();

    service.loadData();

    tick(100);
    expect(service.isLoading()).toBeTrue();

    tick(400);
    expect(service.isLoading()).toBeFalse();

    expect(service.jobOffers()).toEqual(freshOffers);
  }));

  it('should emit loading failed signal set collection to empty on data fetch error', (): void => {
    api.list.and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 500 })),
    );

    expect(service.loadingFailed()).toBeFalse();
    expect(service.jobOffers().length).toBeGreaterThan(0);

    service.loadData();

    expect(service.loadingFailed()).toBeTrue();
    expect(service.jobOffers()).toEqual([]);
  });
});
