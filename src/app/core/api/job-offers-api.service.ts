import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JobOffer, JobOfferDetails, JobOfferId } from "@core/types";

@Injectable({
  providedIn: 'root'
})
export class JobOffersApiService {
  private readonly LIST_ENDPOINT = '/jobs';
  private readonly DETAILS_ENDPOINT = '/jobs/{jobId}';

  public constructor(private http: HttpClient) {
  }

  public list(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.LIST_ENDPOINT);
  }

  public details(id: JobOfferId): Observable<JobOfferDetails> {
    const url = this.DETAILS_ENDPOINT.replace('{jobId}', id.toString());

    return this.http.get<JobOfferDetails>(url);
  }
}
