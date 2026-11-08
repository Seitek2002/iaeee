import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

interface SectionHeadingProps {
  action?: ReactNode;
  className?: string;
  description?: ReactNode;
  id?: string;
  title: ReactNode;
  tone?: "dark" | "light";
}

export function SectionHeading({
  title,
  description,
  action,
  className,
  id,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        <h2 id={id} className="text-h2">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-lead",
              tone === "dark" ? "text-on-dark-muted" : "text-steel",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
