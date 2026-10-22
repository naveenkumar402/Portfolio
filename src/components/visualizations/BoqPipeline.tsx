import { ArrowRight } from 'lucide-react';
import { erpProject } from '../../data/portfolio';

// Conceptual illustration of the BOQ ingestion flow. The grid is a schematic, not product data.
const SHEET = [
  ['Item', 'Description', 'Unit', 'Qty'],
  ['1.1', '······', 'm³', '··'],
  ['1.2', '······', 'kg', '··'],
  ['2.1', '······', 'm²', '··'],
];

export function BoqPipeline() {
  return (
    <div className="boq">
      <div className="boq__sheet" aria-hidden="true">
        <div className="boq__sheet-bar">
          <span />
          <span />
          <span />
          <em>boq.xlsx — schematic</em>
        </div>
        <table>
          <tbody>
            {SHEET.map((row, r) => (
              <tr key={r} className={r === 0 ? 'is-head' : ''}>
                {row.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ol className="boq__steps" aria-label="Conceptual BOQ ingestion workflow">
        {erpProject.boq.map((step, i) => (
          <li className="boq__step" key={step}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <span>{step}</span>
            {i < erpProject.boq.length - 1 && <ArrowRight className="boq__arrow" size={16} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}
