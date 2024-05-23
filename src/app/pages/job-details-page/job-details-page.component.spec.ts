import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailsPageComponent } from './job-details-page.component';
import {
  ChangeDetectorRef,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { JobOfferDetails } from '@core/types';
import { JobOfferDetailsFactory } from '@testing/job-offer-details.factory';
import { SanitizeHtmlPipe } from '@ui/pipes';
import { ResolvedJobOfferDetails } from '@features/job-offers-data-access';

describe('JobDetailsPageComponent', () => {
  let component: JobDetailsPageComponent;
  let fixture: ComponentFixture<JobDetailsPageComponent>;

  const offer: JobOfferDetails = JobOfferDetailsFactory.createInstance();
  const resolvedData: ResolvedJobOfferDetails = {
    details: offer,
    isResolveError: false,
    resolveErrorMessage: undefined,
  };

  beforeEach(async () => {
    await TestBed.overrideComponent(JobDetailsPageComponent, {
      set: {
        imports: [DatePipe, SanitizeHtmlPipe],
        schemas: [NO_ERRORS_SCHEMA],
      },
    })
      .configureTestingModule({
        imports: [JobDetailsPageComponent],
      })
      .compileComponents();

    fixture = TestBed.createComponent(JobDetailsPageComponent);
    component = fixture.componentInstance;
    component.data = resolvedData;
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

  it('should render offer details', () => {
    const detailsView: DebugElement = fixture.debugElement.query(
      By.css('app-job-offer-details'),
    );
    const errorView: DebugElement = fixture.debugElement.query(
      By.css('app-error-placeholder'),
    );

    expect(detailsView).toBeTruthy();
    expect(errorView).toBeNull();
  });

  it('should render error', () => {
    component.data = {
      details: null,
      isResolveError: true,
      resolveErrorMessage: 'Not found',
    };
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    const detailsView: DebugElement = fixture.debugElement.query(
      By.css('app-job-offer-details'),
    );
    const errorView: DebugElement = fixture.debugElement.query(
      By.css('app-error-placeholder'),
    );

    expect(detailsView).toBeNull();
    expect(errorView).toBeTruthy();
  });
});
