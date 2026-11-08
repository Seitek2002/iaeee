"use client";

import { useEffect, useState } from "react";

import { Button, Field, Input, Select, Textarea, toast } from "@/shared/ui";

import {
  CONTACT_TOPICS,
  type ContactDraft,
  useContactStore,
} from "../model/store";

type Errors = Partial<Record<keyof ContactDraft, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(d: ContactDraft): Errors {
  const errors: Errors = {};
  if (!d.name.trim()) errors.name = "Укажите, как к вам обращаться";
  if (!EMAIL_RE.test(d.email.trim()))
    errors.email = "Нужен адрес вида name@example.com — на него придёт ответ";
  if (d.message.trim().length < 10)
    errors.message = "Опишите вопрос хотя бы в одном-двух предложениях";
  return errors;
}

export function ContactForm() {
  const draft = useContactStore((s) => s.draft);
  const setField = useContactStore((s) => s.setField);
  const reset = useContactStore((s) => s.reset);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    useContactStore.persist.rehydrate();
  }, []);

  const bind = <K extends keyof ContactDraft>(key: K) => ({
    id: `contact-${key}`,
    name: key,
    value: draft[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setField(key, e.target.value as ContactDraft[K]);
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(draft);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setSending(true);
    // Демо-режим: имитируем отправку, бэкенда пока нет.
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    reset();
    toast({
      title: "Сообщение отправлено",
      description: `Ответим на ${draft.email} в течение двух рабочих дней.`,
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Имя и фамилия" htmlFor="contact-name" error={errors.name}>
          <Input autoComplete="name" {...bind("name")} />
        </Field>
        <Field label="Организация" htmlFor="contact-organization" optional>
          <Input autoComplete="organization" {...bind("organization")} />
        </Field>
        <Field
          label="Электронная почта"
          htmlFor="contact-email"
          error={errors.email}
        >
          <Input
            type="email"
            autoComplete="email"
            inputMode="email"
            {...bind("email")}
          />
        </Field>
        <Field label="Телефон" htmlFor="contact-phone" optional>
          <Input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+996"
            {...bind("phone")}
          />
        </Field>
      </div>
      <Field label="Тема" htmlFor="contact-topic">
        <Select {...bind("topic")}>
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Вопрос" htmlFor="contact-message" error={errors.message}>
        <Textarea
          rows={6}
          placeholder="Объект, задача, сроки — всё, что поможет ответить по существу"
          {...bind("message")}
        />
      </Field>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-small text-steel">
          Демонстрационная версия сайта: форма пока не отправляет данные.
        </p>
        <Button type="submit" disabled={sending} className="sm:min-w-52">
          {sending ? "Отправляем…" : "Отправить сообщение"}
        </Button>
      </div>
    </form>
  );
}
