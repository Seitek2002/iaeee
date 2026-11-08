import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RegistrationDraft {
  arrival: string;
  city: string;
  country: string;
  degree: string;
  email: string;
  format: "offline" | "online";
  fullName: string;
  organization: string;
  paperTitle: string;
  phone: string;
  role: "listener" | "publication" | "speaker";
  transfer: boolean;
}

export const EMPTY_DRAFT: RegistrationDraft = {
  fullName: "",
  degree: "",
  organization: "",
  country: "",
  city: "",
  email: "",
  phone: "",
  role: "speaker",
  format: "offline",
  paperTitle: "",
  transfer: false,
  arrival: "",
};

interface RegistrationState {
  draft: RegistrationDraft;
  reset: () => void;
  setField: <K extends keyof RegistrationDraft>(
    key: K,
    value: RegistrationDraft[K],
  ) => void;
  submit: () => void;
  submittedAt: string | null;
}

/** Черновик регистрации сохраняется в браузере — заполнить можно в несколько заходов. */
export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      draft: EMPTY_DRAFT,
      submittedAt: null,
      setField: (key, value) =>
        set((s) => ({ draft: { ...s.draft, [key]: value } })),
      submit: () => set({ submittedAt: new Date().toISOString() }),
      reset: () => set({ draft: EMPTY_DRAFT, submittedAt: null }),
    }),
    { name: "icee-registration-draft", skipHydration: true },
  ),
);
