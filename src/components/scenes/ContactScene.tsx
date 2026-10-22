import { useRef } from 'react';
import { ArrowUp, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '../../data/portfolio';
import { gsap, prepDraw, useGsapContext } from '../../hooks/useGsapContext';
import { Button } from '../ui/Button';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';
import { TechGrid } from '../visualizations/TechGrid';
import { scrollToSection } from '../layout/scrollTo';

const HEADLINE = ["Let's build", 'something meaningful.'];

export function ContactScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, () => {
    prepDraw('.tech-grid__line');
    // Brings back the opening scene's visual language: grid, nodes, masked type.
    gsap
      .timeline({ scrollTrigger: { trigger: '.contact__inner', start: 'top 75%', end: 'top 25%', scrub: 0.8 } })
      .to('.tech-grid__line', { strokeDashoffset: 0, stagger: 0.03, duration: 1 }, 0)
      .from('.tech-grid__node', { scale: 0, autoAlpha: 0, transformOrigin: 'center', transformBox: 'fill-box', stagger: 0.03 }, 0.2)
      .from('.contact__headline .mask > span', { yPercent: 105, stagger: 0.12, duration: 0.6 }, 0.1)
      .from('.contact__details > *', { autoAlpha: 0, y: 20, stagger: 0.08, duration: 0.4 }, 0.5);
  });

  return (
    <SceneContainer id="contact" label="Contact" ref={ref} className="contact">
      <TechGrid className="tech-grid--closing" />
      <div className="container contact__inner">
        <SectionLabel index="09">Contact</SectionLabel>
        <h2 className="contact__headline" tabIndex={-1} data-focus-target>
          {HEADLINE.map((l) => (
            <span className="mask" key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h2>
        <div className="contact__details">
          <p className="contact__who">
            <strong>{profile.name}</strong> · {profile.title}
          </p>
          <p className="contact__loc">
            <MapPin size={16} aria-hidden="true" /> {profile.location}
          </p>
          <div className="contact__links">
            <Button href={`mailto:${profile.email}`} icon={Mail} variant="primary">
              {profile.email}
            </Button>
            <Button href={profile.linkedin} icon={Linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
              LinkedIn
            </Button>
            <Button href={profile.github} icon={Github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">
              GitHub
            </Button>
          </div>
          <button className="btn btn--ghost contact__top" onClick={() => scrollToSection('home')}>
            <ArrowUp size={18} aria-hidden="true" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </SceneContainer>
  );
}
