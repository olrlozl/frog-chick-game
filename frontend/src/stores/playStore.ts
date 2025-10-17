import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Board, CharacterInfoInterface, CharacterPosition } from 'types/play';

interface PlayState {
  board: Board;
  selectedCharacter: CharacterInfoInterface | null;
  prevPosition: CharacterPosition;
  usedCharacterKeys: string[];
  shakeCharacterKey: string | null;
}

interface PlayAction {
  updateBoard: (
    prevPosition: CharacterPosition,
    nextPosition: { row: number; col: number },
    characterInfo: CharacterInfoInterface
  ) => void;
  setSelectedCharacter: (characterInfo: CharacterInfoInterface | null) => void;
  setPrevPosition: (position: CharacterPosition) => void;
  resetSelectionState: () => void;
  addUsedCharacter: (key: string) => void;
  setShakeCharacter: (key: string | null) => void;
}

export const usePlayStore = create<PlayState & PlayAction>()(
  devtools(
    (set) => ({
      board: Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => [])
      ),
      selectedCharacter: null,
      prevPosition: { row: null, col: null },
      usedCharacterKeys: [],
      shakeCharacterKey: null,

      updateBoard: (prevPosition, nextPosition, characterInfo) => {
        set((state) => {
          const updatedBoard = state.board.map((row) =>
            row.map((cell) => [...cell])
          );

          // 타겟 위치에 말 추가
          const targetCell = updatedBoard[nextPosition.row][nextPosition.col];
          targetCell.push(characterInfo);

          // 이전 위치에서 말 제거
          if (prevPosition.row !== null && prevPosition.col !== null) {
            updatedBoard[prevPosition.row][prevPosition.col] = updatedBoard[
              prevPosition.row
            ][prevPosition.col].filter(
              (c) => c.characterKey !== characterInfo.characterKey
            );
          }

          return { board: updatedBoard };
        });
      },
      setSelectedCharacter: (characterInfo) =>
        set({ selectedCharacter: characterInfo }),
      setPrevPosition: (position) => set({ prevPosition: position }),
      resetSelectionState: () =>
        set({
          selectedCharacter: null,
          prevPosition: { row: null, col: null },
        }),
      addUsedCharacter: (key) =>
        set((state) => ({
          usedCharacterKeys: [...state.usedCharacterKeys, key],
        })),
      setShakeCharacter: (key) => set({ shakeCharacterKey: key }),
    }),
    { name: 'PlayStore' }
  )
);
