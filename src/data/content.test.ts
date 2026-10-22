import { describe, expect, it } from 'vitest';
import { navItems, skillGroups, workflowSteps, profile } from './portfolio';
import { aidlcStages, feedbackLoops, loginExample, processNodes } from './aidlc';

describe('portfolio content', () => {
  it('has unique navigation ids', () => {
    const ids = navItems.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('groups skills into six categories in narrative order', () => {
    expect(skillGroups.map((g) => g.id)).toEqual(['backend', 'frontend', 'data', 'architecture', 'devops', 'ai']);
    skillGroups.forEach((g) => expect(g.items.length).toBeGreaterThan(0));
  });

  it('has the nine-step engineering workflow', () => {
    expect(workflowSteps).toHaveLength(9);
    expect(workflowSteps[0].title).toBe('Requirements Analysis');
    expect(workflowSteps[8].title).toBe('Deployment');
  });

  it('uses working contact links', () => {
    expect(profile.linkedin).toMatch(/^https:\/\//);
    expect(profile.github).toMatch(/^https:\/\//);
    expect(profile.email).toContain('@');
  });
});

describe('AIDLC content', () => {
  it('maps every stage to valid process nodes and loops', () => {
    expect(aidlcStages).toHaveLength(7);
    aidlcStages.forEach((s) => {
      expect(s.nodes.length).toBeGreaterThan(0);
      s.nodes.forEach((n) => expect(processNodes[n]).toBeDefined());
      s.loops.forEach((l) => expect(feedbackLoops[l]).toBeDefined());
    });
  });

  it('keeps human approval in the process', () => {
    expect(processNodes).toContain('Human Review and Approval');
    expect(processNodes).toContain('Human Pull Request Review');
  });

  it('has the five illustrative login steps', () => {
    expect(loginExample.map((s) => s.label)).toEqual(['Requirement', 'Specification', 'Implementation', 'Automated tests', 'Quality gate']);
  });
});
