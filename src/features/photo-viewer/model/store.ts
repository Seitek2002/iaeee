import { create } from "zustand";

interface ViewerState {
  close: () => void;
  images: string[];
  index: number;
  next: () => void;
  open: boolean;
  prev: () => void;
  show: (images: string[], index: number) => void;
}

export const usePhotoViewerStore = create<ViewerState>((set) => ({
  images: [],
  index: 0,
  open: false,
  show: (images, index) => set({ images, index, open: true }),
  close: () => set({ open: false }),
  next: () => set((s) => ({ index: (s.index + 1) % s.images.length })),
  prev: () =>
    set((s) => ({ index: (s.index - 1 + s.images.length) % s.images.length })),
}));
