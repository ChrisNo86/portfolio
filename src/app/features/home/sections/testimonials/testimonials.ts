import { Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { translatedList } from '../../../../core/i18n/translated-list';
import { Testimonial } from '../../../../core/models/portfolio.models';
import { Icon } from '../../../../shared/components/icon/icon';

interface Slide {
  testimonial: Testimonial;
  /** Position relative to the centre card (… -1, 0, 1 …) including the running slide offset. */
  position: number;
  slot: number;
}

/** Cards rendered on each side of the centre card (one is hidden for the slide-in). */
const SIDE_SLOTS = 2;
const SLIDE_DURATION_MS = 450;

@Component({
  selector: 'app-testimonials',
  imports: [TranslatePipe, Icon],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  protected readonly testimonials = translatedList<Testimonial>('testimonials.items');
  protected readonly activeIndex = signal(0);
  /** -1 / +1 while a slide animation runs, 0 otherwise. */
  private readonly shift = signal(0);
  protected readonly animate = signal(true);
  private sliding = false;

  protected readonly slides = computed<Slide[]>(() => {
    const items = this.testimonials();
    if (items.length === 0) return [];
    const slides: Slide[] = [];
    for (let offset = -SIDE_SLOTS; offset <= SIDE_SLOTS; offset++) {
      const index = this.wrap(this.activeIndex() + offset, items.length);
      slides.push({ testimonial: items[index], position: offset + this.shift(), slot: offset });
    }
    return slides;
  });

  previous(): void {
    this.slide(1);
  }

  next(): void {
    this.slide(-1);
  }

  goTo(index: number): void {
    if (this.sliding) return;
    this.activeIndex.set(this.wrap(index, this.testimonials().length));
  }

  /** Moves the track, then silently re-centres it on the new active card. */
  private slide(direction: 1 | -1): void {
    if (this.sliding || this.testimonials().length === 0) return;
    this.sliding = true;
    this.shift.set(direction);
    setTimeout(() => {
      this.animate.set(false);
      this.activeIndex.update((index) => this.wrap(index - direction, this.testimonials().length));
      this.shift.set(0);
      requestAnimationFrame(() => requestAnimationFrame(() => this.animate.set(true)));
      this.sliding = false;
    }, SLIDE_DURATION_MS);
  }

  private wrap(index: number, length: number): number {
    return ((index % length) + length) % length;
  }
}
