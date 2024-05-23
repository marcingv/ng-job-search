import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { initialJobOffersLoadGuard } from './initial-job-offers-load.guard';

describe('initialJobOffersLoadGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      initialJobOffersLoadGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
