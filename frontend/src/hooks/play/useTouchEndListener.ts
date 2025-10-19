import { usePlayStore } from 'stores/playStore';
import { useEffect } from 'react';
import { placeCharacter } from 'utils/placeCharacter';

export const useTouchEndListener = (row: number, col: number) => {
  const { selectedCharacter, prevPosition } = usePlayStore();

  useEffect(() => {
    const handleDrop = () => {
      const squareElement = document.querySelector(
        `.square.row-${row}.col-${col}`
      );
      if (!squareElement) return;

      const bounds = squareElement.getBoundingClientRect(); // DOM 요소 square의 크기와 위치
      const pos = (window as any).touchingPosition; // 현재 터치 중인 위치 정보

      const isInsideSquare =
        pos.x >= bounds.left &&
        pos.x <= bounds.right &&
        pos.y >= bounds.top &&
        pos.y <= bounds.bottom;

      if (selectedCharacter && isInsideSquare) {
        placeCharacter(row, col, selectedCharacter, prevPosition);
      }
    };

    // 터치 이벤트 리스너 등록 (`play:character:touchEnd` 이벤트 발생 시 handleDrop 함수 실행)
    window.addEventListener('play:character:touchEnd', handleDrop);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('play:character:touchEnd', handleDrop);
    };
  }, [row, col, prevPosition, selectedCharacter]);
};
