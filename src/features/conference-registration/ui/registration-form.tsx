"use client";

import { useEffect, useState } from "react";

import type { Lang } from "@/shared/api";
import { cn } from "@/shared/lib";
import { CheckIcon, toast } from "@/shared/ui";

import { type RegistrationDraft, useRegistrationStore } from "../model/store";

const T = {
  ru: {
    fullName: "Фамилия, имя, отчество",
    degree: "Учёная степень и звание",
    organization: "Организация и должность",
    country: "Страна",
    city: "Город",
    email: "Электронная почта",
    phone: "Телефон / WhatsApp",
    role: "Участие",
    roles: {
      speaker: "С докладом",
      listener: "Без доклада, с сертификатом",
      publication: "Только публикация статьи",
    },
    format: "Формат",
    formats: { offline: "Очно", online: "Онлайн" },
    paperTitle: "Название доклада",
    transfer: "Нужна встреча в аэропорту и трансфер",
    arrival: "Дата приезда",
    optional: "необязательно",
    submit: "Отправить заявку",
    sending: "Отправляем…",
    note: "Демо-версия: заявка сохраняется только в этом браузере.",
    errName: "Укажите фамилию и имя",
    errOrg: "Укажите организацию",
    errEmail: "Нужен адрес вида name@example.com",
    errCountry: "Укажите страну",
    errPaper: "Укажите название доклада",
    toastTitle: "Заявка принята",
    toastText: "Оргкомитет ответит на ",
    doneTitle: "Заявка сохранена",
    doneText:
      "Мы свяжемся с вами по почте. Статью и презентацию отправьте на seismokg@mail.ru.",
    again: "Заполнить заново",
  },
  en: {
    fullName: "Full name",
    degree: "Academic degree and title",
    organization: "Organisation and position",
    country: "Country",
    city: "City",
    email: "Email",
    phone: "Phone / WhatsApp",
    role: "Participation",
    roles: {
      speaker: "With a paper",
      listener: "Without a paper, with a certificate",
      publication: "Paper publication only",
    },
    format: "Format",
    formats: { offline: "In person", online: "Online" },
    paperTitle: "Paper title",
    transfer: "I need airport pickup and transfer",
    arrival: "Arrival date",
    optional: "optional",
    submit: "Submit registration",
    sending: "Submitting…",
    note: "Demo version: the form is saved only in this browser.",
    errName: "Enter your full name",
    errOrg: "Enter your organisation",
    errEmail: "Use an address like name@example.com",
    errCountry: "Enter your country",
    errPaper: "Enter the paper title",
    toastTitle: "Registration received",
    toastText: "The committee will reply to ",
    doneTitle: "Registration saved",
    doneText:
      "We will contact you by email. Send your paper and presentation to seismokg@mail.ru.",
    again: "Start over",
  },
};

type Errors = Partial<Record<keyof RegistrationDraft, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const control =
  "h-12 w-full rounded-xl border border-haze bg-white px-4 text-ink placeholder:text-ink-muted/60 focus:border-lake focus:outline-none aria-invalid:border-[#c2410c]";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  children: React.ReactNode;
  error?: string;
  id: string;
  label: string;
  optional?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-small font-medium">
        {label}
        {optional && (
          <span className="font-normal text-ink-muted"> — {optional}</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-small text-[#c2410c]">
          {error}
        </p>
      )}
    </div>
  );
}

function Segmented<V extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  onChange: (v: V) => void;
  options: Record<V, string>;
  value: V;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {(Object.keys(options) as V[]).map((key) => (
        <label
          key={key}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2.5 text-small transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lake",
            key === value
              ? "border-lake bg-lake text-snow"
              : "border-haze bg-white hover:border-lake/40",
          )}
        >
          <input
            type="radio"
            name={name}
            value={key}
            checked={key === value}
            onChange={() => onChange(key)}
            className="sr-only"
          />
          {options[key]}
        </label>
      ))}
    </div>
  );
}

export function RegistrationForm({ lang }: { lang: Lang }) {
  const t = T[lang];
  const draft = useRegistrationStore((s) => s.draft);
  const setField = useRegistrationStore((s) => s.setField);
  const submit = useRegistrationStore((s) => s.submit);
  const reset = useRegistrationStore((s) => s.reset);
  const submittedAt = useRegistrationStore((s) => s.submittedAt);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    useRegistrationStore.persist.rehydrate();
  }, []);

  const bind = <
    K extends
      | "arrival"
      | "city"
      | "country"
      | "degree"
      | "email"
      | "fullName"
      | "organization"
      | "paperTitle"
      | "phone",
  >(
    key: K,
  ) => ({
    id: `reg-${key}`,
    name: key,
    value: draft[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `reg-${key}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setField(key, e.target.value as RegistrationDraft[K]);
      if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found: Errors = {};
    if (!draft.fullName.trim()) found.fullName = t.errName;
    if (!draft.organization.trim()) found.organization = t.errOrg;
    if (!draft.country.trim()) found.country = t.errCountry;
    if (!EMAIL_RE.test(draft.email.trim())) found.email = t.errEmail;
    if (draft.role !== "listener" && !draft.paperTitle.trim())
      found.paperTitle = t.errPaper;
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`reg-${first}`)?.focus();
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    submit();
    toast({
      title: t.toastTitle,
      description: `${t.toastText}${draft.email.trim()}.`,
    });
  };

  if (submittedAt) {
    return (
      <div className="rounded-3xl border border-haze bg-white p-6 sm:p-8">
        <span className="grid size-11 place-items-center rounded-full bg-apricot text-lake">
          <CheckIcon size={20} strokeWidth={2} />
        </span>
        <h3 className="mt-5 font-conf-display text-c-h3">{t.doneTitle}</h3>
        <p className="mt-2 max-w-lg text-ink-muted">
          {draft.fullName}, {draft.organization}. {t.doneText}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 h-10 rounded-full border border-lake px-5 text-small font-medium hover:bg-lake hover:text-snow"
        >
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-6 rounded-3xl border border-haze bg-white p-5 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="reg-fullName" label={t.fullName} error={errors.fullName}>
          <input
            className={control}
            autoComplete="name"
            {...bind("fullName")}
          />
        </Field>
        <Field id="reg-degree" label={t.degree} optional={t.optional}>
          <input className={control} {...bind("degree")} />
        </Field>
        <Field
          id="reg-organization"
          label={t.organization}
          error={errors.organization}
        >
          <input
            className={control}
            autoComplete="organization"
            {...bind("organization")}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field id="reg-country" label={t.country} error={errors.country}>
            <input
              className={control}
              autoComplete="country-name"
              {...bind("country")}
            />
          </Field>
          <Field id="reg-city" label={t.city} optional={t.optional}>
            <input
              className={control}
              autoComplete="address-level2"
              {...bind("city")}
            />
          </Field>
        </div>
        <Field id="reg-email" label={t.email} error={errors.email}>
          <input
            className={control}
            type="email"
            inputMode="email"
            autoComplete="email"
            {...bind("email")}
          />
        </Field>
        <Field id="reg-phone" label={t.phone} optional={t.optional}>
          <input
            className={control}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...bind("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="text-small font-medium">{t.role}</span>
          <Segmented
            name={t.role}
            value={draft.role}
            options={t.roles}
            onChange={(v) => setField("role", v)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-small font-medium">{t.format}</span>
          <Segmented
            name={t.format}
            value={draft.format}
            options={t.formats}
            onChange={(v) => setField("format", v)}
          />
        </div>
      </div>

      {draft.role !== "listener" && (
        <Field
          id="reg-paperTitle"
          label={t.paperTitle}
          error={errors.paperTitle}
        >
          <input className={control} {...bind("paperTitle")} />
        </Field>
      )}

      {draft.format === "offline" && (
        <div className="grid items-end gap-6 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 py-3">
            <input
              type="checkbox"
              checked={draft.transfer}
              onChange={(e) => setField("transfer", e.target.checked)}
              className="size-5 accent-[var(--color-lake)]"
            />
            <span>{t.transfer}</span>
          </label>
          <Field id="reg-arrival" label={t.arrival} optional={t.optional}>
            <input className={control} type="date" {...bind("arrival")} />
          </Field>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-small text-ink-muted">{t.note}</p>
        <button
          type="submit"
          disabled={sending}
          className="h-12 rounded-full bg-apricot px-7 font-semibold text-lake transition-colors hover:bg-[#f7b57d] disabled:opacity-60"
        >
          {sending ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}
