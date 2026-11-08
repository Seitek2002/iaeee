"use client";

import type { ReactNode } from "react";

import { SearchDialog } from "@/features/global-search";

import type { SearchEntry } from "@/shared/api";
import { Toaster } from "@/shared/ui";

/**
 * Глобальные клиентские узлы: поиск по сайту и уведомления. Индекс поиска
 * собирается на сервере (корневой layout) и приходит сюда пропом.
 */
export function Providers({
  children,
  searchIndex,
}: {
  children: ReactNode;
  searchIndex: SearchEntry[];
}) {
  return (
    <>
      {children}
      <SearchDialog index={searchIndex} />
      <Toaster />
    </>
  );
}
