import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [SanitizeHtmlPipe],
  template: '<div [innerHTML]="\'Ying &amp; Yang\' | sanitizeHtml"></div>',
})
class HostComponent {}

describe('SanitizeHtmlPipe', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should output sanitized text', () => {
    expect(fixture.nativeElement.textContent).toEqual('Ying & Yang');
  });
});
