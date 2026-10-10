import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { translatedList } from '../../../../core/i18n/translated-list';

const HIGHLIGHT_ICONS = [
  'assets/icons/icon-location.svg',
  'assets/icons/icon-brain.svg',
  'assets/icons/icon-badge.svg',
];

@Component({
  selector: 'app-about',
  imports: [TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly highlights = translatedList<string>('about.highlights');
  protected readonly icons = HIGHLIGHT_ICONS;
}
