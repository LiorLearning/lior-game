import { images } from './image';
import { soundFiles } from './sound';

export const preloadAssets = () => {

  Object.values(images).forEach((url) => {
    const img = new Image();
    img.src = url;
  });

  if (typeof window !== 'undefined') {
    Object.values(soundFiles).forEach((url) => {
      const audio = new Audio();
      audio.src = url;
    });
  }
};
