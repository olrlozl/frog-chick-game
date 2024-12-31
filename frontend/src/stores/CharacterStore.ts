import { create } from 'zustand';

interface CharacterState {
  selectedCharacterKey: string | null;
  setSelectedCharacterKey: (character: string | null) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  selectedCharacterKey: null,
  setSelectedCharacterKey: (key) => set({ selectedCharacterKey: key }),
}));
