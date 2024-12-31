// 모바일 터치 이동 처리
export const handleTouchMoveCharacter = (
  e: React.TouchEvent<HTMLImageElement>,
  dragShadowImgRef: React.RefObject<HTMLImageElement | null>
) => {
  const touch = e.touches[0];
  (window as any).touchingPosition = { x: touch.clientX, y: touch.clientY }; // 터치 중인 위치를 계속해서 window 객체에 저장하여, 터치 위치 추적

  // 현재 터치 위치에 맞춰 쉐도우 이미지 위치 업데이트
  if (dragShadowImgRef.current) {
    dragShadowImgRef.current.style.left = `${touch.clientX}px`;
    dragShadowImgRef.current.style.top = `${touch.clientY}px`;
  }

  // 터치 중인 위치를 다른 곳에서 처리할 수 있도록 customEvent를 만들어 window 객체에 dispatch
  const customEvent = new CustomEvent('character-touch-move', {
    detail: { x: touch.clientX, y: touch.clientY },
  });
  window.dispatchEvent(customEvent);
};
