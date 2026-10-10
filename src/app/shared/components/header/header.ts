import { Component, DOCUMENT, HostListener, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageToggle } from '../language-toggle/language-toggle';
import { Logo } from '../logo/logo';

interface NavLink {
  labelKey: string;
  fragment: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe, LanguageToggle, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly document = inject(DOCUMENT);

  protected readonly links: NavLink[] = [
    { labelKey: 'nav.about', fragment: 'about' },
    { labelKey: 'nav.skills', fragment: 'skills' },
    { labelKey: 'nav.projects', fragment: 'projects' },
  ];

  protected readonly menuOpen = signal(false);

  constructor() {
    effect(() => this.document.body.classList.toggle('no-scroll', this.menuOpen()));
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
