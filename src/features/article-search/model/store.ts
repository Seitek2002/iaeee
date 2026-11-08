import { create } from "zustand";

interface ArticleSearchState {
  /**
   * Раскрытые выпуски. null — читатель ещё ничего не трогал, и архив
   * показывает раскрытым самый свежий выпуск.
   */
  expanded: string[] | null;
  query: string;
  setQuery: (query: string) => void;
  toggle: (id: string, current: string[]) => void;
}

export const useArticleSearchStore = create<ArticleSearchState>((set) => ({
  query: "",
  expanded: null,
  setQuery: (query) => set({ query }),
  toggle: (id, current) =>
    set({
      expanded: current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id],
    }),
}));
