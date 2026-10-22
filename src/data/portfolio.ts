// Resume-grounded content. Source of truth: Naveenkumar_D_Resume.pdf.

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'project', label: 'Projects' },
  { id: 'aidlc', label: 'AIDLC' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const profile = {
  name: 'Naveenkumar D',
  title: 'Java Full Stack Developer',
  tagline: 'Building scalable systems. Engineering reliable software.',
  heroTech: ['Java', 'Spring Boot', 'React', 'NestJS', 'Microservices', 'AIDLC'],
  email: 'dnaveenkumar402@gmail.com',
  linkedin: 'https://linkedin.com/in/naveenkumard0402',
  github: 'https://github.com/naveenkumar402',
  location: 'Erode, Tamil Nadu, India',
  summary:
    'I am a Java Full Stack Developer experienced in building enterprise web applications, scalable microservices, secure APIs, and event-driven systems. My work spans backend engineering, React-based frontend development, data integration, legacy system modernization, and automated delivery workflows.',
  philosophy:
    'AI accelerates implementation. Clear specifications, automated verification, and human judgment keep software aligned with requirements.',
};

export const aboutStatements: { kicker: string; text: string }[] = [
  { kicker: '01 — Build', text: 'Enterprise web applications, end to end.' },
  { kicker: '02 — Scale', text: 'Microservices, secure APIs, and event-driven systems.' },
  { kicker: '03 — Modernize', text: 'Legacy workflows, decomposed one domain at a time.' },
  { kicker: '04 — Deliver', text: 'Specifications, automated validation, reliable releases.' },
];

export const engineeringThemes: string[] = [
  'Full-stack application development',
  'Domain-driven microservices architecture',
  'Legacy modernization with the Strangler Fig pattern',
  'Change Data Capture and data synchronization',
  'Event-driven communication',
  'Secure REST API design',
  'Multi-tenant application development',
  'AI-Driven Development Life Cycle practices',
  'Specification-driven implementation and automated validation',
];

export interface SkillGroup {
  id: string;
  title: string;
  short: string;
  /** Why this group connects to the previous one in the skill network. */
  link: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    short: 'Backend',
    link: 'Core of the stack',
    items: ['Java (SE 8+)', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Hibernate', 'Spring Security', 'Node.js', 'NestJS', 'TypeScript', 'Redis'],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    short: 'Frontend',
    link: 'REST / JSON contracts',
    items: ['React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    id: 'data',
    title: 'Database and Messaging',
    short: 'Data & Messaging',
    link: 'JPA · Kafka events',
    items: ['PostgreSQL', 'MySQL', 'SQL', 'Apache Kafka', 'Event-driven communication'],
  },
  {
    id: 'architecture',
    title: 'Architecture and Integration',
    short: 'Architecture',
    link: 'DDD · CDC · OpenAPI',
    items: [
      'Microservices Architecture',
      'Domain-Driven Design',
      'Strangler Fig Migration Pattern',
      'Change Data Capture (CDC)',
      'RESTful APIs',
      'OpenAPI Specification / Swagger',
      'JWT Authentication',
      'Multi-tenant architecture',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps and Testing',
    short: 'DevOps & Testing',
    link: 'CI/CD · verification',
    items: ['Git', 'GitHub', 'Maven', 'GitHub Actions', 'Docker', 'Kubernetes', 'AWS', 'Postman', 'JUnit', 'Mockito', 'Unit Testing', 'Agile / Scrum', 'Code Reviews'],
  },
  {
    id: 'ai',
    title: 'AI Engineering and Spec-Driven Development',
    short: 'AIDLC',
    link: 'Spec → code → test',
    items: [
      'AI-Driven Development Life Cycle (AIDLC)',
      'AI-assisted software development',
      'Specification-driven implementation',
      'Markdown-based specifications',
      'Requirements analysis',
      'Functional specifications and acceptance criteria',
      'Human-in-the-loop review and approval',
      'AI coding agent workflows',
      'Automated test case generation',
      'Requirement-to-test traceability',
      'Automated validation and quality gates',
      'Pull request review and merge protection',
    ],
  },
];

export interface ArchStep {
  title: string;
  text: string;
}

export const architectureSteps: ArchStep[] = [
  { title: 'React frontend', text: 'State-driven forms and dynamic UI workflows consume backend services.' },
  { title: 'Request paths', text: 'Requests travel to a REST API layer with documented service contracts.' },
  { title: 'Domain services', text: 'Spring Boot and NestJS services own clear domain boundaries.' },
  { title: 'Persistence', text: 'Services persist through JPA / Hibernate into PostgreSQL and MySQL.' },
  { title: 'Kafka events', text: 'Asynchronous events decouple services and trigger downstream work.' },
  { title: 'CDC propagation', text: 'Change Data Capture streams data changes so dependent services stay consistent.' },
  { title: 'Security & contracts', text: 'Spring Security with JWT, role-based and company-level multi-tenant access, and OpenAPI contracts.' },
];

export const erpProject = {
  name: 'Construction ERP Platform',
  employer: 'Kanavu Startup Village',
  services: [
    { name: 'Project Service', text: 'Project lifecycle workflows and project events.' },
    { name: 'Tender Management Service', text: 'Tender workflows, updates, and submissions.' },
    { name: 'Authentication Service', text: 'Spring Security + JWT, role-based and multi-tenant access.' },
    { name: 'Notification Service', text: 'Event-driven processing and automated email notifications.' },
  ],
  boq: ['Excel Input', 'Sheet & Column Mapping', 'Data Validation', 'Structured BOQ Items', 'Resource-Level Cost Estimation'],
  work: [
    'Incrementally decomposed monolithic workflows using the Strangler Fig pattern.',
    'Developed domain-oriented microservices for project management, tender management, authentication, and notifications.',
    'Implemented event-driven communication using Apache Kafka.',
    'Built CDC-based data propagation across services.',
    'Developed secure REST APIs using Spring Boot, Spring MVC, Hibernate, Spring Security, and JWT.',
    'Integrated NestJS and TypeScript services with the Java / Spring Boot microservices.',
    'Designed a multi-database architecture with datasource routing for User, Company, and Project modules.',
    'Built Excel-driven BOQ ingestion with automated validation and mapping.',
    'Developed resource-level cost estimation and rate analysis.',
    'Integrated React frontend workflows with backend microservices.',
    'Implemented CI/CD pipelines using GitHub Actions.',
    'Applied AI-assisted development, review, and testing practices.',
  ],
};

export interface WorkflowStep {
  title: string;
  text: string;
  practices: string[];
  ai?: boolean;
}

export const workflowSteps: WorkflowStep[] = [
  { title: 'Requirements Analysis', text: 'Understand expected behavior, business rules, dependencies, and edge cases.', practices: ['Requirements discovery'], ai: true },
  { title: 'Domain Modeling', text: 'Shape services around business domains and clear boundaries.', practices: ['Domain-driven design'] },
  { title: 'API Contract Design', text: 'Agree on service contracts before integration begins.', practices: ['OpenAPI documentation', 'DTO mapping'] },
  { title: 'Specification & Acceptance Criteria', text: 'Capture behavior as reviewed Markdown specifications.', practices: ['Specification-based validation', 'Human approval'], ai: true },
  { title: 'Implementation', text: 'Build against the approved specification and existing conventions.', practices: ['Layered architecture', 'Centralized exception handling', 'Structured logging', 'AI-assisted implementation'], ai: true },
  { title: 'Unit & Integration Testing', text: 'Verify behavior independently of the generated code.', practices: ['JUnit', 'Mockito', 'AI-assisted testing'], ai: true },
  { title: 'Code Review', text: 'Human review checks alignment, design, and maintainability.', practices: ['Pull request review'] },
  { title: 'CI/CD', text: 'Automated build and test on every change.', practices: ['GitHub Actions', 'Maven'] },
  { title: 'Deployment', text: 'Containerized, repeatable delivery.', practices: ['Docker-based workflows'] },
];

export const experience = {
  role: 'Software Engineer (Full Stack Developer)',
  company: 'Kanavu Startup Village',
  location: 'Erode',
  period: 'March 2025 – Present',
  levels: [
    { level: 'Level 2', title: 'Software Engineer (Full Stack Developer)', period: 'January 2026 – Present', project: 'ERP Mobile API · ERP Reporting Platform',
      points: [
        'Built a registry-driven payload- and field-level encryption layer with Spring Security and JWT.',
        'Implemented multi-tenant datasource resolution serving multiple client SQL Server databases.',
        'Designed APIs specification-first with Markdown specs, OpenAPI Generator, and MapStruct.',
        'Contributed to reporting modernization: migrated legacy stored-procedure reports to validated SQL view models with equality tests.',
      ] },
    { level: 'Level 1', title: 'Associate Software Engineer', period: 'March 2025 – December 2025', project: 'Tendering API (Construction ERP)',
      points: [
        'Built Excel and PDF BOQ ingestion with Apache POI, PDFBox, Tabula, and a PaddleOCR table-extraction service.',
        'Developed tender cost estimation and secure Spring Boot / JPA / PostgreSQL APIs.',
      ] },
  ],
  project: 'Construction ERP Platform',
  highlights: [
    { title: 'Microservices development', text: 'Decomposed monolithic workflows into domain-driven services using the Strangler Fig pattern.' },
    { title: 'Backend API implementation', text: 'Secure RESTful APIs with Spring Boot, Spring MVC, and Hibernate (JPA), documented with OpenAPI.' },
    { title: 'React frontend integration', text: 'Dynamic UI workflows and state-driven forms for project and tender management.' },
    { title: 'Event-driven architecture', text: 'Apache Kafka for asynchronous project events, tender updates, and email notifications.' },
    { title: 'CDC-based data propagation', text: 'Kept project, tender, and notification data consistent across services.' },
    { title: 'Authentication & authorization', text: 'Spring Security and JWT with role-based and company-level multi-tenant access control.' },
    { title: 'BOQ ingestion & cost estimation', text: 'Excel-driven BOQ ingestion plus a resource-level cost estimation and rate analysis engine.' },
    { title: 'Multi-database architecture', text: 'Dynamic datasource routing isolating User, Company, and Project modules.' },
    { title: 'CI/CD automation', text: 'GitHub Actions pipelines for automated build, test, and deployment.' },
    { title: 'AIDLC practices', text: 'AI-assisted code generation, review, and testing while maintaining code quality.' },
  ],
};

export const education = [
  { title: 'Bachelor of Technology (Information Technology)', school: 'Hindusthan College of Engineering and Technology, Coimbatore', score: 'CGPA 8.16' },
  { title: 'Higher Secondary Certificate', school: 'Vivekananda Vidyalaya Matric Higher Secondary School, Tirupur', score: '69.6%' },
  { title: 'Secondary School Leaving Certificate', school: 'Reliance Matric Higher Secondary School, Erode', score: '95.0%' },
];

export const certification = { title: 'Java Full Stack Development', issuer: 'JSpiders, Bangalore' };
