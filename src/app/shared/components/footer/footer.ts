import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe, Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly config = SITE_CONFIG;
  protected readonly year = new Date().getFullYear();
}
