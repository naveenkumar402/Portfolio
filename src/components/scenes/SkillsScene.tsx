import { useRef } from 'react';
import { skillGroups } from '../../data/portfolio';
import { clearActive, gsap, initStages, markActive, prepDraw, revealOnScroll, swapStage, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';
import { SkillsNetwork } from '../visualizations/SkillsNetwork';

export function SkillsScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, ({ desktop }) => {
    if (!desktop) {
      revealOnScroll('.skills__group');
      return;
    }
    const panels = gsap.utils.toArray<HTMLElement>('.skills__group');
    const tabs = gsap.utils.toArray<HTMLElement>('.skills__index li');
    initStages(panels);
    prepDraw('.skills-net__spoke, .skills-net__link');
    gsap.set('.skills-net__node, .skills-net__link-label', { autoAlpha: 0 });
    gsap.set('.skills-net__node', { scale: 0.4, transformOrigin: 'center', transformBox: 'fill-box' });

    const n = panels.length;
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: '.scene__pin',
        start: 'top top',
        end: `+=${n * 70}%`,
        scrub: 0.8,
        pin: true,
        onUpdate: (st) => markActive(tabs, Math.min(n - 1, Math.floor(st.progress * n * 0.999))),
      },
    });
    tl.from('.skills-net__core', { scale: 0.6, autoAlpha: 0, transformOrigin: 'center', transformBox: 'fill-box', duration: 0.4 }, 0);
    panels.forEach((panel, i) => {
      const at = i === 0 ? 0.1 : i;
      tl.to(`.sn-spoke-${i}`, { strokeDashoffset: 0, duration: 0.35 }, at);
      tl.to(`.sn-node-${i}`, { autoAlpha: 1, scale: 1, duration: 0.3 }, at + 0.2);
      if (i > 0) {
        tl.to(`.sn-link-${i} .skills-net__link`, { strokeDashoffset: 0, duration: 0.35 }, at + 0.3);
        tl.to(`.sn-link-${i} .skills-net__link-label`, { autoAlpha: 1, duration: 0.2 }, at + 0.5);
        tl.to(`.sn-node-${i - 1} .skills-net__ring`, { opacity: 0.35, duration: 0.2 }, at + 0.2);
        swapStage(tl, panels[i - 1], panel, at);
      }
      tl.from(panel.querySelectorAll('li'), { autoAlpha: 0, y: 10, stagger: 0.03, duration: 0.2 }, at + 0.4);
    });
    tl.to({}, { duration: 0.5 });
    markActive(tabs, 0);
    return () => clearActive(tabs);
  });

  return (
    <SceneContainer id="skills" label="Technical skills" ref={ref} className="skills">
      <div className="scene__pin">
        <div className="container skills__grid">
          <header className="skills__header">
            <SectionLabel index="02">Skills</SectionLabel>
            <h2 className="h2" tabIndex={-1} data-focus-target>
              A connected stack, <em>not a checklist.</em>
            </h2>
            <ol className="skills__index" aria-hidden="true">
              {skillGroups.map((g) => (
                <li key={g.id}>{g.short}</li>
              ))}
            </ol>
          </header>
          <div className="skills__visual">
            <SkillsNetwork />
          </div>
          <div className="skills__panels">
            {skillGroups.map((g, i) => (
              <section className="skills__group" key={g.id} aria-labelledby={`sg-${g.id}`}>
                <p className="mono skills__count">
                  {String(i + 1).padStart(2, '0')} / {String(skillGroups.length).padStart(2, '0')}
                </p>
                <h3 id={`sg-${g.id}`} className="h3">
                  {g.title}
                </h3>
                <ul className="chips">
                  {g.items.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </SceneContainer>
  );
}
