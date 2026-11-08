"use client";

import { useState } from "react";

import { cn } from "@/shared/lib";
import { Button, toast } from "@/shared/ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Подписка на новые выпуски «Вестника». В демо — без отправки. */
export function SubscribeForm({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dark = tone === "dark";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Нужен адрес вида name@example.com");
      return;
    }
    setError("");
    setEmail("");
    toast({
      title: "Подписка оформлена",
      description: `Пришлём оглавление следующего выпуска на ${email.trim()}.`,
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      <label
        htmlFor={`subscribe-${tone}`}
        className={cn("text-small", dark ? "text-on-dark-muted" : "text-steel")}
      >
        Новые выпуски на почту
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        <input
          id={`subscribe-${tone}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="name@example.com"
          aria-invalid={error ? true : undefined}
          className={cn(
            "h-12 min-w-48 flex-1 rounded-[2px] border px-4 focus:outline-none",
            dark
              ? "border-on-dark/30 bg-transparent text-on-dark placeholder:text-on-dark-muted/60 focus:border-amber"
              : "border-rule-strong bg-paper placeholder:text-steel/70 focus:border-petrol",
          )}
        />
        <Button type="submit" variant={dark ? "amber" : "primary"}>
          Подписаться
        </Button>
      </div>
      {error && (
        <p
          className={cn(
            "mt-2 text-small",
            dark ? "text-amber" : "text-[#b3261e]",
          )}
        >
          {error}
        </p>
      )}
    </form>
  );
}
