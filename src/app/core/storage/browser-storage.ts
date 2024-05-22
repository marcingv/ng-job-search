import { computed, Signal } from '@angular/core';
import { fromEvent, Subject, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

export abstract class BrowserStorage {
  private readonly newValue$ = new Subject<{ key: string; value: unknown }>();
  private readonly newValueSignal = toSignal(this.newValue$);

  public constructor() {
    this.synchronizeStorageBetweenBrowserTabs();
  }

  public setItem<T>(key: string, value: T): void {
    const json = JSON.stringify(value);
    this.storageProvider().setItem(key, json);
    this.newValue$.next({ key: key, value: value });
  }

  public clearItem(key: string): void {
    this.storageProvider().removeItem(key);
    this.newValue$.next({ key: key, value: null });
  }

  public getItem<T>(key: string): Signal<T | null> {
    return computed(() => {
      const newValueInStorage = this.newValueSignal();

      if (newValueInStorage?.key === key) {
        return newValueInStorage.value as T;
      }

      return this.readItemValue(key);
    });
  }

  public hasItem(key: string): Signal<boolean> {
    return computed<boolean>(() => {
      return !!this.getItem(key)();
    });
  }

  private readItemValue<T>(key: string): T | null {
    const json = this.storageProvider().getItem(key);
    if (!json || !json.length) {
      return null;
    }

    return JSON.parse(json) as T;
  }

  protected abstract storageProvider(): Storage;

  private synchronizeStorageBetweenBrowserTabs(): void {
    fromEvent(window, 'storage')
      .pipe(
        tap((event: Event): void => {
          if (
            event instanceof StorageEvent &&
            event.storageArea === this.storageProvider()
          ) {
            this.newValue$.next({
              key: event.key ?? '',
              value: event.newValue ? JSON.parse(event.newValue) : null,
            });
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
