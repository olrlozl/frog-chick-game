import { useState, useEffect } from 'react';

export const useTouchTracking = () => {
  // 이동 중인 캐릭터의 위치(x, y)와 콘텐츠(content)를 저장할 상태를 선언
  const [movingCharacter, setMovingCharacter] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  useEffect(() => {
    // 이동 중인 요소의 위치와 콘텐츠를 업데이트하는 함수
    const handleTouchMove = (e: any) => {
      setMovingCharacter({
        x: e.detail.x,
        y: e.detail.y,
        content: e.detail.data,
      });
    };

    // 터치가 끝났을 때, 이동 중인 요소를 null로 초기화하는 함수
    const handleTouchEnd = () => {
      setMovingCharacter(null);
    };

    // 터치 이벤트 리스너 등록
    window.addEventListener('character-touch-move', handleTouchMove); // character-touch-move 이벤트 발생 시 handleTouchMove 함수 실행
    window.addEventListener('character-touch-end', handleTouchEnd); // character-touch-end 이벤트 발생 시 handleTouchEnd 함수 실행

    // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거하여 메모리 누수 방지
    return () => {
      window.removeEventListener('character-touch-move', handleTouchMove);
      window.removeEventListener('character-touch-end', handleTouchEnd);
    };
  }, []);
};
