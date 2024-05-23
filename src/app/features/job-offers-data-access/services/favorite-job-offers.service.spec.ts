import { TestBed } from '@angular/core/testing';
import { FavoriteJobOffersService } from './favorite-job-offers.service';
import { LocalStorageService } from '@core/storage';
import { JobOffersService } from '@features/job-offers-data-access';
import { JobOffer, JobOfferId } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import { Subject } from 'rxjs';
import { Signal, signal, WritableSignal } from '@angular/core';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('FavoriteJobOffersService', () => {
  let service: FavoriteJobOffersService;
  let storage: SpyObj<LocalStorageService>;
  let jobOffersService: SpyObj<JobOffersService>;

  let allOffers: JobOffer[] = [];
  let favoritesOffersIds: JobOfferId[] = [];
  let storageRemoteChangeNotification$: Subject<JobOfferId[]>;

  let loadingFailedSignal: WritableSignal<boolean>;
  let isLoadingSignal: WritableSignal<boolean>;
  let allOffersSignal: WritableSignal<JobOffer[]>;

  const STORAGE_KEY = 'favorite-job-offers-ids';

  beforeEach((): void => {
    allOffers = [
      JobOffersFactory.createInstance(),
      JobOffersFactory.createInstance(),
    ];

    favoritesOffersIds = allOffers.map((oneOffer: JobOffer) => oneOffer.id);
    loadingFailedSignal = signal(false);
    isLoadingSignal = signal(false);
    allOffersSignal = signal(allOffers);

    storageRemoteChangeNotification$ = new Subject<JobOfferId[]>();

    storage = createSpyObj<LocalStorageService>([
      'remoteChangeNotification',
      'getItem',
      'setItem',
    ]);
    storage.getItem.and.callFake(<T>() => favoritesOffersIds as T);
    storage.setItem.and.callFake(
      <T>(key: string, value: T) => ((favoritesOffersIds as T) = value),
    );
    storage.remoteChangeNotification.and.returnValue(
      storageRemoteChangeNotification$,
    );

    jobOffersService = createSpyObj<JobOffersService>([], {
      get loadingFailed(): Signal<boolean> {
        return loadingFailedSignal;
      },
      get isLoading(): Signal<boolean> {
        return isLoadingSignal;
      },
      get jobOffers(): Signal<JobOffer[]> {
        return allOffersSignal;
      },
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: storage },
        { provide: JobOffersService, useValue: jobOffersService },
      ],
    });

    service = TestBed.inject(FavoriteJobOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial favorites ids from store', () => {
    expect(storage.getItem).toHaveBeenCalledOnceWith(STORAGE_KEY);
    expect(service.favorites().length).toEqual(allOffers.length);
  });

  it('should toggle favorite job offer', () => {
    const offerId: JobOfferId = allOffers[0].id;
    const isFavorite = service.isFavorite(offerId);

    expect(isFavorite()).toBeTrue();

    service.toggle(offerId);
    TestBed.flushEffects();

    expect(isFavorite()).toBeFalse();

    service.toggle(offerId);
    TestBed.flushEffects();

    expect(isFavorite()).toBeTrue();
    expect(storage.setItem).toHaveBeenCalledTimes(2);
  });
});
