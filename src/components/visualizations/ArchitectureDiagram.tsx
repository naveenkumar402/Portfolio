// Illustrative enterprise architecture drawn in SVG. Groups (`.arch-g-*`) map to narrative steps.

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  tone?: 'accent' | 'violet' | 'muted';
}

function Box({ x, y, w, h = 64, title, sub, tone = 'muted' }: BoxProps) {
  return (
    <g className={`arch-box arch-box--${tone}`}>
      <rect x={x} y={y} width={w} height={h} rx={10} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 4 : y + h / 2 + 6} textAnchor="middle" className="arch-box__title">
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 18} textAnchor="middle" className="arch-box__sub">
          {sub}
        </text>
      )}
    </g>
  );
}

export function ArchitectureDiagram() {
  return (
    <svg className="arch" viewBox="0 0 1000 640" role="img" aria-labelledby="arch-title arch-desc">
      <title id="arch-title">Illustrative enterprise architecture</title>
      <desc id="arch-desc">
        A React frontend calls a REST API layer secured with Spring Security and JWT and documented with OpenAPI. Requests
        reach Spring Boot and NestJS domain services that persist to PostgreSQL and MySQL. Services exchange events
        through Apache Kafka, and Change Data Capture streams database changes into Kafka for data synchronization.
      </desc>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="arch-arrow" />
        </marker>
      </defs>

      {/* 1 — Frontend */}
      <g className="arch-g arch-g-0">
        <Box x={360} y={20} w={280} title="React Frontend" sub="state-driven forms · UI workflows" tone="accent" />
      </g>

      {/* 2 — Request paths */}
      <g className="arch-g arch-g-1">
        <path className="arch-line arch-draw" d="M470 84V160" markerEnd="url(#arrow)" />
        <path className="arch-line arch-line--dim arch-draw" d="M530 160V84" markerEnd="url(#arrow)" />
        <text x={455} y={128} textAnchor="end" className="arch-note">HTTPS · JSON</text>
        <circle className="arch-packet arch-packet-0" cx={470} cy={88} r={5} />
        <Box x={300} y={162} w={400} h={58} title="REST API Layer" tone="accent" />
      </g>

      {/* 3 — Services */}
      <g className="arch-g arch-g-2">
        <path className="arch-line arch-draw" d="M420 220V300" markerEnd="url(#arrow)" />
        <path className="arch-line arch-draw" d="M580 220V300" markerEnd="url(#arrow)" />
        <Box x={250} y={302} w={230} h={70} title="Spring Boot Services" sub="Spring MVC · JPA / Hibernate" />
        <Box x={520} y={302} w={230} h={70} title="NestJS Services" sub="Node.js · TypeScript" />
        <text x={500} y={396} textAnchor="middle" className="arch-note">domain-oriented service boundaries</text>
      </g>

      {/* 4 — Databases */}
      <g className="arch-g arch-g-3">
        <path className="arch-line arch-draw" d="M365 372V488" markerEnd="url(#arrow)" />
        <path className="arch-line arch-draw" d="M635 372V488" markerEnd="url(#arrow)" />
        <circle className="arch-packet arch-packet-1" cx={365} cy={380} r={5} />
        <Box x={265} y={490} w={200} h={58} title="PostgreSQL" />
        <Box x={535} y={490} w={200} h={58} title="MySQL" />
        <text x={500} y={580} textAnchor="middle" className="arch-note">multi-database · datasource routing</text>
      </g>

      {/* 5 — Kafka */}
      <g className="arch-g arch-g-4">
        <path className="arch-line arch-line--violet arch-draw" d="M750 330H850" markerEnd="url(#arrow)" />
        <path className="arch-line arch-line--violet arch-draw" d="M365 302V276H900V300" markerEnd="url(#arrow)" />
        <circle className="arch-packet arch-packet--violet arch-packet-2" cx={754} cy={330} r={5} />
        <Box x={850} y={302} w={130} h={250} title="Apache Kafka" tone="violet" />
        <text x={915} y={470} textAnchor="middle" className="arch-note">events</text>
        <text x={915} y={490} textAnchor="middle" className="arch-note">async</text>
      </g>

      {/* 6 — CDC */}
      <g className="arch-g arch-g-5">
        <path className="arch-line arch-line--violet arch-line--dash arch-draw" d="M735 519H850" markerEnd="url(#arrow)" />
        <path className="arch-line arch-line--violet arch-line--dash arch-draw" d="M365 548V612H915V552" markerEnd="url(#arrow)" />
        <rect x={758} y={500} width={70} height={26} rx={13} className="arch-pill" />
        <text x={793} y={518} textAnchor="middle" className="arch-pill__text">CDC</text>
        <text x={640} y={630} textAnchor="middle" className="arch-note">change events keep dependent services in sync</text>
      </g>

      {/* 7 — Security & contracts */}
      <g className="arch-g arch-g-6">
        <path className="arch-line arch-line--dim arch-draw" d="M260 191H300" />
        <Box x={20} y={150} w={240} h={82} title="Spring Security + JWT" sub="role + company-level tenancy" tone="violet" />
        <path className="arch-line arch-line--dim arch-draw" d="M700 191H740" />
        <Box x={740} y={160} w={220} h={62} title="OpenAPI contracts" sub="Swagger documentation" tone="violet" />
      </g>
    </svg>
  );
}
