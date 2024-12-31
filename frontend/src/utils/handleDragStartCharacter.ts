import { CharacterInfoInterface } from 'types/play';

// 웹 드래그 시작 처리
export const handleDragStartCharacter = (
  e: React.DragEvent<HTMLImageElement>,
  characterInfo: CharacterInfoInterface
) => {
  e.dataTransfer.setData('text/plain', JSON.stringify(characterInfo));
};
