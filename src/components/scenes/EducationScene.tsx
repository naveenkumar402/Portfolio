import { useRef } from 'react';
import { Award } from 'lucide-react';
import { certification, education } from '../../data/portfolio';
import { gsap, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';

export function EducationScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, () => {
    gsap.utils.toArray<HTMLElement>('.edu__row, .edu__cert').forEach((row) => {
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none reverse' } })
        .from(row.querySelectorAll('.mask > span'), { yPercent: 105, duration: 0.7, stagger: 0.08, ease: 'power3.out' })
        .from(row.querySelectorAll('.edu__fade'), { autoAlpha: 0, duration: 0.5 }, 0.2);
    });
  });

  return (
    <SceneContainer id="education" label="Education and certification" ref={ref} className="edu">
      <div className="container">
        <SectionLabel index="08">Education & certification</SectionLabel>
        <h2 className="visually-hidden">Education and certification</h2>
        <ol className="edu__list">
          {education.map((e) => (
            <li className="edu__row" key={e.title}>
              <span className="mask edu__score">
                <span>{e.score}</span>
              </span>
              <div>
                <h3 className="mask">
                  <span>{e.title}</span>
                </h3>
                <p className="edu__fade">{e.school}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="edu__cert">
          <Award size={22} aria-hidden="true" className="edu__fade" />
          <div>
            <p className="eyebrow edu__fade">Certification</p>
            <h3 className="mask">
              <span>{certification.title}</span>
            </h3>
            <p className="edu__fade">{certification.issuer}</p>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
}
