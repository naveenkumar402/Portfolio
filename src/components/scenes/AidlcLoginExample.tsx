import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { loginExample } from '../../data/aidlc';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/** Interactive, illustrative walk-through of one feature moving through AIDLC. */
export function AidlcLoginExample() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const step = loginExample[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = loginExample.length - 1;
    let next = active;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="login-ex">
      <div className="login-ex__head">
        <p className="eyebrow">Interactive example</p>
        <h3 className="h3">One feature through the workflow: User Login</h3>
        <p className="caption-note">Illustrative example of the method — not an existing deployed feature.</p>
      </div>
      <div className="login-ex__tabs" role="tablist" aria-label="AIDLC stages for the login example" onKeyDown={onKeyDown}>
        {loginExample.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`login-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="login-panel"
            tabIndex={i === active ? 0 : -1}
            className="login-ex__tab"
            onClick={() => setActive(i)}
          >
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            {s.label}
          </button>
        ))}
      </div>
      <div className="login-ex__panel" id="login-panel" role="tabpanel" aria-labelledby={`login-tab-${step.id}`} tabIndex={0}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h4>{step.title}</h4>
            <p>{step.body}</p>
            {step.points && (
              <ul className="chips">
                {step.points.map((p) => (
                  <li className="chip" key={p}>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
