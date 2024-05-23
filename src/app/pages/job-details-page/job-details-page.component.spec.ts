import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailsPageComponent } from './job-details-page.component';

describe('JobDetailsPageComponent', () => {
  let component: JobDetailsPageComponent;
  let fixture: ComponentFixture<JobDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetailsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
