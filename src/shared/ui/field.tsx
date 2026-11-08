import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib";

import { CheckIcon } from "./icons";

const control =
  "w-full rounded-[2px] border border-rule-strong bg-paper px-4 text-body text-petrol placeholder:text-steel/70 transition-colors hover:border-petrol/60 focus:border-petrol focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-invalid:border-[#b3261e]";

interface FieldProps {
  children: ReactNode;
  error?: string;
  hint?: string;
  htmlFor: string;
  label: string;
  optional?: boolean;
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-small font-medium">
        {label}
        {optional && (
          <span className="font-normal text-steel"> — необязательно</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-small text-[#b3261e]">
          {error}
        </p>
      ) : hint ? (
        <p className="text-small text-steel">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        control,
        "min-h-36 resize-y py-3 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(control, "h-12 appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-steel"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn("group flex cursor-pointer items-start gap-3", className)}
    >
      <span className="relative mt-[3px] grid size-5 shrink-0 place-items-center">
        <input
          id={id}
          type="checkbox"
          className="peer absolute inset-0 size-5 cursor-pointer appearance-none rounded-[2px] border border-rule-strong bg-paper transition-colors checked:border-petrol checked:bg-petrol hover:border-petrol/60"
          {...props}
        />
        <CheckIcon
          size={14}
          strokeWidth={2}
          className="pointer-events-none relative text-film opacity-0 peer-checked:opacity-100"
        />
      </span>
      <span className="leading-snug">{label}</span>
    </label>
  );
}
