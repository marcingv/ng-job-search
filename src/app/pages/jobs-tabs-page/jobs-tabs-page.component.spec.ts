import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsTabsPageComponent } from './jobs-tabs-page.component';
import { provideRouter } from '@angular/router';

describe('JobsTabsPageComponent', () => {
  let component: JobsTabsPageComponent;
  let fixture: ComponentFixture<JobsTabsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsTabsPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsTabsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
