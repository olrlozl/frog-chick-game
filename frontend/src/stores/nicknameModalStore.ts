import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface NicknameModalState {
  isOpenNicknameModal: boolean;
  openNicknameModal: () => void;
  closeNicknameModal: () => void;
}

export const useNicknameModalStore = create<NicknameModalState>()(
  devtools((set) => ({
    isOpenNicknameModal: false,
    openNicknameModal: () => set({ isOpenNicknameModal: true }),
    closeNicknameModal: () => set({ isOpenNicknameModal: false }),
  }))
);
