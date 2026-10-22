import { Sparkles } from 'lucide-react';
import { workflowSteps } from '../../data/portfolio';

/** Horizontal SDLC track. The scene translates `.eng-track` while the rail fills. */
export function EngineeringTimeline() {
  return (
    <div className="eng">
      <div className="eng__rail" aria-hidden="true">
        <span className="eng__rail-fill" />
      </div>
      <ol className="eng-track">
        {workflowSteps.map((s, i) => (
          <li className="eng-step" key={s.title}>
            <span className="eng-step__dot" aria-hidden="true" />
            <span className="mono eng-step__index">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="eng-step__title">{s.title}</h3>
            <p>{s.text}</p>
            <ul className="chips">
              {s.practices.map((p) => (
                <li className="chip" key={p}>
                  {p}
                </li>
              ))}
            </ul>
            {s.ai && (
              <span className="tag tag--ai">
                <Sparkles size={12} aria-hidden="true" /> AIDLC-assisted
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
