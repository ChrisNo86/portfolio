import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-toggle',
  imports: [TranslatePipe],
  template: `
    <button
      type="button"
      class="toggle"
      [class.toggle--de]="language.current() === 'de'"
      [attr.aria-label]="'nav.switchLanguage' | translate"
      (click)="language.toggle()"
    >
      <span class="toggle__option" [class.is-active]="language.current() === 'en'">EN</span>
      <span class="toggle__option" [class.is-active]="language.current() === 'de'">DE</span>
    </button>
  `,
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  protected readonly language = inject(LanguageService);
}
