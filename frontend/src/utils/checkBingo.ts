import { CharacterOptionType } from 'types/play';

export const checkBingo = (
  topLayer: (CharacterOptionType | null)[][]
): {
  winners: CharacterOptionType[];
  bingoCells: { row: number; col: number }[];
} => {
  const bingoCells: { row: number; col: number }[] = [];
  const winners = new Set<CharacterOptionType>();

  // 가로
  for (let row = 0; row < 3; row++) {
    const [a, b, c] = topLayer[row];
    if (a && a === b && a === c) {
      winners.add(a);
      bingoCells.push({ row, col: 0 }, { row, col: 1 }, { row, col: 2 });
    }
  }

  // 세로
  for (let col = 0; col < 3; col++) {
    const a = topLayer[0][col];
    const b = topLayer[1][col];
    const c = topLayer[2][col];
    if (a && a === b && a === c) {
      winners.add(a);
      bingoCells.push({ row: 0, col }, { row: 1, col }, { row: 2, col });
    }
  }

  // 대각선 ↘
  const center = topLayer[1][1];
  if (center && topLayer[0][0] === center && topLayer[2][2] === center) {
    winners.add(center);
    bingoCells.push({ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 });
  }

  // 대각선 ↙
  if (center && topLayer[0][2] === center && topLayer[2][0] === center) {
    winners.add(center);
    bingoCells.push({ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 });
  }

  return { winners: Array.from(winners), bingoCells };
};
