import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Player,
  PlayerType,
  Board,
  CharacterOptionType,
  CharacterInfoInterface,
  CharacterPosition,
  sizeRank,
} from 'types/play';
import { checkBingo } from 'utils/checkBingo';
import { TURN_TIME_LIMIT } from 'constants/play';
import { SoundManager } from 'utils/soundManager';

interface PlayState {
  player1: Player;
  player2: Player;
  turn: PlayerType;
  time: number;
  timerId: NodeJS.Timeout | null;
  winners: CharacterOptionType[];
  board: Board;
  topLayer: (CharacterOptionType | null)[][];
  curSelectedCharacter: CharacterInfoInterface | null;
  lastPlacedCharacter: CharacterInfoInterface | null;
  prevPosition: CharacterPosition;
  usedCharacterKeys: string[];
  shakeCharacterKey: string | null;
  bingoCells: { row: number; col: number }[];
}

interface PlayAction {
  startTimer: () => void;
  switchTurn: () => void;
  decrementTime: () => void;
  stopTimer: () => void;
  updateBoard: (
    prevPosition: CharacterPosition,
    nextPosition: { row: number; col: number },
    characterInfo: CharacterInfoInterface
  ) => void;
  setCurSelectedCharacter: (
    characterInfo: CharacterInfoInterface | null
  ) => void;
  setLastPlacedCharacter: (
    characterInfo: CharacterInfoInterface | null
  ) => void;
  setPrevPosition: (position: CharacterPosition) => void;
  addUsedCharacter: (key: string) => void;
  setShakeCharacter: (key: string | null) => void;
  resetGame: () => void;
}

export const usePlayStore = create<PlayState & PlayAction>()(
  devtools(
    (set, get) => ({
      player1: {
        userId: '',
        nickname: '짱구는못말려',
        characterOption: 'green',
      },
      player2: { userId: '', nickname: '이응지읒', characterOption: 'yellow' },
      turn: 'player1',
      time: TURN_TIME_LIMIT,
      timerId: null,
      winners: [],
      board: Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => [])
      ),
      topLayer: Array.from({ length: 3 }, () => Array(3).fill(null)),
      curSelectedCharacter: null,
      lastPlacedCharacter: null,
      prevPosition: { row: null, col: null },
      usedCharacterKeys: [],
      shakeCharacterKey: null,
      bingoCells: [],

      startTimer: () => {
        const oldTimer = get().timerId;
        if (oldTimer) clearInterval(oldTimer);

        const newTimer = setInterval(() => {
          const { time, decrementTime } = get();
          if (time > 0) decrementTime();
          else {
            SoundManager.timeOver();
            get().switchTurn();
          }
        }, TURN_TIME_LIMIT * 100);

        set({ time: TURN_TIME_LIMIT, timerId: newTimer });
      },

      decrementTime: () => set((state) => ({ time: state.time - 1 })),

      switchTurn: () => {
        const { timerId } = get();
        if (timerId) clearInterval(timerId);

        set((state) => ({
          turn: state.turn === 'player1' ? 'player2' : 'player1',
          time: TURN_TIME_LIMIT,
          timerId: null,
          curSelectedCharacter: null,
        }));

        get().startTimer();
      },

      stopTimer: () => {
        const { timerId } = get();
        if (timerId) clearInterval(timerId);
        set({ timerId: null });
      },

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

          const { winners, bingoCells } = checkBingo(updatedTopLayer);

          if (winners.length > 0) SoundManager.bingo();

          return {
            board: updatedBoard,
            topLayer: updatedTopLayer,
            winners,
            bingoCells,
          };
        });
      },

      setCurSelectedCharacter: (characterInfo) =>
        set({ curSelectedCharacter: characterInfo }),
      setLastPlacedCharacter: (characterInfo) =>
        set({ lastPlacedCharacter: characterInfo }),
      setPrevPosition: (position) => set({ prevPosition: position }),
      addUsedCharacter: (key) =>
        set((state) => ({
          usedCharacterKeys: [...state.usedCharacterKeys, key],
        })),
      setShakeCharacter: (key) => set({ shakeCharacterKey: key }),

      resetGame: () => {
        const { stopTimer } = get();
        stopTimer();

        set({
          turn: 'player1',
          time: TURN_TIME_LIMIT,
          timerId: null,
          winners: [],
          board: Array.from({ length: 3 }, () =>
            Array.from({ length: 3 }, () => [])
          ),
          topLayer: Array.from({ length: 3 }, () => Array(3).fill(null)),
          curSelectedCharacter: null,
          lastPlacedCharacter: null,
          prevPosition: { row: null, col: null },
          usedCharacterKeys: [],
          shakeCharacterKey: null,
          bingoCells: [],
        });
      },
    }),
    { name: 'PlayStore' }
  )
);
