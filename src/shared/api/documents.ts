import { documents } from "./mock";
import type { DocumentGroup, DocumentItem } from "./types";

export async function getDocuments(
  group?: DocumentGroup,
): Promise<DocumentItem[]> {
  return group ? documents.filter((d) => d.group === group) : documents;
}
