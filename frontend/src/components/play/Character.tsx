import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/character.scss';
import { CHARACTER_MAP } from 'constants/characterMap';
import { useRef } from 'react';

interface CharacterProps {
  characterOption: CharacterOptionType;
  characterSize: CharacterSizeType;
}

const Character = ({ characterOption, characterSize }: CharacterProps) => {
  const imageSrc = CHARACTER_MAP[characterOption][characterSize];
  const dragPreviewRef = useRef<HTMLImageElement | null>(null); // 드래그 시 생성된 가상 이미지를 참조하기 위함

  // 모바일 터치 시작 처리
  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    const touch = e.touches[0]; // 터치 이벤트에서 첫 번째 터치 정보 가져오기 (여러 손가락을 사용한 터치를 감지할 수 있기 때문)
    const characterData = JSON.stringify({ characterOption, characterSize }); // JSON 형태로 직렬화

    (window as any).currentDragData = characterData; // 터치한 캐릭터 정보를 window 객체에 저장
    (window as any).draggingPosition = { x: touch.clientX, y: touch.clientY }; // 현재 터치 위치를 window 객체에 저장 (드래그 중 위치 추적에 사용)

    // 가상 이미지 생성
    const dragPreview = document.createElement('img'); // 가상 이미지를 위한 img 요소 동적 생성
    dragPreview.src = imageSrc; // 터치한 캐릭터와 동일한 이미지 표시
    dragPreview.className = `character ${characterOption} ${characterSize}`; // 스타일 지정을 위한 클래스이름 적용
    dragPreview.style.position = 'absolute';
    dragPreview.style.pointerEvents = 'none'; // 가상 이미지가 다른 요소와 상호작용하지 않도록 함
    dragPreview.style.zIndex = '1000';
    dragPreview.style.transform = 'translate(-50%, -50%)'; // 이미지의 중심을 기준으로 드래그
    dragPreview.style.left = `${touch.clientX}px`; // 드래그 시작 시 가상 이미지 위치 설정
    dragPreview.style.top = `${touch.clientY}px`;

    document.body.appendChild(dragPreview); // 가상 이미지를 body에 추가하여 화면에 표시되게 함
    dragPreviewRef.current = dragPreview; // 가상 이미지의 참조 저장 (이후 위치 업데이트 및 제거에 사용)
  };

  // 모바일 터치 이동 처리
  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    const touch = e.touches[0];
    (window as any).draggingPosition = { x: touch.clientX, y: touch.clientY }; // 드래그 중인 위치를 계속해서 window 객체에 저장하여, 드래그 위치 추적

    // 현재 터치 위치에 맞춰 가상 이미지 위치 업데이트
    if (dragPreviewRef.current) {
      dragPreviewRef.current.style.left = `${touch.clientX}px`;
      dragPreviewRef.current.style.top = `${touch.clientY}px`;
    }

    // 드래그 중인 위치를 다른 곳에서 처리할 수 있도록 customEvent를 만들어 window 객체에 dispatch
    const customEvent = new CustomEvent('character-touch-move', {
      detail: { x: touch.clientX, y: touch.clientY },
    });
    window.dispatchEvent(customEvent);
  };

  // 모바일 터치 종료 처리
  const handleTouchEnd = () => {
    if (dragPreviewRef.current) {
      dragPreviewRef.current.remove(); // DOM에서 가상 이미지 제거
      dragPreviewRef.current = null; // 참조를 초기화하여 메모리에서 해제
    }

    // 터치 종료 이벤트를 커스텀 이벤트로 생성하여 dispatch
    const customEvent = new CustomEvent('character-touch-end');
    window.dispatchEvent(customEvent);
  };

  return (
    <img
      className={`character ${characterOption} ${characterSize}`}
      src={imageSrc}
      alt={`${characterOption} ${characterSize} character`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default Character;
