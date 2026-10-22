import { useRef } from 'react';
import { architectureSteps } from '../../data/portfolio';
import { clearActive, gsap, markActive, prepDraw, revealOnScroll, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';
import { ArchitectureDiagram } from '../visualizations/ArchitectureDiagram';

const MOBILE_LAYERS = [
  { title: 'React Frontend', note: 'UI workflows · state-driven forms' },
  { title: 'REST API Layer', note: 'Spring Security + JWT · OpenAPI contracts' },
  { title: 'Spring Boot / NestJS Services', note: 'Domain-oriented boundaries · Kafka events' },
  { title: 'PostgreSQL / MySQL', note: 'Multi-database · CDC propagation' },
];

export function ArchitectureScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, ({ desktop }) => {
    if (!desktop) {
      revealOnScroll('.arch-mobile li, .arch-steps li');
      return;
    }
    const steps = gsap.utils.toArray<HTMLElement>('.arch-steps li');
    const n = steps.length;
    prepDraw('.arch-draw');
    gsap.set('.arch-g .arch-box, .arch-g .arch-note, .arch-pill, .arch-pill__text, .arch-packet', { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: '.scene__pin',
        start: 'top top',
        end: `+=${n * 55}%`,
        scrub: 0.8,
        pin: true,
        onUpdate: (st) => markActive(steps, Math.min(n - 1, Math.floor(st.progress * n * 0.999))),
      },
    });
    for (let i = 0; i < n; i++) {
      const g = `.arch-g-${i}`;
      tl.to(`${g} .arch-draw`, { strokeDashoffset: 0, duration: 0.45, stagger: 0.1 }, i);
      tl.fromTo(`${g} .arch-box`, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08, immediateRender: false }, i + 0.25);
      tl.to(`${g} .arch-note, ${g} .arch-pill, ${g} .arch-pill__text`, { autoAlpha: 1, duration: 0.25 }, i + 0.45);
    }
    // Packets travel along their connectors once the relevant layer exists.
    tl.fromTo('.arch-packet-0', { autoAlpha: 1, attr: { cy: 88 } }, { attr: { cy: 156 }, duration: 0.6, immediateRender: false }, 1.3);
    tl.fromTo('.arch-packet-1', { autoAlpha: 1, attr: { cy: 380 } }, { attr: { cy: 482 }, duration: 0.6, immediateRender: false }, 3.3);
    tl.fromTo('.arch-packet-2', { autoAlpha: 1, attr: { cx: 754 } }, { attr: { cx: 842 }, duration: 0.6, immediateRender: false }, 4.3);
    tl.to('.arch-packet', { autoAlpha: 0, duration: 0.2 }, 6.2);
    tl.to({}, { duration: 0.4 });
    markActive(steps, 0);
    return () => clearActive(steps);
  });

  return (
    <SceneContainer id="architecture" label="Software architecture" ref={ref} className="architecture">
      <div className="scene__pin">
        <div className="container arch-layout">
          <div className="arch-copy">
            <SectionLabel index="03">Architecture</SectionLabel>
            <h2 className="h2" tabIndex={-1} data-focus-target>
              How the pieces <em>talk to each other.</em>
            </h2>
            <p className="caption-note">
              Illustrative architecture based on my experience — a composite of patterns, not one single deployed system.
            </p>
            <ol className="arch-steps">
              {architectureSteps.map((s, i) => (
                <li key={s.title}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="arch-visual">
            <ArchitectureDiagram />
            <ol className="arch-mobile" aria-label="Architecture layers">
              {MOBILE_LAYERS.map((l) => (
                <li key={l.title}>
                  <strong>{l.title}</strong>
                  <span>{l.note}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
}
