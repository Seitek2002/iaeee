import { create } from "zustand";
import { persist } from "zustand/middleware";

export const ORGANIZATION_TYPES = [
  "Проектная организация",
  "Строительная компания",
  "Научно-исследовательский институт",
  "Университет или колледж",
  "Государственное учреждение",
  "Производитель материалов или систем сейсмозащиты",
  "Другое",
] as const;

export interface ApplicationForm {
  city: string;
  comment: string;
  contactName: string;
  country: string;
  email: string;
  organization: string;
  phone: string;
  position: string;
  type: string;
}

const EMPTY_FORM: ApplicationForm = {
  organization: "",
  type: ORGANIZATION_TYPES[0],
  country: "Кыргызстан",
  city: "",
  contactName: "",
  position: "",
  email: "",
  phone: "",
  comment: "",
};

interface ApplicationState {
  /** Индексы собранных документов из перечня Положения о членстве. */
  collected: number[];
  form: ApplicationForm;
  reset: () => void;
  setField: <K extends keyof ApplicationForm>(
    key: K,
    value: ApplicationForm[K],
  ) => void;
  submit: () => void;
  submittedAt: string | null;
  toggleDocument: (index: number) => void;
}

/**
 * Подготовка к вступлению — дело не одного дня: документы собираются
 * неделями. Поэтому и чек-лист, и черновик заявки хранятся в localStorage.
 */
export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      collected: [],
      form: EMPTY_FORM,
      submittedAt: null,
      toggleDocument: (index) =>
        set((s) => ({
          collected: s.collected.includes(index)
            ? s.collected.filter((i) => i !== index)
            : [...s.collected, index],
        })),
      setField: (key, value) =>
        set((s) => ({ form: { ...s.form, [key]: value } })),
      submit: () => set({ submittedAt: new Date().toISOString() }),
      reset: () => set({ collected: [], form: EMPTY_FORM, submittedAt: null }),
    }),
    { name: "iaeee-membership-application", skipHydration: true },
  ),
);
