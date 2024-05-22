import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouriteJobsListPageComponent } from './favourite-jobs-list-page.component';

describe('FavouriteJobsListPageComponent', () => {
  let component: FavouriteJobsListPageComponent;
  let fixture: ComponentFixture<FavouriteJobsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteJobsListPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FavouriteJobsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
