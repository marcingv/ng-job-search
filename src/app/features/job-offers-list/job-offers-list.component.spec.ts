import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOffersListComponent } from './job-offers-list.component';
import { JobOffer } from '@core/types';
import { JobOffersFactory } from '@testing/job-offers.factory';
import {
  ChangeDetectorRef,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { By } from '@angular/platform-browser';

describe('JobOffersListComponent', (): void => {
  let component: JobOffersListComponent;
  let fixture: ComponentFixture<JobOffersListComponent>;

  const offers: JobOffer[] = [
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
    JobOffersFactory.createInstance(),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOffersListComponent],
    })
      .overrideComponent(JobOffersListComponent, {
        set: {
          imports: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(JobOffersListComponent);
    component = fixture.componentInstance;
    component.data = offers;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should display a list of offers', (): void => {
    const ul: DebugElement = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();

    const liItems: DebugElement[] = ul.queryAll(By.css('li'));
    expect(liItems.length).toEqual(offers.length);
  });

  it('should display an error if loading failed', (): void => {
    component.loadingFailed = true;
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    const errorPlaceholder: DebugElement = fixture.debugElement.query(
      By.css('app-error-placeholder'),
    );
    expect(errorPlaceholder).toBeTruthy();
  });

  it('should display empty placeholder for empty collection', (): void => {
    component.data = [];
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    const emptyPlaceholder: DebugElement = fixture.debugElement.query(
      By.css('app-empty-collection-placeholder'),
    );
    expect(emptyPlaceholder).toBeTruthy();
  });
});
