import { TestBed } from '@angular/core/testing';
import { BackButtonComponent } from './back-button.component';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButtonComponent],
      providers: [
        provideRouter([
          {
            path: 'some',
            children: [
              {
                path: 'example',
                children: [
                  {
                    path: 'path',
                    component: BackButtonComponent,
                  },
                ],
              },
            ],
          },
        ]),
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create('/some/example/path');
    component = await harness.navigateByUrl(
      '/some/example/path',
      BackButtonComponent,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render link with href set to one level up than the current url path', () => {
    const link: DebugElement = harness.fixture.debugElement.query(By.css('a'));

    expect(link).toBeTruthy();
    expect(link.attributes['href']).toEqual('/some/example');
  });
});
