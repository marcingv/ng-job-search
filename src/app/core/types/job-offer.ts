import { JobOfferId } from './job-offer-id';

export interface JobOffer {
  id: JobOfferId;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;
}
