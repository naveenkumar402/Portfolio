// AIDLC methodology content: a structured engineering workflow, not a list of tools.

export interface AidlcStage {
  id: string;
  index: string;
  title: string;
  text: string;
  /** Indices into processNodes that are active during this stage. */
  nodes: number[];
  /** Indices into feedbackLoops relevant to this stage. */
  loops: number[];
}

export const aidlcStages: AidlcStage[] = [
  {
    id: 'requirements',
    index: '01',
    title: 'Requirements and Discovery',
    text: 'Everything starts with understanding: expected behavior, business rules, dependencies, and edge cases are made explicit before anything is generated.',
    nodes: [0],
    loops: [],
  },
  {
    id: 'spec',
    index: '02',
    title: 'AI-Assisted Specification Generation',
    text: 'AI helps draft and organize a Markdown specification. A generated specification is a draft — it is never assumed to be correct.',
    nodes: [1],
    loops: [],
  },
  {
    id: 'review',
    index: '03',
    title: 'Human Review and Approval',
    text: 'A person reviews the draft and establishes the agreed behavior and scope. Only an approved specification moves on; otherwise it is refined.',
    nodes: [2],
    loops: [2],
  },
  {
    id: 'implement',
    index: '04',
    title: 'Specification-Driven Implementation',
    text: 'An AI coding agent implements against the approved specification, the existing architecture, and coding conventions. It does not invent business rules — ambiguity is raised for clarification.',
    nodes: [3],
    loops: [2],
  },
  {
    id: 'tests',
    index: '05',
    title: 'Automated Test Case Generation',
    text: 'Tests derive from approved requirements and acceptance criteria, so they verify expected behavior independently instead of echoing assumptions in generated code.',
    nodes: [4],
    loops: [0, 3],
  },
  {
    id: 'gates',
    index: '06',
    title: 'Automated Quality Gates',
    text: 'Required checks can be configured to run before merging. Branch protection and authorized human review decide whether a change merges.',
    nodes: [5, 6],
    loops: [0, 1],
  },
  {
    id: 'delivery',
    index: '07',
    title: 'Verified Delivery',
    text: 'Generate code faster without sacrificing requirement alignment, maintainability, test coverage, or engineering judgment.',
    nodes: [7],
    loops: [],
  },
];

export const processNodes: string[] = [
  'Requirements',
  'AI-Assisted Specification Generation',
  'Human Review and Approval',
  'Specification-Driven Implementation',
  'Automated Test Generation',
  'Automated Validation',
  'Human Pull Request Review',
  'Approved Merge and Delivery',
];

export const feedbackLoops: { from: string; to: string }[] = [
  { from: 'Failed tests', to: 'Implementation correction' },
  { from: 'Review findings', to: 'Code correction' },
  { from: 'Missing or ambiguous requirements', to: 'Specification refinement' },
  { from: 'Changed requirements', to: 'Specification review and test updates' },
];

export const specSections: string[] = [
  'Feature overview',
  'Functional requirements',
  'User flows',
  'Business rules',
  'Input validation',
  'Error handling',
  'Edge cases',
  'Acceptance criteria',
  'Dependencies and constraints',
];

export const agentInputs: string[] = [
  'Approved Markdown specifications',
  'Existing architecture',
  'Coding conventions',
  'Explicit implementation constraints',
  'Related modules and dependencies',
];

export const testCoverage: string[] = [
  'Expected behavior',
  'Valid and invalid inputs',
  'Boundary conditions',
  'Business rule validation',
  'Error handling',
  'Regression scenarios',
];

export const qualityGates: string[] = [
  'Implementation',
  'Unit Tests',
  'Integration Tests',
  'Lint & Type Checks',
  'Production Build',
  'Pull Request Review',
  'Merge Approval',
];

export const traceChain: string[] = ['Requirement', 'Acceptance Criterion', 'Implementation', 'Automated Test'];

export interface LoginStep {
  id: string;
  label: string;
  title: string;
  body: string;
  points?: string[];
}

export const loginExample: LoginStep[] = [
  {
    id: 'requirement',
    label: 'Requirement',
    title: 'Users must authenticate using valid credentials.',
    body: 'The starting point is a plain statement of expected behavior, clarified with the people who own the requirement.',
  },
  {
    id: 'specification',
    label: 'Specification',
    title: 'Define the behavior before writing code.',
    body: 'An AI-drafted Markdown specification is reviewed and approved by a human before implementation begins.',
    points: ['Request fields', 'Validation rules', 'Successful responses', 'Error responses', 'Security constraints', 'Acceptance criteria'],
  },
  {
    id: 'implementation',
    label: 'Implementation',
    title: 'Implement the approved behavior — nothing more.',
    body: 'An AI coding agent implements the approved behavior while following the existing project architecture and coding conventions. Gaps in the specification are raised, not guessed.',
  },
  {
    id: 'tests',
    label: 'Automated tests',
    title: 'Tests trace back to acceptance criteria.',
    body: 'Test cases are derived from the approved specification, independent of the generated code.',
    points: ['Valid credentials', 'Invalid credentials', 'Missing or malformed fields', 'Expected error handling', 'Relevant regression scenarios'],
  },
  {
    id: 'gate',
    label: 'Quality gate',
    title: 'Required checks pass before merge approval.',
    body: 'Required tests and build checks must pass before the pull request can be approved for merging by an authorized reviewer.',
  },
];
