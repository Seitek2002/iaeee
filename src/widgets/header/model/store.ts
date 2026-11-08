import { create } from "zustand";

interface MenuState {
  close: () => void;
  open: boolean;
  toggle: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  open: false,
  toggle: () => set((s) => ({ open: !s.open })),
  close: () => set({ open: false }),
}));
