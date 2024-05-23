import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipItemComponent } from './chip-item.component';
import { ChangeDetectorRef } from '@angular/core';

describe('ChipItemComponent', () => {
  let component: ChipItemComponent;
  let fixture: ComponentFixture<ChipItemComponent>;

  const chipText: string = 'My sample text';
  const chipHtmlText: string = 'Ying &amp; Yang';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipItemComponent);
    component = fixture.componentInstance;
    component.text = chipText;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render chip item with provided text', () => {
    expect(fixture.nativeElement.textContent).toContain(chipText);
  });

  it('should visualize HTML content as an text input', () => {
    component.text = chipHtmlText;
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Ying & Yang');
  });
});
