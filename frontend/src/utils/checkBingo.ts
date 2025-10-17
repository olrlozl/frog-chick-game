import { CharacterOptionType } from 'types/play';

export const checkBingo = (
  topLayer: (CharacterOptionType | null)[][]
): CharacterOptionType | null => {
  const size = 3;

  // 가로 체크
  for (let row = 0; row < size; row++) {
    const first = topLayer[row][0];
    if (first && topLayer[row].every((cell) => cell === first)) {
      return first;
    }
  }

  // 세로 체크
  for (let col = 0; col < size; col++) {
    const first = topLayer[0][col];
    if (first && topLayer.every((row) => row[col] === first)) {
      return first;
    }
  }

  // 대각선 체크 (좌상→우하)
  const center = topLayer[1][1];
  if (center && topLayer[0][0] === center && topLayer[2][2] === center) {
    return center;
  }

  // 대각선 체크 (우상→좌하)
  if (center && topLayer[0][2] === center && topLayer[2][0] === center) {
    return center;
  }

  return null; // 아직 승리 없음
};
