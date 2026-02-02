import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type User = {
  userId: string;
  nickname: string | null;
};

type UserState = {
  isAuthed: boolean;
  user: User | null;
  setLogin: (u: User) => void;
  setNickname: (nickname: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        isAuthed: false,
        user: null,
        setLogin: (u) => set({ isAuthed: true, user: u }),
        setNickname: (nickname) =>
          set((state) =>
            state.user ? { user: { ...state.user, nickname } } : state
          ),
        logout: () => set({ isAuthed: false, user: null }),
      }),
      { name: 'UserStore' }
    ),
    { name: 'UserStore' }
  )
);
