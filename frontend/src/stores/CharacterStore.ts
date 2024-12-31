import { create } from 'zustand';

interface Position {
  row: number | null;
  col: number | null;
}

interface CharacterState {
  selectedCharacterKey: string | null;
  prevPosition: Position;
  setSelectedCharacterKey: (character: string | null) => void;
  setPrevPosition: (position: Position) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  selectedCharacterKey: null,
  prevPosition: { row: null, col: null },
  setSelectedCharacterKey: (key) => set({ selectedCharacterKey: key }),
  setPrevPosition: (position) => set({ prevPosition: position }),
}));
