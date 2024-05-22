import { JobOffer } from './job-offer';
import { DateTimeString } from './date-time-string';
import { JobOfferType } from './job-offer-type';

export interface JobOfferDetails extends JobOffer {
  location: string;
  industries: string[];
  types: JobOfferType[];
  description: string;
  publishDate: DateTimeString;
}
