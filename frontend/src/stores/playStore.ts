import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Board,
  CharacterOptionType,
  CharacterInfoInterface,
  CharacterPosition,
  sizeRank,
} from 'types/play';
import { checkBingo } from 'utils/checkBingo';

interface PlayState {
  winner: CharacterOptionType | null;
  board: Board;
  topLayer: (CharacterOptionType | null)[][];
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
  addUsedCharacter: (key: string) => void;
  setShakeCharacter: (key: string | null) => void;
}

export const usePlayStore = create<PlayState & PlayAction>()(
  devtools(
    (set) => ({
      winner: null,
      board: Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => [])
      ),
      topLayer: Array.from({ length: 3 }, () => Array(3).fill(null)),
      selectedCharacter: null,
      prevPosition: { row: null, col: null },
      usedCharacterKeys: [],
      shakeCharacterKey: null,

      updateBoard: (prevPosition, nextPosition, characterInfo) => {
        set((state) => {
          const updatedBoard = state.board.map((row) =>
            row.map((cell) => [...cell])
          );

          const updatedTopLayer = state.topLayer.map((row) => [...row]);

          // 새 위치에 말 추가
          const targetCell = updatedBoard[nextPosition.row][nextPosition.col];
          targetCell.push(characterInfo);

          // 새 위치 topLayer 갱신
          updatedTopLayer[nextPosition.row][nextPosition.col] =
            characterInfo.characterOption;

          if (prevPosition.row !== null && prevPosition.col !== null) {
            // 이전 위치에서 말 제거
            updatedBoard[prevPosition.row][prevPosition.col] = updatedBoard[
              prevPosition.row
            ][prevPosition.col].filter(
              (c) => c.characterKey !== characterInfo.characterKey
            );

            // 이전 위치 topLayer 갱신
            updatedTopLayer[prevPosition.row][prevPosition.col] =
              updatedBoard[prevPosition.row][prevPosition.col].length > 0
                ? updatedBoard[prevPosition.row][prevPosition.col].reduce(
                    (max, curr) =>
                      sizeRank[curr.characterSize] > sizeRank[max.characterSize]
                        ? curr
                        : max
                  ).characterOption
                : null;
          }

          const winner = checkBingo(updatedTopLayer);

          return { board: updatedBoard, topLayer: updatedTopLayer, winner };
        });
      },
      setSelectedCharacter: (characterInfo) =>
        set({ selectedCharacter: characterInfo }),
      setPrevPosition: (position) => set({ prevPosition: position }),
      addUsedCharacter: (key) =>
        set((state) => ({
          usedCharacterKeys: [...state.usedCharacterKeys, key],
        })),
      setShakeCharacter: (key) => set({ shakeCharacterKey: key }),
    }),
    { name: 'PlayStore' }
  )
);
