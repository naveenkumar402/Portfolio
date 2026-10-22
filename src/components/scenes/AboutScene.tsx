import { useRef } from 'react';
import { aboutStatements, engineeringThemes, profile } from '../../data/portfolio';
import { gsap, initStages, revealOnScroll, swapStage, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';

export function AboutScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, ({ desktop }) => {
    if (!desktop) {
      revealOnScroll('.about__statement, .about__summary, .about__themes li');
      return;
    }
    const stages = gsap.utils.toArray<HTMLElement>('.about__statement');
    const themes = gsap.utils.toArray<HTMLElement>('.about__themes li');
    initStages(stages);
    gsap.set(themes, { autoAlpha: 0.22, x: 12 });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.scene__pin', start: 'top top', end: '+=320%', scrub: 0.8, pin: true },
    });
    const perTheme = (stages.length - 1) / themes.length;
    themes.forEach((t, i) => tl.to(t, { autoAlpha: 1, x: 0, duration: 0.3 }, 0.4 + i * perTheme));
    stages.forEach((s, i) => {
      if (i === 0) return;
      swapStage(tl, stages[i - 1], s, i);
      tl.from(s.querySelectorAll('.word'), { yPercent: 110, stagger: 0.04, duration: 0.4, ease: 'power2.out' }, i + 0.35);
    });
    tl.to('.about__summary', { autoAlpha: 0.35, duration: 0.5 }, stages.length - 1.2);
    tl.to({}, { duration: 0.6 });
  });

  const splitWords = (text: string) =>
    text.split(' ').map((w, i) => (
      <span className="mask" key={i}>
        <span className="word">{w}&nbsp;</span>
      </span>
    ));

  return (
    <SceneContainer id="about" label="About" ref={ref} className="about">
      <div className="scene__pin">
        <div className="container about__grid">
          <div className="about__main">
            <SectionLabel index="01">About</SectionLabel>
            <h2 className="visually-hidden" tabIndex={-1} data-focus-target>
              About Naveenkumar
            </h2>
            <p className="about__summary">{profile.summary}</p>
            <div className="about__stack">
              {aboutStatements.map((s) => (
                <p className="about__statement" key={s.kicker}>
                  <span className="about__kicker">{s.kicker}</span>
                  <span className="about__big">{splitWords(s.text)}</span>
                </p>
              ))}
              <blockquote className="about__statement about__philosophy">
                <span className="about__kicker">Engineering philosophy</span>
                <span className="about__big about__big--quote">{splitWords(profile.philosophy)}</span>
              </blockquote>
            </div>
          </div>
          <aside className="about__aside" aria-label="Engineering themes">
            <p className="eyebrow">Engineering themes</p>
            <ol className="about__themes">
              {engineeringThemes.map((t, i) => (
                <li key={t}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </SceneContainer>
  );
}
