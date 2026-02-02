import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface NicknameModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useNicknameModalStore = create<NicknameModalState>()(
  devtools((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  }))
);
