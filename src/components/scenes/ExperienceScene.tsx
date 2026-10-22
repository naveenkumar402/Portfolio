import { useRef } from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import { experience } from '../../data/portfolio';
import { gsap, revealOnScroll, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';

export function ExperienceScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, ({ desktop }) => {
    gsap.fromTo(
      '.xp__line-fill',
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.xp__list', start: 'top 70%', end: 'bottom 60%', scrub: true } },
    );
    if (desktop) {
      gsap.from('.xp__role', {
        autoAlpha: 0,
        y: 40,
        scrollTrigger: { trigger: '.xp__role', start: 'top 85%', end: 'top 45%', scrub: 0.6 },
      });
    }
    revealOnScroll('.xp__item', { y: 30 });
  });

  return (
    <SceneContainer id="experience" label="Professional experience" ref={ref} className="xp">
      <div className="container xp__layout">
        <div className="xp__intro">
          <SectionLabel index="07">Experience</SectionLabel>
          <div className="xp__role">
            <h2 className="h2" tabIndex={-1} data-focus-target>
              {experience.role}
            </h2>
            <p className="xp__meta">
              <span>
                <Briefcase size={16} aria-hidden="true" /> {experience.company}
              </span>
              <span>
                <MapPin size={16} aria-hidden="true" /> {experience.location}
              </span>
              <span className="mono">{experience.period}</span>
            </p>
            <ol className="xp__levels" aria-label="Role progression">
              {experience.levels.map((l, i) => (
                <li key={l.level} className={i === 0 ? 'is-current' : undefined}>
                  <span className="mono">{l.level}</span>
                  <strong>{l.title}</strong>
                  <span className="xp__level-period">{l.period}</span>
                  <span className="xp__level-period">Project: {l.project}</span>
                  <ul className="xp__level-points">
                    {l.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <p className="lede">
              Project: <strong>{experience.project}</strong>
            </p>
          </div>
        </div>
        <ol className="xp__list">
          <span className="xp__line" aria-hidden="true">
            <span className="xp__line-fill" />
          </span>
          {experience.highlights.map((h) => (
            <li className="xp__item" key={h.title}>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </SceneContainer>
  );
}
