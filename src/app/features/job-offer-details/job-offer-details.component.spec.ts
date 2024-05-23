import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOfferDetailsComponent } from './job-offer-details.component';
import { JobOfferDetails } from '@core/types';
import { JobOfferDetailsFactory } from '@testing/job-offer-details.factory';

describe('JobOfferDetailsComponent', () => {
  let component: JobOfferDetailsComponent;
  let fixture: ComponentFixture<JobOfferDetailsComponent>;

  const details: JobOfferDetails = JobOfferDetailsFactory.createInstance();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOfferDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobOfferDetailsComponent);
    component = fixture.componentInstance;
    component.details = details;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
