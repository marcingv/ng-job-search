import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsListPageComponent } from './jobs-list-page.component';

describe('JobsListPageComponent', () => {
  let component: JobsListPageComponent;
  let fixture: ComponentFixture<JobsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsListPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JobsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
