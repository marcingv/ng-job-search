import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailsPageComponent } from './job-details-page.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('JobDetailsPageComponent', () => {
  let component: JobDetailsPageComponent;
  let fixture: ComponentFixture<JobDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(JobDetailsPageComponent, {
      set: {
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    })
      .configureTestingModule({
        imports: [JobDetailsPageComponent],
      })
      .compileComponents();

    fixture = TestBed.createComponent(JobDetailsPageComponent);
    component = fixture.componentInstance;
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
