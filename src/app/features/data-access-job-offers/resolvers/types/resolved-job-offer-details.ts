import { JobOfferDetails } from '@core/types';

export interface ResolvedJobOfferDetails {
  details: JobOfferDetails | null;
  isResolveError: boolean;
  resolveErrorMessage?: string;
}
