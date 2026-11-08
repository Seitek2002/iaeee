import { create } from "zustand";

interface SearchState {
  close: () => void;
  open: boolean;
  openSearch: () => void;
  query: string;
  setQuery: (query: string) => void;
  toggle: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  open: false,
  query: "",
  openSearch: () => set({ open: true }),
  // Запрос сбрасываем при закрытии: следующее открытие — с чистого листа.
  close: () => set({ open: false, query: "" }),
  toggle: () => set((s) => ({ open: !s.open, query: s.open ? "" : s.query })),
  setQuery: (query) => set({ query }),
}));
