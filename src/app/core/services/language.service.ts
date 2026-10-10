import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../models/portfolio.models';

const STORAGE_KEY = 'portfolio-language';
const SUPPORTED: readonly Language[] = ['en', 'de'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly current = signal<Language>(this.detectInitialLanguage());

  constructor() {
    this.apply(this.current());
  }

  setLanguage(language: Language): void {
    this.current.set(language);
    this.apply(language);
    this.persist(language);
  }

  toggle(): void {
    this.setLanguage(this.current() === 'en' ? 'de' : 'en');
  }

  private apply(language: Language): void {
    this.translate.use(language);
    this.document.documentElement.lang = language;
  }

  private detectInitialLanguage(): Language {
    const stored = this.readStored();
    if (stored) return stored;
    const browser = this.document.defaultView?.navigator.language.slice(0, 2);
    return browser === 'de' ? 'de' : 'en';
  }

  private readStored(): Language | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(value as Language) ? (value as Language) : null;
    } catch {
      return null;
    }
  }

  private persist(language: Language): void {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      return;
    }
  }
}
