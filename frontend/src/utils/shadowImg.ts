import { CharacterInfoInterface } from 'types/play';

export const createShadowImgAndTrackTouch = (
  e: React.TouchEvent<HTMLImageElement>,
  characterInfo: CharacterInfoInterface,
  imageSrc: string,
  dragShadowImgRef: React.RefObject<HTMLImageElement | null>
) => {
  const touch = e.touches[0]; // 터치 이벤트에서 첫 번째 터치 정보 가져오기 (여러 손가락을 사용한 터치를 감지할 수 있기 때문)
  (window as any).touchingPosition = { x: touch.clientX, y: touch.clientY }; // 현재 터치 위치를 window 객체에 저장 (터치 중 위치 추적에 사용)

  const dragShadowImg = document.createElement('img'); // 드래그 시 생성되는 캐릭터 이미지를 위한 img 요소 동적 생성
  dragShadowImg.src = imageSrc; // 터치한 캐릭터와 동일한 이미지 표시
  dragShadowImg.className = `character-img ${characterInfo.characterOption} ${characterInfo.characterSize}`; // 스타일 지정을 위한 클래스이름 적용

  Object.assign(dragShadowImg.style, {
    position: 'absolute',
    pointerEvents: 'none', // 쉐도우 이미지가 다른 요소와 상호작용하지 않도록 함
    zIndex: '1000',
    transform: 'translate(-50%, -50%)', // 이미지의 중심을 기준으로 드래그
    left: `${touch.clientX}px`, // 터치 시작 시 쉐도우 이미지 위치 설정
    top: `${touch.clientY}px`,
  });

  document.body.appendChild(dragShadowImg); // 쉐도우 이미지를 body에 추가하여 화면에 표시되게 함
  dragShadowImgRef.current = dragShadowImg; // 쉐도우 이미지의 참조 저장 (이후 위치 업데이트 및 제거에 사용)
};

export const updateShadowImgAndTrackTouch = (
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
};

export const removeShadowImgAndDispatchEndEvent = (
  dragShadowImgRef: React.RefObject<HTMLImageElement | null>
) => {
  if (dragShadowImgRef.current) {
    dragShadowImgRef.current.remove(); // DOM에서 쉐도우 이미지 제거
    dragShadowImgRef.current = null; // 참조를 초기화하여 메모리에서 해제
  }

  // 터치 종료 이벤트를 커스텀 이벤트로 생성하여 dispatch
  const customEvent = new CustomEvent('play:character:touchEnd');
  window.dispatchEvent(customEvent);
};
