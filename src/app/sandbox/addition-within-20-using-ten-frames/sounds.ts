const soundFiles = {
  shoot: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  collect: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  rotate: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  score: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  complete: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  pop: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
};

const soundVolumes: { [key: string]: number } = {
  shoot: 0.7,
  collect: 0.5,
  rotate: 0.4,
  score: 0.6,
  complete: 0.8,
  pop: 0.3,
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