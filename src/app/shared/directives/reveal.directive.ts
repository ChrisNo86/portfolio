import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

type RevealDirection = 'up' | 'left' | 'right';

@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.reveal--left]': "appReveal() === 'left'",
    '[class.reveal--right]': "appReveal() === 'right'",
    '[style.transition-delay.ms]': 'delay()',
  },
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  readonly appReveal = input<RevealDirection | ''>('up');
  readonly delay = input(0);

  ngOnInit(): void {
    const element = this.element.nativeElement;
    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible');
      return;
    }
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add('is-visible');
        this.observer?.disconnect();
      },
      { threshold: 0.15 },
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
