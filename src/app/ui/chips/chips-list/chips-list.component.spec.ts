import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipsListComponent } from './chips-list.component';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ChipsListComponent', () => {
  let component: ChipsListComponent;
  let fixture: ComponentFixture<ChipsListComponent>;

  const chips: string[] = ['Chip 1', 'Chip 2'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsListComponent);
    component = fixture.componentInstance;
    component.data = chips;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list of chips', () => {
    const ul: DebugElement = fixture.debugElement.query(By.css('ul'));
    const liElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('li'),
    );

    expect(ul).toBeTruthy();
    expect(liElements.length).toEqual(chips.length);

    chips.forEach((oneChip: string) => {
      expect(ul.nativeElement.textContent).toContain(oneChip);
    });
  });

  it('should not render the list if chips are empty', () => {
    component.data = [];
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    const ul: DebugElement = fixture.debugElement.query(By.css('ul'));
    const liElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('li'),
    );

    expect(ul).toBeNull();
    expect(liElements.length).toEqual(0);
  });
});
