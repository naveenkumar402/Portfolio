import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { profile } from '../../data/portfolio';
import { gsap, prepDraw, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { TechGrid } from '../visualizations/TechGrid';
import { scrollToSection } from '../layout/scrollTo';

const NAME_LINES = ['NAVEENKUMAR'];

export function HeroScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, ({ desktop }) => {
    prepDraw('.tech-grid__line');
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from('.hero__veil', { autoAlpha: 1, duration: 0.6 })
      .from('.hero__char', { yPercent: 115, duration: 1.1, stagger: 0.035 }, 0.2)
      .to('.tech-grid__line', { strokeDashoffset: 0, duration: 1.8, stagger: 0.05, ease: 'power2.inOut' }, 0.4)
      .from('.tech-grid__node', { scale: 0, autoAlpha: 0, duration: 0.6, stagger: 0.05 }, 0.7)
      .from('.hero__title', { autoAlpha: 0, y: 24, duration: 0.8 }, 0.9)
      .from('.hero__tagline .mask > span', { yPercent: 105, duration: 0.9 }, 1.05)
      .from('.hero__tech li', { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.07 }, 1.3)
      .from('.hero__scroll', { autoAlpha: 0, y: -10, duration: 0.6 }, 1.8);

    if (!desktop) return;
    // Scroll hands the hero over to the About scene: content recedes, grid opens up.
    gsap
      .timeline({
        scrollTrigger: { trigger: '.scene__pin', start: 'top top', end: '+=90%', scrub: 0.8, pin: true },
      })
      .to('.hero__content', { scale: 0.86, yPercent: -10, autoAlpha: 0, ease: 'power1.in' }, 0)
      .to('.hero__tech', { letterSpacing: '0.4em', autoAlpha: 0 }, 0)
      .to('.tech-grid', { scale: 1.35, autoAlpha: 0.35 }, 0)
      .to('.hero__scroll', { autoAlpha: 0, duration: 0.2 }, 0);
  });

  return (
    <SceneContainer id="home" label="Introduction" ref={ref} className="hero">
      <div className="scene__pin hero__pin">
        <TechGrid />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__content container">
          <h1 className="hero__name" aria-label="Naveenkumar" tabIndex={-1} data-focus-target>
            {NAME_LINES.map((line) => (
              <span className="mask hero__line" key={line} aria-hidden="true">
                {line.split('').map((ch, i) => (
                  <span className="hero__char" key={i}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero__title">{profile.title}</p>
          <p className="hero__tagline">
            <span className="mask">
              <span>{profile.tagline}</span>
            </span>
          </p>
          <ul className="hero__tech" aria-label="Core technologies">
            {profile.heroTech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <button className="hero__scroll" onClick={() => scrollToSection('about')} aria-label="Scroll to About section">
          <span>Scroll</span>
          <ChevronDown size={18} aria-hidden="true" />
        </button>
      </div>
    </SceneContainer>
  );
}
