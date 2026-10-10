import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { translatedList } from '../../../../core/i18n/translated-list';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly config = SITE_CONFIG;
  protected readonly marqueeCopies = [0, 1];
  protected readonly bannerItems = translatedList<string>('hero.banner');
}
