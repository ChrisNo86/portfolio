import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header />
    <main class="main">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main {
      flex: 1;
    }
  `,
})
export class App {
  private readonly language = inject(LanguageService);

  constructor() {
    const document = inject(DOCUMENT);
    inject(ViewportScroller).setOffset(() => {
      const header = document.querySelector('app-header .header');
      return [0, (header?.getBoundingClientRect().height ?? 0) + 16];
    });
  }
}
