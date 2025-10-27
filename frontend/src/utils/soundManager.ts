import { SOUND_PATHS } from 'constants/play';

const playSound = (src: string, volume: number = 1.0) => {
  try {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch((err) => {
      console.warn('Audio play failed:', err);
    });
  } catch (error) {
    console.error('Audio error:', error);
  }
};

export const SoundManager = {
  placeSuccess: () => playSound(SOUND_PATHS.placeSuccess, 1),
  placeFail: () => playSound(SOUND_PATHS.placeFail, 0.3),
  timeOver: () => playSound(SOUND_PATHS.timeOver, 0.3),
  touchLock: () => playSound(SOUND_PATHS.touchLock, 0.6),
  countDown: () => playSound(SOUND_PATHS.countDown, 0.3),
  bingo: () => playSound(SOUND_PATHS.bingo, 0.7),
};
