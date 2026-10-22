import { useRef } from 'react';
import { Bot, Check, CircleHelp, FileText, GitMerge, PackageCheck, RotateCcw, UserCheck, X } from 'lucide-react';
import { agentInputs, aidlcStages, qualityGates, specSections, testCoverage } from '../../data/aidlc';
import { clearActive, gsap, initStages, prepDraw, revealOnScroll, swapStage, useGsapContext } from '../../hooks/useGsapContext';
import { SceneContainer } from '../ui/SceneContainer';
import { SectionLabel } from '../ui/SectionLabel';
import { AIDLCWorkflow } from '../visualizations/AIDLCWorkflow';
import { RequirementTraceability } from '../visualizations/RequirementTraceability';
import { AidlcLoginExample } from './AidlcLoginExample';

const DISCOVERY = ['Expected behavior', 'Business rules', 'Dependencies', 'Edge cases'];

function StageHeader({ i }: { i: number }) {
  const s = aidlcStages[i];
  return (
    <header className="aidlc-stage__head">
      <span className="mono aidlc-stage__index">Stage {s.index}</span>
      <h3 className="h3">{s.title}</h3>
      <p>{s.text}</p>
    </header>
  );
}

function StageVisuals() {
  return (
    <>
      {/* 01 Requirements */}
      <article className="aidlc-stage">
        <StageHeader i={0} />
        <div className="disc" aria-hidden="true">
          <span className="disc__core" />
          {DISCOVERY.map((d, i) => (
            <span className={`disc__item disc__item--${i}`} key={d}>
              {d}
            </span>
          ))}
        </div>
      </article>

      {/* 02 Spec generation */}
      <article className="aidlc-stage">
        <StageHeader i={1} />
        <div className="md-doc">
          <div className="md-doc__bar">
            <FileText size={14} aria-hidden="true" />
            <span className="mono">feature-spec.md</span>
            <span className="tag tag--draft">AI draft · not yet approved</span>
          </div>
          <ul className="md-doc__body">
            {specSections.map((s, i) => (
              <li key={s} className="md-doc__line">
                <span className="mono md-doc__hash">##</span> {s}
                <span className="md-doc__ph" style={{ width: `${30 + ((i * 37) % 45)}%` }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </article>

      {/* 03 Human review */}
      <article className="aidlc-stage">
        <StageHeader i={2} />
        <div className="gate">
          <div className="gate__doc">
            <FileText size={18} aria-hidden="true" />
            <span>Draft spec</span>
          </div>
          <svg className="gate__lines" viewBox="0 0 400 200" aria-hidden="true">
            <path className="gate-draw" d="M10 100H150" />
            <path className="gate-draw gate__ok" d="M250 100C300 100 300 40 390 40" />
            <path className="gate-draw gate__no" d="M250 100C300 100 300 160 390 160" />
          </svg>
          <div className="gate__diamond">
            <UserCheck size={20} aria-hidden="true" />
            <span>Human review</span>
          </div>
          <div className="gate__out gate__out--ok">
            <Check size={16} aria-hidden="true" /> Approved → Implementation
          </div>
          <div className="gate__out gate__out--no">
            <RotateCcw size={16} aria-hidden="true" /> Changes required → Refine specification
          </div>
        </div>
        <p className="aidlc-stage__note">
          <span className="tag tag--draft">AI draft</span> becomes <span className="tag tag--human">Human-approved</span> only through
          review — AI approval never replaces it.
        </p>
      </article>

      {/* 04 Implementation */}
      <article className="aidlc-stage">
        <StageHeader i={3} />
        <div className="agent">
          <ul className="agent__inputs">
            {agentInputs.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <div className="agent__core">
            <Bot size={22} aria-hidden="true" />
            <strong>AI coding agent</strong>
            <span>implements the approved spec</span>
          </div>
          <div className="agent__ask">
            <CircleHelp size={16} aria-hidden="true" />
            <span>Ambiguous or missing requirement? Stop and ask for clarification.</span>
          </div>
        </div>
      </article>

      {/* 05 Tests */}
      <article className="aidlc-stage">
        <StageHeader i={4} />
        <RequirementTraceability />
        <ul className="chips tests-cov">
          {testCoverage.map((t) => (
            <li className="chip chip--test" key={t}>
              <Check size={13} aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>
      </article>

      {/* 06 Quality gates */}
      <article className="aidlc-stage">
        <StageHeader i={5} />
        <ol className="qgates">
          {qualityGates.map((g, i) => (
            <li className="qgate" key={g}>
              <span className="qgate__icon">{i === qualityGates.length - 1 ? <GitMerge size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}</span>
              <span className="qgate__label">{g}</span>
              <span className="qgate__status mono">{i === 0 ? 'ready' : i >= 5 ? 'human' : 'pass'}</span>
            </li>
          ))}
        </ol>
        <p className="qgates__fail">
          <X size={16} aria-hidden="true" /> Failed check → back to implementation, or to specification refinement when the
          requirement itself is the cause.
        </p>
        <p className="caption-note">An engineering approach — not a claim that every gate is deployed in current projects.</p>
      </article>

      {/* 07 Delivery */}
      <article className="aidlc-stage">
        <StageHeader i={6} />
        <div className="converge" aria-hidden="true">
          <span className="converge__in">Approved specification</span>
          <span className="converge__in">Implementation</span>
          <span className="converge__in">Passing validation</span>
          <span className="converge__out">
            <PackageCheck size={18} /> Verified delivery
          </span>
        </div>
        <RequirementTraceability compact />
      </article>
    </>
  );
}

export function AIDLCScene() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(ref, ({ desktop }) => {
    if (!desktop) {
      revealOnScroll('.aidlc-stage, .login-ex');
      return;
    }
    const stages = gsap.utils.toArray<HTMLElement>('.aidlc-stage');
    const nodes = gsap.utils.toArray<HTMLElement>('.aidlc-proc__nodes li');
    const loops = gsap.utils.toArray<HTMLElement>('.aidlc-proc__loops li');
    const n = stages.length;
    initStages(stages);
    prepDraw('.gate-draw');

    let current = -1;
    const setStage = (idx: number) => {
      if (idx === current) return;
      current = idx;
      const st = aidlcStages[idx];
      const first = Math.min(...st.nodes);
      nodes.forEach((el, j) => {
        el.classList.toggle('is-active', st.nodes.includes(j));
        el.classList.toggle('is-done', j < first);
        if (st.nodes.includes(j)) el.setAttribute('aria-current', 'step');
        else el.removeAttribute('aria-current');
      });
      loops.forEach((el, j) => el.classList.toggle('is-active', st.loops.includes(j)));
    };

    const U = 1.4; // timeline units per stage
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: '.aidlc__pin',
        start: 'top top',
        end: `+=${n * 80}%`,
        scrub: 0.8,
        pin: true,
        onUpdate: (st) => setStage(Math.min(n - 1, Math.floor(st.progress * n * 0.999))),
      },
    });
    tl.fromTo('.aidlc-proc__fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: n * U }, 0);

    // 01 — discovery items emerge from a central point
    tl.from('.disc__item', { autoAlpha: 0, scale: 0.4, x: 0, stagger: 0.12, duration: 0.4 }, 0.15);
    // 02 — Markdown spec lines appear progressively
    swapStage(tl, stages[0], stages[1], U);
    tl.from('.md-doc__line', { autoAlpha: 0, x: -16, stagger: 0.08, duration: 0.2 }, U + 0.35);
    // 03 — review gate with approve / refine branches
    swapStage(tl, stages[1], stages[2], 2 * U);
    tl.to('.gate-draw', { strokeDashoffset: 0, stagger: 0.15, duration: 0.4 }, 2 * U + 0.35)
      .from('.gate__out', { autoAlpha: 0, x: 20, stagger: 0.15, duration: 0.3 }, 2 * U + 0.7);
    // 04 — agent consumes the approved spec and context
    swapStage(tl, stages[2], stages[3], 3 * U);
    tl.from('.agent__inputs li', { autoAlpha: 0, x: -24, stagger: 0.08, duration: 0.25 }, 3 * U + 0.35)
      .from('.agent__core', { autoAlpha: 0, scale: 0.85, duration: 0.3 }, 3 * U + 0.6)
      .from('.agent__ask', { autoAlpha: 0, y: 12, duration: 0.3 }, 3 * U + 0.9);
    // 05 — traceability chain and test coverage
    swapStage(tl, stages[3], stages[4], 4 * U);
    tl.from('.aidlc-stage .trace:not(.trace--compact) .trace__item', { autoAlpha: 0, x: -20, stagger: 0.12, duration: 0.25 }, 4 * U + 0.35)
      .from('.tests-cov .chip', { autoAlpha: 0, y: 10, stagger: 0.06, duration: 0.2 }, 4 * U + 0.8);
    // 06 — gates pass one by one
    swapStage(tl, stages[4], stages[5], 5 * U);
    tl.from('.qgate', { autoAlpha: 0.15, stagger: 0.1, duration: 0.15 }, 5 * U + 0.35)
      .from('.qgate__icon', { scale: 0, stagger: 0.1, duration: 0.15 }, 5 * U + 0.4)
      .from('.qgates__fail', { autoAlpha: 0, duration: 0.25 }, 5 * U + 1.1);
    // 07 — convergence into verified delivery
    swapStage(tl, stages[5], stages[6], 6 * U);
    tl.from('.converge__in', { autoAlpha: 0, x: -30, stagger: 0.1, duration: 0.3 }, 6 * U + 0.35)
      .from('.converge__out', { autoAlpha: 0, scale: 0.8, duration: 0.3 }, 6 * U + 0.75)
      .from('.trace--compact', { autoAlpha: 0, y: 12, duration: 0.3 }, 6 * U + 0.95)
      .to({}, { duration: 0.4 });

    revealOnScroll('.login-ex');
    setStage(0);
    return () => {
      clearActive(nodes);
      loops.forEach((el) => el.classList.remove('is-active'));
    };
  });

  return (
    <SceneContainer id="aidlc" label="AI spec-driven development with AIDLC" ref={ref} className="aidlc">
      <div className="scene__pin aidlc__pin">
        <div className="container aidlc__layout">
          <header className="aidlc__head">
            <SectionLabel index="05">AIDLC · AI Spec-Driven Development</SectionLabel>
            <h2 className="h2" tabIndex={-1} data-focus-target>
              From Specification to <em>Production-Ready Software</em>
            </h2>
            <p className="lede">AI accelerates implementation. Specifications, validation, and human judgment keep it aligned.</p>
          </header>
          <AIDLCWorkflow />
          <div className="aidlc__stages">
            <StageVisuals />
          </div>
        </div>
      </div>
      <div className="container">
        <AidlcLoginExample />
      </div>
    </SceneContainer>
  );
}
