"use client";

import { useEffect, useState } from "react";

import { cn, formatDate } from "@/shared/lib";
import {
  Button,
  CheckIcon,
  Field,
  Input,
  Select,
  Textarea,
  toast,
} from "@/shared/ui";

import {
  type ApplicationForm as Form,
  ORGANIZATION_TYPES,
  useApplicationStore,
} from "../model/store";

type Errors = Partial<Record<keyof Form, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Form): Errors {
  const e: Errors = {};
  if (!f.organization.trim())
    e.organization = "Укажите полное название организации";
  if (!f.city.trim()) e.city = "Укажите город";
  if (!f.contactName.trim()) e.contactName = "Укажите контактное лицо";
  if (!EMAIL_RE.test(f.email.trim()))
    e.email = "Нужен адрес вида name@example.com";
  if (f.phone.replace(/\D/g, "").length < 9)
    e.phone = "Нужен номер с кодом страны, например +996 555 123 456";
  return e;
}

export function ApplicationForm({ className }: { className?: string }) {
  const form = useApplicationStore((s) => s.form);
  const setField = useApplicationStore((s) => s.setField);
  const submit = useApplicationStore((s) => s.submit);
  const reset = useApplicationStore((s) => s.reset);
  const submittedAt = useApplicationStore((s) => s.submittedAt);
  const collected = useApplicationStore((s) => s.collected.length);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    useApplicationStore.persist.rehydrate();
  }, []);

  const bind = <K extends keyof Form>(key: K) => ({
    id: `app-${key}`,
    name: key,
    value: form[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `app-${key}-error` : undefined,
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setField(key, e.target.value as Form[K]);
      if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`app-${first}`)?.focus();
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    submit();
    toast({
      title: "Заявка отправлена",
      description:
        "Секретариат свяжется с вами, чтобы согласовать передачу документов.",
    });
  };

  if (submittedAt) {
    return (
      <div className={cn("border border-petrol p-6 sm:p-8", className)}>
        <span className="grid size-10 place-items-center bg-petrol text-film">
          <CheckIcon size={20} strokeWidth={2} />
        </span>
        <h3 className="mt-6 text-h3">
          Заявка от {formatDate(submittedAt)} принята
        </h3>
        <p className="mt-3 max-w-xl text-steel">
          {form.organization} — контактное лицо {form.contactName}. Президент
          Ассоциации рассмотрит заявку после получения полного пакета
          документов; сейчас у вас отмечено {collected} из 14.
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={reset}>
          Заполнить новую заявку
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("grid gap-6", className)}
    >
      <Field
        label="Полное название организации"
        htmlFor="app-organization"
        error={errors.organization}
      >
        <Input autoComplete="organization" {...bind("organization")} />
      </Field>
      <Field label="Тип организации" htmlFor="app-type">
        <Select {...bind("type")}>
          {ORGANIZATION_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Страна" htmlFor="app-country">
          <Select {...bind("country")}>
            {[
              "Кыргызстан",
              "Казахстан",
              "Узбекистан",
              "Таджикистан",
              "Россия",
              "Другая страна",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Город" htmlFor="app-city" error={errors.city}>
          <Input autoComplete="address-level2" {...bind("city")} />
        </Field>
        <Field
          label="Контактное лицо"
          htmlFor="app-contactName"
          error={errors.contactName}
        >
          <Input autoComplete="name" {...bind("contactName")} />
        </Field>
        <Field label="Должность" htmlFor="app-position" optional>
          <Input autoComplete="organization-title" {...bind("position")} />
        </Field>
        <Field
          label="Электронная почта"
          htmlFor="app-email"
          error={errors.email}
        >
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            {...bind("email")}
          />
        </Field>
        <Field label="Телефон" htmlFor="app-phone" error={errors.phone}>
          <Input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+996"
            {...bind("phone")}
          />
        </Field>
      </div>
      <Field
        label="Чем организация может быть полезна Ассоциации"
        htmlFor="app-comment"
        optional
      >
        <Textarea rows={4} {...bind("comment")} />
      </Field>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-small text-steel">
          Демонстрационная версия: заявка сохраняется только в этом браузере.
        </p>
        <Button type="submit" disabled={sending} className="sm:min-w-52">
          {sending ? "Отправляем…" : "Отправить заявку"}
        </Button>
      </div>
    </form>
  );
}
