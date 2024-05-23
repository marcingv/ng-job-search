import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { isFavoriteJobOfferGuard } from './is-favorite-job-offer.guard';

describe('isFavoriteJobOfferGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      isFavoriteJobOfferGuard({ onFailureRedirect: [] })(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
