const MAX_WAIT_MS = 3000;

/** Marker class of the placeholders rendered while deferred sections load. */
const PLACEHOLDER_SELECTOR = '.section-placeholder';

/**
 * Scrolls to the element with the given id. Waits until it exists and all
 * deferred sections have replaced their placeholders (otherwise the layout
 * would still shift), because the router tries to scroll before that.
 */
export function scrollToFragmentWhenAvailable(document: Document, fragment: string): void {
  const startedAt = performance.now();

  const tryScroll = (): void => {
    const target = document.getElementById(fragment);
    const layoutSettled = !document.querySelector(PLACEHOLDER_SELECTOR);
    if (target && layoutSettled) {
      target.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (performance.now() - startedAt < MAX_WAIT_MS) {
      requestAnimationFrame(tryScroll);
    }
  };

  requestAnimationFrame(tryScroll);
}
