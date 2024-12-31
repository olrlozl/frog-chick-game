import { useEffect } from 'react';

export const useTouchEndListener = (
  row: number,
  col: number,
  dropCharacter: Function
) => {
  useEffect(() => {
    // 터치가 끝났을 때 실행되는 이벤트 핸들러
    const handleDropAttempt = () => {
      const bounds = document
        .querySelector(`.square.row-${row}.col-${col}`) // 해당 square의 DOM 요소를 선택
        ?.getBoundingClientRect(); // 해당 square의 크기와 위치를 가져오기

      const touchingPosition = (window as any).touchingPosition; // 현재 터치 중인 위치 정보

      // square 영역 내에 있으면 드롭 처리
      if (
        bounds &&
        touchingPosition &&
        touchingPosition.x >= bounds.left &&
        touchingPosition.x <= bounds.right &&
        touchingPosition.y >= bounds.top &&
        touchingPosition.y <= bounds.bottom
      ) {
        dropCharacter();
      }
    };

    // 터치 이벤트 리스너 등록
    window.addEventListener('character-touch-end', handleDropAttempt); // `character-touch-end` 이벤트 발생 시 handleDropAttempt 함수 실행

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('character-touch-end', handleDropAttempt);
    };
  }, [row, col, dropCharacter]);
};
