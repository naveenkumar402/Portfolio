import { useRef } from 'react';
import { gsap, revealOnScroll, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';
import { EngineeringTimeline } from '../visualizations/EngineeringTimeline';

export function WorkflowScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, ({ desktop }, root) => {
    if (!desktop) {
      revealOnScroll('.eng-step');
      return;
    }
    const track = root.querySelector<HTMLElement>('.eng-track')!;
    const distance = () => Math.max(0, track.offsetWidth - root.clientWidth);
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.scene__pin',
        start: 'top top',
        end: () => `+=${distance() + window.innerHeight * 0.5}`,
        scrub: 0.8,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
    tl.to(track, { x: () => -distance(), duration: 1 }, 0)
      .fromTo('.eng__rail-fill', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
      .from('.eng-step', { autoAlpha: 0.25, stagger: 0.08, duration: 0.2 }, 0)
      .to({}, { duration: 0.15 });
  });

  return (
    <SceneContainer id="workflow" label="Engineering workflow" ref={ref} className="workflow">
      <div className="scene__pin workflow__pin">
        <div className="container">
          <SectionLabel index="06">Engineering workflow</SectionLabel>
          <h2 className="h2" tabIndex={-1} data-focus-target>
            The full life cycle, <em>with AIDLC inside it.</em>
          </h2>
          <p className="lede workflow__lede">
            AI assists engineering activities. Specifications, automated verification, and human review maintain quality.
          </p>
        </div>
        <EngineeringTimeline />
      </div>
    </SceneContainer>
  );
}
