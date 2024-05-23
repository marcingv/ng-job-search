import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailsPageComponent } from './job-details-page.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { JobOfferDetails } from '@core/types';
import { JobOfferDetailsFactory } from '@testing/job-offer-details.factory';

describe('JobDetailsPageComponent', () => {
  let component: JobDetailsPageComponent;
  let fixture: ComponentFixture<JobDetailsPageComponent>;

  const offer: JobOfferDetails = JobOfferDetailsFactory.createInstance();

  beforeEach(async () => {
    await TestBed.overrideComponent(JobDetailsPageComponent, {
      set: {
        imports: [DatePipe],
        schemas: [NO_ERRORS_SCHEMA],
      },
    })
      .configureTestingModule({
        imports: [JobDetailsPageComponent],
      })
      .compileComponents();

    fixture = TestBed.createComponent(JobDetailsPageComponent);
    component = fixture.componentInstance;
    component.details = offer;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render back button', () => {
    const backButton: DebugElement = fixture.debugElement.query(
      By.css('app-back-button'),
    );

    expect(backButton).toBeTruthy();
  });
});
