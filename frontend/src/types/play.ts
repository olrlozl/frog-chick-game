export interface Player {
  userId: string;
  nickname: string;
  characterOption: CharacterOptionType;
}

export type PlayerType = 'player1' | 'player2';

export type CharacterOptionType = 'frog' | 'chick';

export type CharacterSizeType = 'large' | 'middle' | 'small';

export const sizeRank: Record<CharacterSizeType, number> = {
  small: 1,
  middle: 2,
  large: 3,
};

export interface CharacterInfoInterface {
  characterOption: CharacterOptionType;
  characterSize: CharacterSizeType;
  characterKey: string;
}

export type CharacterPosition =
  | { row: number; col: number }
  | { row: null; col: null };

export type BoardCell = CharacterInfoInterface[];
export type Board = BoardCell[][];
