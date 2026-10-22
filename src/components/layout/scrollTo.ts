import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/** Scrolls to a scene's outer section (stable even while its inner content is pinned). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY;
  gsap.killTweensOf(window);
  if (reduce) window.scrollTo(0, top);
  else gsap.to(window, { scrollTo: { y: top, autoKill: true }, duration: 1.2, ease: 'power3.inOut' });
  history.replaceState(null, '', `#${id}`);
  el.querySelector<HTMLElement>('[data-focus-target]')?.focus({ preventScroll: true });
}
