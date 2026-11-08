import { create } from "zustand";

import type { CountryIso } from "@/shared/api";

interface ProgramFilterState {
  country: CountryIso | "all";
  /** Выбранный день программы, YYYY-MM-DD. null — первый день. */
  day: string | null;
  query: string;
  reset: () => void;
  setCountry: (country: CountryIso | "all") => void;
  setDay: (day: string) => void;
  setQuery: (query: string) => void;
}

export const useProgramFilterStore = create<ProgramFilterState>((set) => ({
  day: null,
  query: "",
  country: "all",
  setDay: (day) => set({ day }),
  setQuery: (query) => set({ query }),
  setCountry: (country) => set({ country }),
  reset: () => set({ query: "", country: "all" }),
}));
