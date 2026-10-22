import { skillGroups } from '../../data/portfolio';

const C = { x: 320, y: 320 };
const R = 220;

// Groups sit on a ring around the developer identity. Each new group links back to the one
// it builds on, with the relationship labelled on the connector.
export const skillPositions = skillGroups.map((_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / skillGroups.length;
  return { x: C.x + R * Math.cos(a), y: C.y + R * Math.sin(a) };
});

export function SkillsNetwork() {
  return (
    <svg className="skills-net" viewBox="0 0 640 640" aria-hidden="true">
      <circle className="skills-net__orbit" cx={C.x} cy={C.y} r={R} />
      {skillGroups.map((g, i) => {
        const p = skillPositions[i];
        return <line key={`s-${g.id}`} className={`skills-net__spoke sn-spoke-${i}`} x1={C.x} y1={C.y} x2={p.x} y2={p.y} />;
      })}
      {skillGroups.map((g, i) => {
        if (i === 0) return null;
        const a = skillPositions[i - 1];
        const b = skillPositions[i];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        // Pull the label outward from the centre so it never sits on the spokes.
        const lx = C.x + (mx - C.x) * 1.32;
        const ly = C.y + (my - C.y) * 1.32;
        return (
          <g key={`l-${g.id}`} className={`sn-link-${i}`}>
            <line className="skills-net__link" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            <text className="skills-net__link-label" x={lx} y={ly} textAnchor="middle">
              {g.link}
            </text>
          </g>
        );
      })}
      <g className="skills-net__core">
        <circle cx={C.x} cy={C.y} r={62} className="skills-net__core-ring" />
        <text x={C.x} y={C.y - 4} textAnchor="middle" className="skills-net__core-title">
          ND
        </text>
        <text x={C.x} y={C.y + 20} textAnchor="middle" className="skills-net__core-sub">
          Full Stack
        </text>
      </g>
      {skillGroups.map((g, i) => {
        const p = skillPositions[i];
        const below = p.y >= C.y;
        return (
          <g key={`n-${g.id}`} className={`skills-net__node sn-node-${i}`}>
            <circle cx={p.x} cy={p.y} r={30} className="skills-net__ring" />
            <circle cx={p.x} cy={p.y} r={7} className="skills-net__dot" />
            <text x={p.x} y={below ? p.y + 52 : p.y - 42} textAnchor="middle" className="skills-net__label">
              {g.short}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
