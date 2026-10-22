// Decorative technical grid with a small, fixed node network. Shared by the hero and closing scenes.

const NODES: [number, number][] = [
  [140, 160], [320, 90], [520, 200], [760, 110], [980, 190], [1100, 360],
  [880, 420], [640, 520], [420, 470], [210, 560], [90, 380], [1040, 600],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 0], [2, 8], [3, 6], [5, 11], [6, 11],
];

export function TechGrid({ className = '' }: { className?: string }) {
  return (
    <svg className={`tech-grid ${className}`} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id={`grid-${className || 'base'}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" className="tech-grid__cell" />
        </pattern>
        <radialGradient id={`fade-${className || 'base'}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`mask-${className || 'base'}`}>
          <rect width="1200" height="700" fill={`url(#fade-${className || 'base'})`} />
        </mask>
      </defs>
      <g mask={`url(#mask-${className || 'base'})`}>
        <rect className="tech-grid__pattern" width="1200" height="700" fill={`url(#grid-${className || 'base'})`} />
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            className="tech-grid__line"
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
          />
        ))}
        {NODES.map(([x, y], i) => (
          <circle key={i} className={`tech-grid__node${i % 4 === 0 ? ' is-accent' : ''}`} cx={x} cy={y} r={i % 4 === 0 ? 5 : 3.5} />
        ))}
      </g>
    </svg>
  );
}
