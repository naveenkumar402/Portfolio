import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SceneConditions {
  desktop: boolean;
  mobile: boolean;
  reduce: boolean;
}

/**
 * Runs scene animations inside a scoped gsap.matchMedia context.
 * - Reduced motion: no animation is created; content stays in its static, readable layout.
 * - Adds `motion-desktop` / `motion-mobile` classes to the scope so CSS switches to
 *   layered (pinned) layouts only while animations are actually running.
 * - Everything is reverted on unmount, which keeps React Strict Mode double-invocation safe.
 */
export function useGsapContext(
  scope: RefObject<HTMLElement>,
  setup: (conditions: SceneConditions, root: HTMLElement) => void | (() => void),
) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add(
      {
        desktop: '(min-width: 900px)',
        mobile: '(max-width: 899.98px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const c = ctx.conditions as unknown as SceneConditions;
        if (c.reduce) return;
        const cls = c.desktop ? 'motion-desktop' : 'motion-mobile';
        root.classList.add(cls);
        const cleanup = setup(c, root);
        return () => {
          root.classList.remove(cls);
          if (typeof cleanup === 'function') cleanup();
        };
      },
    );
    scheduleRefresh();
    return () => {
      mm.revert();
      scheduleRefresh();
    };
    // setup is intentionally captured once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

let refreshTimer = 0;
/**
 * Re-sorts triggers by page position and recalculates pins. Scenes can mount out of order
 * (hot reload, late layout changes); without this, pins can overlap.
 */
export function scheduleRefresh(delay = 120) {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, delay);
}

/** Scroll-linked fade-up for individual elements (used on small screens). */
export function revealOnScroll(targets: gsap.TweenTarget, opts: { y?: number } = {}) {
  gsap.utils.toArray<HTMLElement>(targets).forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: opts.y ?? 24,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
    });
  });
}

/** Prepares SVG strokes for drawing (dashoffset = length → 0). */
export function prepDraw(targets: gsap.TweenTarget) {
  gsap.utils.toArray<SVGGeometryElement>(targets).forEach((el) => {
    const len = el.getTotalLength() + 1;
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
  });
}

/** Hides every layered stage except the first. */
export function initStages(stages: Element[]) {
  gsap.set(stages.slice(1), { autoAlpha: 0 });
}

/** Cross-fades between two layered stages at a timeline position. */
export function swapStage(tl: gsap.core.Timeline, from: Element | undefined, to: Element, at: number) {
  if (from) tl.to(from, { autoAlpha: 0, y: -24, duration: 0.35, ease: 'power2.in' }, at);
  tl.fromTo(to, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', immediateRender: false }, at + (from ? 0.3 : 0));
}

/** Marks the list item at `index` active (and earlier ones done) — used from ScrollTrigger callbacks. */
export function markActive(items: Element[], index: number) {
  items.forEach((el, i) => {
    el.classList.toggle('is-active', i === index);
    el.classList.toggle('is-done', i < index);
    if (i === index) el.setAttribute('aria-current', 'step');
    else el.removeAttribute('aria-current');
  });
}

/** Clears classes added by markActive (for matchMedia cleanup). */
export function clearActive(items: Element[]) {
  items.forEach((el) => {
    el.classList.remove('is-active', 'is-done');
    el.removeAttribute('aria-current');
  });
}

export { gsap, ScrollTrigger };
