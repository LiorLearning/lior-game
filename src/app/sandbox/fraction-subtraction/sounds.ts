'use client'

const soundFiles = {
  drop: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  correct: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  wrong: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/chocolate-break.mp3',
  complete: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
};

const soundVolumes: { [key: string]: number } = {
  drop: 0.5,
  correct: 0.6,
  wrong: 0.4,
  complete: 0.8,
};

export const useSoundEffects = () => {
  const soundEffects = Object.entries(soundFiles).reduce((acc, [name, path]) => {
    const audio = new Audio(path);
    audio.volume = soundVolumes[name];
    acc[name as keyof typeof soundFiles] = {
      play: () => audio.play(),
      sound: audio
    };
    return acc;
  }, {} as {
    [K in keyof typeof soundFiles]: {
      play: () => Promise<void>,
      sound: HTMLAudioElement
    }
  });
  return soundEffects;
}; 