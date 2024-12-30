import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/square.scss';
import Character from 'components/play/Character';
import { useEffect } from 'react';

interface SquareProps {
  row: number;
  col: number;
  characterInfo: {
    characterOption: CharacterOptionType;
    characterSize: CharacterSizeType;
  } | null;
  handleMoveCharacter: (
    row: number,
    col: number,
    character: {
      characterOption: CharacterOptionType;
      characterSize: CharacterSizeType;
    }
  ) => void;
}

const Square = ({
  row,
  col,
  characterInfo,
  handleMoveCharacter,
}: SquareProps) => {
  // 드래그한 캐릭터가 이 square에 드롭되었을 때 처리하는 함수
  const handleDrop = () => {
    const characterData = (window as any).currentDragData; // window에서 현재 드래그한 캐릭터 정보 가져오기
    if (characterData) {
      try {
        const { characterOption, characterSize } = JSON.parse(characterData); // 데이터 파싱하여 캐릭터 옵션과 크기 추출
        handleMoveCharacter(row, col, { characterOption, characterSize }); // 캐릭터 이동 처리
        (window as any).currentDragData = null; // 드래그 데이터 초기화
      } catch (error) {
        console.error('Error parsing touch data', error); // 데이터 파싱 중 에러 처리
      }
    }
  };

  useEffect(() => {
    // 터치가 끝났을 때 실행되는 이벤트 핸들러
    const handleTouchEnd = () => {
      const bounds = document
        .querySelector(`.square.row-${row}.col-${col}`) // 해당 square의 DOM 요소를 선택
        ?.getBoundingClientRect(); // 해당 square의 크기와 위치를 가져오기

      const draggingPosition = (window as any).draggingPosition; // 현재 드래그 중인 위치 정보

      // 드래그한 위치가 square 영역 내에 있으면 드롭 처리
      if (
        bounds &&
        draggingPosition &&
        draggingPosition.x >= bounds.left &&
        draggingPosition.x <= bounds.right &&
        draggingPosition.y >= bounds.top &&
        draggingPosition.y <= bounds.bottom
      ) {
        handleDrop();
      }
    };

    // 터치 이벤트 리스너 등록
    window.addEventListener('character-touch-end', handleTouchEnd); // `character-touch-end` 이벤트 발생 시 handleTouchEnd 함수 실행

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('character-touch-end', handleTouchEnd);
    };
  }, [row, col]);

  return (
    <div className={`square row-${row} col-${col}`}>
      {characterInfo && (
        <Character
          characterOption={characterInfo.characterOption}
          characterSize={characterInfo.characterSize}
        />
      )}
    </div>
  );
};

export default Square;
