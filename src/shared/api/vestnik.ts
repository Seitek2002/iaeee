import { issues, journal } from "./mock";
import type { Issue, JournalInfo } from "./types";

export async function getJournalInfo(): Promise<JournalInfo> {
  return journal;
}

export async function getIssues(): Promise<Issue[]> {
  return [...issues].sort((a, b) => b.total - a.total);
}

export async function getLatestIssue(): Promise<Issue> {
  return (await getIssues())[0];
}

export async function getIssue(id: string): Promise<Issue | null> {
  return issues.find((i) => i.id === id) ?? null;
}

export async function getIssueIds(): Promise<string[]> {
  return issues.map((i) => i.id);
}
