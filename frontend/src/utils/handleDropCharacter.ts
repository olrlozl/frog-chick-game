// 드래그한 character가 square에 드롭되었을 때 처리
export const handleDropCharacter = (
  row: number,
  col: number,
  handleUpdateBoard: Function
) => {
  const characterData = (window as any).currentTouchData; // window에서 현재 터치한 캐릭터 정보 가져오기
  if (characterData) {
    try {
      const { characterOption, characterSize } = JSON.parse(characterData); // 데이터 파싱하여 캐릭터 옵션과 크기 추출
      handleUpdateBoard(row, col, { characterOption, characterSize }); // 캐릭터 이동 처리
      (window as any).currentTouchData = null; // 터치 데이터 초기화
    } catch (error) {
      console.error('Error parsing touch data', error); // 데이터 파싱 중 에러 처리
    }
  }
};
