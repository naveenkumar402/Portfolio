import { useEffect } from 'react';
import { scheduleRefresh } from './hooks/useGsapContext';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Footer } from './components/layout/Footer';
import { HeroScene } from './components/scenes/HeroScene';
import { AboutScene } from './components/scenes/AboutScene';
import { SkillsScene } from './components/scenes/SkillsScene';
import { ArchitectureScene } from './components/scenes/ArchitectureScene';
import { ProjectScene } from './components/scenes/ProjectScene';
import { AIDLCScene } from './components/scenes/AIDLCScene';
import { WorkflowScene } from './components/scenes/WorkflowScene';
import { ExperienceScene } from './components/scenes/ExperienceScene';
import { EducationScene } from './components/scenes/EducationScene';
import { ContactScene } from './components/scenes/ContactScene';
import { scrollToSection } from './components/layout/scrollTo';

export default function App() {
  useEffect(() => {
    // Web fonts change text metrics; recompute pin and trigger positions once they are ready.
    document.fonts?.ready.then(() => scheduleRefresh(0));
    const hash = window.location.hash.slice(1);
    if (hash) requestAnimationFrame(() => scrollToSection(hash));

    // Content height can change after triggers are measured (tab panels, reveals, fonts).
    // Ignore changes caused by ScrollTrigger's own pin spacers to avoid refresh loops.
    let last = 0;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - last) > 2) {
        last = h;
        scheduleRefresh(200);
      }
    });
    ro.observe(document.querySelector('main')!);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroScene />
        <AboutScene />
        <SkillsScene />
        <ArchitectureScene />
        <ProjectScene />
        <AIDLCScene />
        <WorkflowScene />
        <ExperienceScene />
        <EducationScene />
        <ContactScene />
      </main>
      <Footer />
    </>
  );
}
