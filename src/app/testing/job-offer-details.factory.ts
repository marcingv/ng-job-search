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
      location: params.location ?? 'EMEA,  Europe',
      industries: params.industries ?? ['HR &amp; Recruiting'],
      types: params.types ?? ['full-time'],
      description: params.description ?? '<p>Job detailed description</p>',
      publishDate: params.publishDate ?? new Date().toISOString(),
    };
  }
}
