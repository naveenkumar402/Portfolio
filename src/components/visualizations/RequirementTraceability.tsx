import { ChevronRight } from 'lucide-react';
import { traceChain } from '../../data/aidlc';

export function RequirementTraceability({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`trace${compact ? ' trace--compact' : ''}`} aria-label="Requirement traceability chain">
      {traceChain.map((t, i) => (
        <li className="trace__item" key={t}>
          <span className="trace__id mono">{['REQ-01', 'AC-01.2', 'impl', 'TEST-01.2'][i]}</span>
          <span className="trace__label">{t}</span>
          {i < traceChain.length - 1 && <ChevronRight className="trace__arrow" size={16} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
