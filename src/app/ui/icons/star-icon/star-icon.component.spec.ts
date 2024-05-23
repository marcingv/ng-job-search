import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarIconComponent } from './star-icon.component';

describe('StarIconComponent', (): void => {
  let component: StarIconComponent;
  let fixture: ComponentFixture<StarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should have icon-star css class appended to root element', (): void => {
    expect(fixture.debugElement.attributes['class']).toContain('icon-star');
  });
});
