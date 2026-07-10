import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageStoreService {

  private readonly platformId = inject(PLATFORM_ID);

  public setData<T>(key: string, value: T): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  public getData<T>(key: string): T | null {
    // Если мы на сервере, LocalStorage недоступен — возвращаем null
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    
    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.error('Ошибка парсинга LocalStorage', error);
      return null;
    }
  }
}