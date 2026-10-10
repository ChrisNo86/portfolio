const MAX_WAIT_MS = 3000;

const PLACEHOLDER_SELECTOR = '.section-placeholder';

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
