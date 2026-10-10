import { Component, computed, input } from '@angular/core';

/**
 * Monochrome SVG icon rendered via CSS mask, so it inherits `color`
 * and can change color on hover like text.
 */
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
  /** File name in assets/icons without extension … */
  readonly name = input<string>();
  /** … or a full path to an SVG file. */
  readonly src = input<string>();
  readonly size = input(24);
  /**
   * 'alpha' (default) for single-colour icons; 'luminance' for icons that contain
   * dark cut-outs (e.g. the "TS" letters), so the dark parts stay transparent.
   */
  readonly maskMode = input<'alpha' | 'luminance'>('alpha');

  protected readonly url = computed(() => `url('${this.src() ?? `assets/icons/${this.name()}.svg`}')`);
}
