import { useEffect } from 'react';

export const soundFiles = {
  bgm:'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/multiplying-2-digits-by-1-digit-with-partial-products/bgm.mp3',
  complete: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/multiplying-2-digits-by-1-digit-with-partial-products/complete.mp3',
  right: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/multiplying-2-digits-by-1-digit-with-partial-products/right.mp3',
  wrong: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/multiplying-2-digits-by-1-digit-with-partial-products/wrong.mp3',
  woosh: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/multiplying-2-digits-by-1-digit-with-partial-products/woosh.mp3',
  wronginput: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/multiplying-2-digits-by-1-digit-with-partial-products/wronginput.mp3',
};

const soundVolumes: { [key: string]: number } = {
  bgm: 1,
  complete: 1,
  right: 1, 
  wrong: 1,
  woosh: 1, 
  wronginput: 1,
};

let bgmAudio: HTMLAudioElement;

if (typeof window !== 'undefined') {
  bgmAudio = new Audio(soundFiles.bgm);
  bgmAudio.loop = true;
  bgmAudio.volume = soundVolumes.bgm;
}

export const sounds = {
  bgm: () => {
    if (typeof window !== 'undefined') {
      const playPromise = bgmAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log('Audio play failed:', e));
      }
    }
  },
  stopBgm: () => {
    if (typeof window !== 'undefined') {
      bgmAudio.pause();
      bgmAudio.currentTime = 0;
    }
  },
  complete: () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(soundFiles.complete);
      audio.volume = soundVolumes.complete;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  },  
  right: () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(soundFiles.right);
      audio.volume = soundVolumes.right;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  },
  wrong: () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(soundFiles.wrong);  
      audio.volume = soundVolumes.wrong;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  },
  woosh: () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(soundFiles.woosh);
      audio.volume = soundVolumes.woosh;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  },
  wronginput: () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(soundFiles.wronginput);
      audio.volume = soundVolumes.wronginput;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  }
}; 
