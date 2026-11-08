import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const CONTACT_TOPICS = [
  "Экспертиза проекта или нормативного документа",
  "Инжиниринг и консультации",
  "Испытания и исследования",
  "Обучение и семинары",
  "Публикация статьи в «Вестнике МАЭСС»",
  "Членство и партнёрство",
  "Другой вопрос",
] as const;

export interface ContactDraft {
  email: string;
  message: string;
  name: string;
  organization: string;
  phone: string;
  topic: string;
}

const EMPTY: ContactDraft = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  topic: CONTACT_TOPICS[0],
  message: "",
};

interface ContactState {
  draft: ContactDraft;
  reset: () => void;
  setField: <K extends keyof ContactDraft>(
    key: K,
    value: ContactDraft[K],
  ) => void;
  /** Вызывается со страницы услуг: тема подставляется заранее. */
  setTopic: (topic: string) => void;
}

/**
 * Черновик обращения сохраняется в sessionStorage — если человек ушёл
 * посмотреть услуги и вернулся, текст не пропадёт. skipHydration +
 * ручной rehydrate в форме — чтобы серверный HTML совпал с первым рендером.
 */
export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      draft: EMPTY,
      setField: (key, value) =>
        set((s) => ({ draft: { ...s.draft, [key]: value } })),
      setTopic: (topic) => set((s) => ({ draft: { ...s.draft, topic } })),
      reset: () => set({ draft: EMPTY }),
    }),
    {
      name: "iaeee-contact-draft",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
