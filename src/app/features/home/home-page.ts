import { Component, DOCUMENT, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { scrollToFragmentWhenAvailable } from '../../core/utils/scroll-to-fragment';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Projects } from './sections/projects/projects';
import { Testimonials } from './sections/testimonials/testimonials';
import { Contact } from './sections/contact/contact';

/**
 * Above-the-fold content (hero, about) is part of the home chunk.
 * All following sections are split into their own lazy chunks and loaded
 * as soon as the browser is idle, so anchor links (#skills, #projects,
 * #contact) still work right after the first render.
 */
@Component({
  selector: 'app-home-page',
  imports: [Hero, About, Skills, Projects, Testimonials, Contact],
  template: `
    <app-hero />
    <app-about />
    @defer (on idle) {
      <app-skills />
    } @placeholder {
      <div class="section-placeholder"></div>
    }
    @defer (on idle) {
      <app-projects />
    } @placeholder {
      <div class="section-placeholder"></div>
    }
    @defer (on idle) {
      <app-testimonials />
    } @placeholder {
      <div class="section-placeholder"></div>
    }
    @defer (on idle) {
      <app-contact />
    } @placeholder {
      <div class="section-placeholder"></div>
    }
  `,
  styles: `
    .section-placeholder {
      min-height: 100vh;
    }
  `,
})
export class HomePage {
  constructor() {
    const document = inject(DOCUMENT);
    inject(ActivatedRoute)
      .fragment.pipe(
        filter((fragment): fragment is string => !!fragment),
        takeUntilDestroyed(),
      )
      .subscribe((fragment) => scrollToFragmentWhenAvailable(document, fragment));
  }
}
