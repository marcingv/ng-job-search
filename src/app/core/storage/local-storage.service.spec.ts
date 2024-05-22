import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const KEY = 'test';

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(LocalStorageService);
    service.clearItem(KEY);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have empty value for specified key', () => {
    const hasItemSignal = service.hasItem(KEY);
    const getItemSignal = service.getItem(KEY);

    expect(hasItemSignal()).toBeFalse();
    expect(getItemSignal()).toBeNull();
  });

  it('should provide values as signal', () => {
    const dataObj1 = { name: 'Test object' };
    const dataObj2 = { name: 'Updated test object' };

    const hasValueSignal = service.hasItem(KEY);
    const valueSignal = service.getItem(KEY);

    expect(hasValueSignal()).toBeFalse();

    service.setItem(KEY, dataObj1);
    expect(valueSignal()).toEqual(dataObj1);

    service.setItem(KEY, dataObj2);
    expect(valueSignal()).toEqual(dataObj2);
  });

  it('should clear value', () => {
    const hasValueSignal = service.hasItem(KEY);
    const valueSignal = service.getItem(KEY);

    expect(hasValueSignal()).toBeFalse();
    expect(valueSignal()).toBeNull();

    service.setItem(KEY, 'test value');

    expect(hasValueSignal()).toBeTrue();
    expect(valueSignal()).toBeTruthy();

    service.clearItem(KEY);

    expect(hasValueSignal()).toBeFalse();
    expect(valueSignal()).toBeNull();
  });
});
