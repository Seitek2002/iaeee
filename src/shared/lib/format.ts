const LONG = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const SHORT = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

// Даты в моках — без времени (YYYY-MM-DD). Разбираем вручную, чтобы сервер и
// браузер в разных часовых поясах показывали один и тот же день.
function parse(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

/** 20 июня 2026 г. → «20 июня 2026» */
export function formatDate(iso: string) {
  return LONG.format(parse(iso)).replace(/\s?г\.$/, "");
}

/** 20.06.2026 */
export function formatDateShort(iso: string) {
  return SHORT.format(parse(iso));
}

/** plural(5, ["статья", "статьи", "статей"]) → «статей» */
export function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

/** «+996 705 90 89 41» → «tel:+996705908941» */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

/** Номер выпуска «Вестника»: 2026/1 (21) */
export function issueLabel(issue: {
  issueOfYear: number;
  total: number;
  year: number;
}) {
  return `${issue.year}/${issue.issueOfYear} (${issue.total})`;
}
