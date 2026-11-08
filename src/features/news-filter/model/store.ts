import { create } from "zustand";

import type { NewsCategory } from "@/shared/api";

export type CategoryFilter = NewsCategory | "all";

interface NewsFilterState {
  category: CategoryFilter;
  query: string;
  reset: () => void;
  setCategory: (category: CategoryFilter) => void;
  setQuery: (query: string) => void;
}

/**
 * Состояние фильтра живёт в сторе, а не в компоненте страницы: при переходе
 * в новость и обратно читатель возвращается к той же выборке.
 */
export const useNewsFilterStore = create<NewsFilterState>((set) => ({
  category: "all",
  query: "",
  setCategory: (category) => set({ category }),
  setQuery: (query) => set({ query }),
  reset: () => set({ category: "all", query: "" }),
}));
