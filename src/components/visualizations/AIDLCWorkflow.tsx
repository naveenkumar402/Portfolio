import { RotateCcw } from 'lucide-react';
import { feedbackLoops, processNodes } from '../../data/aidlc';

/** Vertical AIDLC process diagram. Active nodes are toggled by the scene's scroll progress. */
export function AIDLCWorkflow() {
  return (
    <div className="aidlc-proc">
      <p className="eyebrow">AIDLC process</p>
      <div className="aidlc-proc__track">
        <span className="aidlc-proc__rail" aria-hidden="true">
          <span className="aidlc-proc__fill" />
        </span>
        <ol className="aidlc-proc__nodes">
          {processNodes.map((node, i) => (
            <li key={node} className={i === 2 || i === 6 ? 'is-human' : undefined}>
              <span className="aidlc-proc__dot" aria-hidden="true" />
              <span className="aidlc-proc__label">{node}</span>
              {(i === 2 || i === 6) && <span className="tag tag--human">Human</span>}
            </li>
          ))}
        </ol>
      </div>
      <p className="eyebrow aidlc-proc__loops-title">Feedback loops</p>
      <ul className="aidlc-proc__loops">
        {feedbackLoops.map((l) => (
          <li key={l.from}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>
              {l.from} <span className="arrow">→</span> {l.to}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
