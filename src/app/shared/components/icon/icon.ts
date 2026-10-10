import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: '',
  host: {
    'aria-hidden': 'true',
    '[style.--icon-url]': 'url()',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
    '[style.mask-mode]': 'maskMode()',
  },
  styles: `
    :host {
      display: inline-block;
      flex-shrink: 0;
      background-color: currentColor;
      mask: var(--icon-url) center / contain no-repeat;
      -webkit-mask: var(--icon-url) center / contain no-repeat;
      transition: background-color 0.2s;
    }
  `,
})
export class Icon {
  readonly name = input<string>();
  readonly src = input<string>();
  readonly size = input(24);
  readonly maskMode = input<'alpha' | 'luminance'>('alpha');

  protected readonly url = computed(() => `url('${this.src() ?? `assets/icons/${this.name()}.svg`}')`);
}
