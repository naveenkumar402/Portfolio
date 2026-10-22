import { useRef } from 'react';
import { ArrowDown, Database, GitBranch, LayoutPanelTop, ShieldCheck } from 'lucide-react';
import { erpProject } from '../../data/portfolio';
import { clearActive, gsap, initStages, markActive, revealOnScroll, swapStage, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';
import { BoqPipeline } from '../visualizations/BoqPipeline';

const STAGES = ['Platform', 'Decomposition', 'Services', 'BOQ ingestion', 'Security & sync', 'Delivery'];

const PILLARS = [
  { icon: ShieldCheck, title: 'API security', items: ['Spring Security', 'JWT', 'Role-based + company-level multi-tenant access'] },
  { icon: Database, title: 'Data synchronization', items: ['Apache Kafka events', 'CDC-based propagation', 'Multi-database datasource routing'] },
  { icon: LayoutPanelTop, title: 'Frontend integration', items: ['React.js workflows', 'State-driven forms', 'Secure API integration'] },
];

const PIPELINE = ['Commit', 'Build', 'Test', 'Deploy'];

export function ProjectScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, ({ desktop }) => {
    if (!desktop) {
      revealOnScroll('.erp__stage, .erp__work li');
      return;
    }
    const stages = gsap.utils.toArray<HTMLElement>('.erp__stage');
    const dots = gsap.utils.toArray<HTMLElement>('.erp__progress li');
    const n = stages.length;
    initStages(stages);

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: '.erp__pin',
        start: 'top top',
        end: `+=${n * 65}%`,
        scrub: 0.8,
        pin: true,
        onUpdate: (st) => markActive(dots, Math.min(n - 1, Math.floor(st.progress * n * 0.999))),
      },
    });
    // Stage 1 → title compresses before giving way to the diagram.
    tl.to('.erp__title', { scale: 0.7, transformOrigin: 'left center', autoAlpha: 0.6, duration: 0.6 }, 0.3);
    // Stage 2 → monolith splits into domain services (Strangler Fig).
    swapStage(tl, stages[0], stages[1], 1);
    tl.from('.erp__mono', { scaleX: 1.2, duration: 0.3 }, 1.3)
      .to('.erp__mono', { autoAlpha: 0.15, scale: 0.8, duration: 0.35 }, 1.7)
      .from('.erp__svc', { autoAlpha: 0, x: (i) => (i % 2 ? 60 : -60), y: (i) => (i < 2 ? -30 : 30), stagger: 0.08, duration: 0.4 }, 1.75)
      .from('.erp__facade', { autoAlpha: 0, duration: 0.3 }, 1.6);
    // Stage 3 → service responsibilities.
    swapStage(tl, stages[1], stages[2], 2.2);
    tl.from('.erp__svc-list li', { autoAlpha: 0, x: -20, stagger: 0.1, duration: 0.3 }, 2.5);
    // Stage 4 → BOQ ingestion.
    swapStage(tl, stages[2], stages[3], 3.3);
    tl.from('.boq__sheet', { autoAlpha: 0, rotateX: 25, y: 30, duration: 0.4 }, 3.6)
      .from('.boq__step', { autoAlpha: 0, x: -24, stagger: 0.12, duration: 0.3 }, 3.8);
    // Stage 5 → security, sync, frontend.
    swapStage(tl, stages[3], stages[4], 4.6);
    tl.from('.erp__pillar', { autoAlpha: 0, y: 40, stagger: 0.12, duration: 0.35 }, 4.9);
    // Stage 6 → delivery and hand-off to AIDLC.
    swapStage(tl, stages[4], stages[5], 5.8);
    tl.from('.erp__pipe li', { autoAlpha: 0, scale: 0.8, stagger: 0.1, duration: 0.3 }, 6.1)
      .from('.erp__handoff', { autoAlpha: 0, y: 20, duration: 0.3 }, 6.6)
      .to({}, { duration: 0.6 });
    revealOnScroll('.erp__work li', { y: 16 });
    markActive(dots, 0);
    return () => clearActive(dots);
  });

  return (
    <SceneContainer id="project" label="Featured project: Construction ERP Platform" ref={ref} className="erp">
      <div className="scene__pin erp__pin">
        <div className="container erp__layout">
          <header className="erp__head">
            <SectionLabel index="04">Featured project</SectionLabel>
            <ol className="erp__progress" aria-label="Project story stages">
              {STAGES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </header>
          <div className="erp__stages">
            <div className="erp__stage">
              <p className="eyebrow">{erpProject.employer}</p>
              <h2 className="erp__title" tabIndex={-1} data-focus-target>
                Construction
                <br />
                <em>ERP Platform</em>
              </h2>
              <p className="lede">
                Modernizing construction project and tender workflows with domain-driven microservices, event-driven
                communication, and secure APIs.
              </p>
            </div>

            <div className="erp__stage erp__decomp">
              <h3 className="h3">Strangler Fig decomposition</h3>
              <p className="lede">Monolithic workflows were incrementally decomposed into loosely coupled domain services.</p>
              <div className="erp__diagram" aria-hidden="true">
                <div className="erp__facade">routing facade</div>
                <div className="erp__mono">Monolithic workflow</div>
                <div className="erp__svcs">
                  {erpProject.services.map((s) => (
                    <div className="erp__svc" key={s.name}>
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="erp__stage">
              <h3 className="h3">Domain-oriented microservices</h3>
              <ul className="erp__svc-list">
                {erpProject.services.map((s) => (
                  <li key={s.name}>
                    <strong>{s.name}</strong>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ul>
              <p className="caption-note">Spring Boot / Spring MVC / Hibernate services, extended with NestJS + TypeScript services.</p>
            </div>

            <div className="erp__stage">
              <h3 className="h3">Excel-driven BOQ ingestion</h3>
              <p className="lede">Large unstructured Excel datasets become structured, validated, resource-level entities.</p>
              <BoqPipeline />
              <p className="caption-note">Conceptual workflow illustration.</p>
            </div>

            <div className="erp__stage">
              <h3 className="h3">Security, synchronization, integration</h3>
              <div className="erp__pillars">
                {PILLARS.map(({ icon: Icon, title, items }) => (
                  <div className="erp__pillar" key={title}>
                    <Icon size={22} aria-hidden="true" />
                    <h4>{title}</h4>
                    <ul>
                      {items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="erp__stage">
              <h3 className="h3">Engineering delivery</h3>
              <p className="lede">CI/CD pipelines with GitHub Actions automate build, test, and deployment.</p>
              <ol className="erp__pipe" aria-label="Delivery pipeline">
                {PIPELINE.map((p) => (
                  <li key={p}>
                    <GitBranch size={16} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ol>
              <p className="erp__handoff">
                <ArrowDown size={18} aria-hidden="true" />
                AI-assisted development, review, and testing — governed by the AIDLC workflow.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container erp__work">
        <h3 className="h3">What I worked on</h3>
        <ul>
          {erpProject.work.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
    </SceneContainer>
  );
}
