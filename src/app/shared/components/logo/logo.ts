import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <svg class="logo__mark" viewBox="0 0 35 48" aria-hidden="true">
      <rect width="35" height="9" />
      <rect width="9" height="48" />
      <rect x="26" width="9" height="48" />
      <polygon points="9,9 17,9 26,39 26,48 18,48 9,18" />
    </svg>
    @if (!markOnly()) {
      <span class="logo__name">Chris<br />Noack</span>
    }
  `,
  styleUrl: './logo.scss',
})
export class Logo {
  readonly markOnly = input(false);
}
