import type { FileKind } from "@/shared/api";
import { cn } from "@/shared/lib";

import { ArrowUpRightIcon, DownloadIcon, PlayIcon } from "./icons";

const KIND_LABEL: Record<FileKind, string> = {
  pdf: "PDF",
  docx: "DOCX",
  video: "Видео",
  link: "Ссылка",
};

interface FileLinkProps {
  className?: string;
  kind: FileKind;
  meta?: string;
  title: string;
  tone?: "dark" | "light";
  url: string;
}

/** Строка-ссылка на файл или внешний материал: формат слева, действие справа. */
export function FileLink({
  kind,
  title,
  url,
  meta,
  className,
  tone = "light",
}: FileLinkProps) {
  const Icon =
    kind === "video"
      ? PlayIcon
      : kind === "link"
        ? ArrowUpRightIcon
        : DownloadIcon;
  const dark = tone === "dark";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group grid grid-cols-[4rem_1fr_auto] items-baseline gap-4 border-b py-4 transition-colors sm:grid-cols-[4.5rem_1fr_auto]",
        dark
          ? "border-on-dark/15 hover:bg-on-dark/5"
          : "border-rule hover:bg-paper",
        className,
      )}
    >
      <span
        className={cn(
          "text-caption font-medium tracking-[0.04em]",
          dark ? "text-amber" : "text-steel",
        )}
      >
        {KIND_LABEL[kind]}
      </span>
      <span className="min-w-0">
        <span className="block leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {title}
        </span>
        {meta && (
          <span
            className={cn(
              "mt-1 block text-small",
              dark ? "text-on-dark-muted" : "text-steel",
            )}
          >
            {meta}
          </span>
        )}
      </span>
      <Icon
        size={18}
        className={cn(
          "translate-y-0.5 transition-transform group-hover:translate-x-0.5",
          dark ? "text-on-dark-muted" : "text-steel",
        )}
      />
    </a>
  );
}
