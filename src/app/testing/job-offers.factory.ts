import { JobOffer, JobOfferId } from "@core/types";

export class JobOffersFactory {
  private static lastId: number = 0;

  public static createInstance(params?: Partial<JobOffer>): JobOffer {
    if (!params) {
      params = {};
    }

    const id: JobOfferId = params.id ?? JobOffersFactory.nextId();

    return {
      id: id,
      title: params.title ?? `Job Offer #${ id }`,
      companyLogo: params.companyLogo ?? 'http://localhost/logo.png',
      companyName: params.companyName ?? `Company #${ id }`,
      reference: params.reference ?? (Math.ceil(Math.random() * 10000) + '-reference-number'),
    };
  }

  public static nextId(): JobOfferId {
    return ++JobOffersFactory.lastId;
  }
}
