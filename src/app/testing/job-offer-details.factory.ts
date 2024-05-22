import { JobOfferDetails } from '@core/types';
import { JobOffersFactory } from './job-offers.factory';

export class JobOfferDetailsFactory {
  public static createInstance(
    params?: Partial<JobOfferDetails>,
  ): JobOfferDetails {
    if (!params) {
      params = {};
    }
    if (!params.id) {
      params.id = JobOffersFactory.nextId();
    }

    return {
      ...JobOffersFactory.createInstance(params),
      location: 'EMEA,  Europe',
      industries: ['HR &amp; Recruiting'],
      types: ['full-time'],
      description: '<p>Job detailed description</p>',
      publishDate: new Date().toISOString(),
    };
  }
}
