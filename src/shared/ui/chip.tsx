import type { ComponentProps } from "react";

import { cn } from "@/shared/lib";

type ChipProps = ComponentProps<"button"> & {
  active?: boolean;
  count?: number;
};

/** Переключатель-фильтр. Активный — залитый «петролем». */
export function Chip({
  active,
  count,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-2 rounded-[2px] border px-4 text-small font-medium transition-colors",
        active
          ? "border-petrol bg-petrol text-film"
          : "border-rule-strong text-petrol hover:border-petrol",
        className,
      )}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span className={cn("tabular", active ? "text-film/60" : "text-steel")}>
          {count}
        </span>
      )}
    </button>
  );
}
