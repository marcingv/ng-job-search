import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { jobOfferDetailsResolver } from './job-offer-details.resolver';
import { Observable } from 'rxjs';
import { ResolvedJobOfferDetails } from 'src/app/features/data-access-job-offers';

describe('jobOfferDetailsResolver', () => {
  const executeResolver: ResolveFn<Observable<ResolvedJobOfferDetails>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      jobOfferDetailsResolver()(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
