import type {
  ConferenceSession,
  ConferenceTalk,
  CountryIso,
} from "@/shared/api";

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

/** Поиск ищет сразу по обоим языкам: название, докладчик, организация. */
export function matchTalk(
  talk: ConferenceTalk,
  query: string,
  country: CountryIso | "all",
) {
  if (country !== "all" && talk.country !== country) return false;
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = norm(
    [talk.title, talk.speaker, talk.org]
      .map((t) => `${t.ru} ${t.en}`)
      .join(" "),
  );
  return words.every((w) => hay.includes(w));
}

export function filterSessions(
  sessions: ConferenceSession[],
  query: string,
  country: CountryIso | "all",
) {
  return sessions
    .map((s) => ({
      session: s,
      talks: s.talks.filter((t) => matchTalk(t, query, country)),
    }))
    .filter((x) => x.talks.length > 0);
}

export function countByCountry(sessions: ConferenceSession[]) {
  const counts = new Map<CountryIso, number>();
  for (const s of sessions)
    for (const t of s.talks)
      counts.set(t.country, (counts.get(t.country) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}
