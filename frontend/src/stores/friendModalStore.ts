import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type FriendModal =
  | { type: 'DELETE_FRIEND'; nickname: string }
  | { type: 'INVITE_SENT'; nickname: string }
  | { type: 'INVITE_RECEIVED'; nickname: string }
  | { type: 'INVITE_READY'; nickname: string }
  | null;

interface FriendModalState {
  modal: FriendModal;
  openModal: (modal: FriendModal) => void;
  closeModal: () => void;
}

export const useFriendModalStore = create<FriendModalState>()(
  devtools((set) => ({
    modal: null,
    openModal: (modal) => set({ modal }),
    closeModal: () => set({ modal: null }),
  }))
);
