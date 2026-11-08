import type { ComponentProps } from "react";

import Link from "next/link";

import { cn } from "@/shared/lib";

type Variant =
  | "amber"
  | "ghost-light"
  | "outline"
  | "outline-light"
  | "primary";
type Size = "md" | "sm";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-petrol text-film hover:bg-petrol-soft",
  outline:
    "border border-petrol/80 text-petrol hover:bg-petrol hover:text-film hover:border-petrol",
  amber: "bg-amber text-petrol hover:bg-[#f3c234]",
  "outline-light":
    "border border-on-dark/35 text-on-dark hover:border-on-dark hover:bg-on-dark/5",
  "ghost-light": "text-on-dark hover:bg-on-dark/10",
};

const SIZES: Record<Size, string> = {
  md: "h-12 px-6 text-[0.9375rem]",
  sm: "h-10 px-4 text-small",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[2px] font-medium tracking-[-0.005em] whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
  );
}

type ButtonProps = ComponentProps<"button"> & {
  size?: Size;
  variant?: Variant;
};

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClass(variant, size), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClass(variant, size), className)} {...props} />
  );
}

/** Текстовая ссылка с подчёркиванием, проявляющимся при наведении. */
export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-1.5 font-medium underline decoration-current/30 decoration-1 underline-offset-[5px] transition-colors hover:decoration-current",
        className,
      )}
      {...props}
    />
  );
}
