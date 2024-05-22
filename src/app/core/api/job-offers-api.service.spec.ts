import { TestBed } from '@angular/core/testing';
import { JobOffersApiService } from './job-offers-api.service';
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting, TestRequest } from "@angular/common/http/testing";
import { JobOffersFactory } from "@testing/job-offers.factory";
import { JobOffer, JobOfferDetails, JobOfferId } from "@core/types";
import { JobOfferDetailsFactory } from "@testing/job-offer-details.factory";

describe('JobOffersApiService', () => {
  let service: JobOffersApiService;
  let httpTestingController: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(JobOffersApiService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  describe('List endpoint', (): void => {
    it('should fetch the array of job offers', (): void => {
      const expectedRequestUrl = '/jobs';
      const expectedResponseData: JobOffer[] = [
        JobOffersFactory.createInstance(),
        JobOffersFactory.createInstance(),
      ];

      let fetchedData: JobOffer[] | undefined;

      service.list().subscribe((response: JobOffer[]) => fetchedData = response);

      const request: TestRequest = httpTestingController.expectOne(expectedRequestUrl);
      expect(request.request.method).toEqual('GET');

      request.flush(expectedResponseData);
      httpTestingController.verify();

      expect(fetchedData).toEqual(expectedResponseData);
    });
  });

  describe('Details endpoint', () => {
    it('should fetch job offer details', () => {
      const jobOfferId: JobOfferId = JobOffersFactory.nextId();
      const expectedRequestUrl = `/jobs/${ jobOfferId }`;
      const expectedResponseData: JobOfferDetails = JobOfferDetailsFactory.createInstance({ id: jobOfferId });

      let fetchedData: JobOfferDetails | undefined;

      service.details(jobOfferId).subscribe((response: JobOfferDetails) => fetchedData = response);

      const request: TestRequest = httpTestingController.expectOne(expectedRequestUrl);
      expect(request.request.method).toEqual('GET');

      request.flush(expectedResponseData);
      httpTestingController.verify();

      expect(fetchedData).toEqual(expectedResponseData);
    });
  });
});
